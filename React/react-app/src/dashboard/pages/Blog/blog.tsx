import React, { useState, useEffect, useMemo } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { supabase } from '../../../supabase/config';

export interface BlogPost {
  id?: number;
  title: string;
  paragraph: string;
  content: string;
  image: string;
  author: {
    id?: number;
    name: string;
    image: string;
    designation: string;
  };
  tags: string[];
  publishDate: string;
}

export const BlogDataForm: React.FC = () => {
  const initialFormState: BlogPost = {
    title: '',
    paragraph: '',
    content: '',
    image: '',
    author: {
      name: '',
      image: '',
      designation: '',
    },
    tags: ['creative'],
    publishDate: new Date().getFullYear().toString(),
  };

  const [formData, setFormData] = useState<BlogPost>(initialFormState);
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const editorOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      placeholder: "Escribe tu publicación usando Markdown...",
      status: ["lines", "words"],
      maxHeight: "350px",
    };
  }, []);

  // 1. OBTENER BLOGS DE SUPABASE
  const obtenerBlogs = async () => {
    const { data, error } = await supabase.from('Blogs').select(`
        id,
        title,
        paragraph,
        content,
        image,
        tags,
        publishDate,
        author:Autores (
          id,
          name,
          image,
          designation
        )
      `);

    if (error) {
      console.error('Error al obtener los blogs:', error);
    } else if (data) {
      const formattedData: BlogPost[] = data.map((b: any) => ({
        id: b.id,
        title: b.title,
        paragraph: b.paragraph,
        content: b.content,
        image: b.image,
        tags: b.tags || [],
        publishDate: b.publishDate,
        author: Array.isArray(b.author)
          ? b.author[0]
          : b.author || { name: '', image: '', designation: '' },
      }));
      setBlogsList(formattedData);
    }
  };

  useEffect(() => {
    obtenerBlogs();
  }, []);

  // 2. Cargar blog seleccionado en el formulario
  const handleSelectRow = (blog: BlogPost) => {
    if (blog.id !== undefined && blog.id !== null) {
      setSelectedId(blog.id);
      setFormData({
        title: blog.title || '',
        paragraph: blog.paragraph || '',
        content: blog.content || '',
        image: blog.image || '',
        author: {
          id: blog.author?.id,
          name: blog.author?.name || '',
          image: blog.author?.image || '',
          designation: blog.author?.designation || '',
        },
        tags: blog.tags || [],
        publishDate: blog.publishDate || '',
      });
    }
  };

  // 3. Limpiar formulario
  const handleResetForm = () => {
    setSelectedId(null);
    setFormData(initialFormState);
  };

  // MANEJADORES DE INPUTS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      author: {
        ...prev.author,
        [name]: value,
      },
    }));
  };

  const handleMarkdownChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !formData.tags.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmed],
      }));
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // 4. OBTENER O CREAR AUTOR
  const getOrCreateAuthorId = async (): Promise<number> => {
    const authorName = formData.author.name.trim();

    const { data: autorData, error: autorError } = await supabase
      .from('Autores')
      .select('id')
      .eq('name', authorName)
      .maybeSingle();

    if (autorError) throw autorError;

    if (autorData) {
      await supabase
        .from('Autores')
        .update({
          image: formData.author.image,
          designation: formData.author.designation,
        })
        .eq('id', autorData.id);

      return autorData.id;
    } else {
      const { data: newAutor, error: newAutorError } = await supabase
        .from('Autores')
        .insert([
          {
            name: authorName,
            image: formData.author.image,
            designation: formData.author.designation,
          },
        ])
        .select()
        .single();

      if (newAutorError) throw newAutorError;
      return newAutor.id;
    }
  };

  // 5. ELIMINAR ENTRADA
  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita seleccionar la fila al hacer clic en eliminar

    if (!window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('Blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('¡Artículo eliminado con éxito!');
      
      if (selectedId === id) {
        handleResetForm();
      }
      await obtenerBlogs();
    } catch (error: any) {
      console.error('Error al eliminar:', error);
      alert(`No se pudo eliminar: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  // 6. GUARDAR (INSERT / UPDATE) EN SUPABASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const authorId = await getOrCreateAuthorId();

      if (selectedId !== null) {
        // --- MODO ACTUALIZACIÓN (UPDATE) ---
        const { data, error: blogError } = await supabase
          .from('Blogs')
          .update({
            title: formData.title,
            paragraph: formData.paragraph,
            content: formData.content,
            image: formData.image,
            tags: formData.tags,
            publishDate: formData.publishDate,
            author_id: authorId,
          })
          .eq('id', selectedId)
          .select(); // Retorna las filas afectadas

        if (blogError) throw blogError;

        if (!data || data.length === 0) {
          throw new Error('No se pudo actualizar el registro. Verifica los permisos RLS en Supabase.');
        }

        alert('¡Artículo actualizado exitosamente!');
      } else {
        // --- MODO CREACIÓN (INSERT) ---
        const { error: blogError } = await supabase.from('Blogs').insert([
          {
            title: formData.title,
            paragraph: formData.paragraph,
            content: formData.content,
            image: formData.image,
            tags: formData.tags,
            publishDate: formData.publishDate,
            author_id: authorId,
          },
        ]);

        if (blogError) throw blogError;
        alert('¡Artículo guardado exitosamente!');
      }

      handleResetForm();
      await obtenerBlogs();
    } catch (error: any) {
      console.error('Error al guardar en Supabase:', error);
      alert(`Ocurrió un error: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {selectedId !== null ? `Editar Entrada #${selectedId}` : 'Nueva Entrada de Blog'}
        </h2>
        {selectedId !== null && (
          <button
            type="button"
            onClick={handleResetForm}
            className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mb-10">
        {/* Título y Fecha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Título (title) *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej. Best UI components for modern websites"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Año/Fecha (publishDate)</label>
            <input
              type="text"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              placeholder="Ej. 2026"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Párrafo */}
        <div>
          <label className="block text-sm font-medium mb-1">Contenido / Párrafo (paragraph) *</label>
          <textarea
            name="paragraph"
            required
            rows={4}
            value={formData.paragraph}
            onChange={handleChange}
            placeholder="Lorem ipsum dolor sit amet..."
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Ruta de Imagen */}
        <div>
          <label className="block text-sm font-medium mb-1">Ruta de Imagen (image)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/blog/blog-01.jpg"
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Markdown Editor */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Cuerpo del Post (Markdown)
          </label>
          <SimpleMDE
            value={formData.content}
            onChange={handleMarkdownChange}
            options={editorOptions}
          />
        </div>

        {/* Datos del Autor */}
        <fieldset className="border border-gray-200 dark:border-gray-700 p-4 rounded-xl space-y-4 bg-gray-50 dark:bg-gray-800/50">
          <legend className="px-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            Datos del Autor (author)
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Nombre (author.name) *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.author.name}
                onChange={handleAuthorChange}
                placeholder="Ej. Samuyl Joshi"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Cargo (author.designation)</label>
              <input
                type="text"
                name="designation"
                value={formData.author.designation}
                onChange={handleAuthorChange}
                placeholder="Ej. Graphic Designer"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Foto del Autor (author.image)</label>
            <input
              type="text"
              name="image"
              value={formData.author.image}
              onChange={handleAuthorChange}
              placeholder="/images/blog/author-03.png"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </fieldset>

        {/* Etiquetas */}
        <div>
          <label className="block text-sm font-medium mb-1">Etiquetas (tags)</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Ej. creative, design, react"
              className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors"
            >
              Añadir Tag
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-500 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Botón de Enviar */}
        <div className="pt-4 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : selectedId !== null ? 'Actualizar Artículo' : 'Guardar Artículo'}
          </button>
        </div>
      </form>

      {/* Tabla de Artículos Registrados */}
      <h3 className="text-xl font-bold mb-4">Entradas en la Base de Datos</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400">
              <th className="p-3">#</th>
              <th className="p-3">Título</th>
              <th className="p-3">Autor</th>
              <th className="p-3">Tags</th>
              <th className="p-3">Fecha</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {blogsList.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No hay artículos guardados en la base de datos.
                </td>
              </tr>
            ) : (
              blogsList.map((item, index) => (
                <tr
                  key={item.id || index}
                  onClick={() => handleSelectRow(item)}
                  className={`cursor-pointer border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    selectedId === item.id ? 'bg-blue-50 dark:bg-gray-800/80' : ''
                  }`}
                >
                  <td className="p-3 font-semibold">{index + 1}</td>
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3">
                    {item.author?.name || 'Sin Autor'}
                    {item.author?.designation && (
                      <span className="block text-xs text-gray-400">{item.author.designation}</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] bg-gray-200 dark:bg-gray-700 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">{item.publishDate || '-'}</td>
                  <td className="p-3 text-center">
                    {item.id && (
                      <button
                        type="button"
                        onClick={(e) => handleDelete(item.id!, e)}
                        className="px-2.5 py-1 text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 font-medium rounded hover:bg-red-200 dark:hover:bg-red-800/60 transition-colors"
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogDataForm;