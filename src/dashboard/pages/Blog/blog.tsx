import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

import React, { useState, useEffect } from 'react';
import { BlogType } from "../../../types/blog";
import { supabase } from "../../../supabase/config"; // ✅ Importación de cliente Supabase
import { supabase_blog, get_create_author_id, supabase_eliminar, supabase_update, supabase_insertar } from "../../../services/blog";

export const BlogDataForm: React.FC = () => {
  const initialFormState: BlogType = {
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
  
  const editor = useCreateBlockNote();
  const [formData, setFormData] = useState<BlogType>(initialFormState);
  const [blogsList, setBlogsList] = useState<BlogType[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 🖼️ Estados para la Imagen Principal del Blog
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // 👤 Estados para la Imagen del Autor
  const [selectedAuthorFile, setSelectedAuthorFile] = useState<File | null>(null);
  const [previewAuthorUrl, setPreviewAuthorUrl] = useState<string>('');

  // 1. OBTENER BLOGS DE SUPABASE
  const cargarBlog = async () => {

    const data = await supabase_blog();

    if (data) {
      const formattedData: BlogType[] = data.map((b: any) => ({
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
    cargarBlog();
  }, []);

  // 🛠️ FUNCIÓN AUXILIAR: EXTRAER EL RUTA/NOMBRE DEL ARCHIVO DESDE LA URL
  const getStoragePathFromUrl = (url: string): string | null => {
    if (!url || !url.includes('/storage/v1/object/public/imagenes/')) return null;
    return url.split('/storage/v1/object/public/imagenes/')[1] || null;
  };

  // 🛠️ FUNCIÓN AUXILIAR: ELIMINAR ARCHIVO DE STORAGE
  const deleteImageFromStorage = async (imageUrl: string) => {
    const path = getStoragePathFromUrl(imageUrl);
    if (path) {
      const { error } = await supabase.storage.from('imagenes').remove([path]);
      if (error) {
        console.error('Error al eliminar imagen de Supabase Storage:', error.message);
      }
    }
  };
  // 🛠️ SUBIR IMAGEN A STORAGE
  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${Date.now()}_${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from('imagenes')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('imagenes')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (err: any) {
      console.error('Error al subir la imagen:', err.message);
      alert(`Error al subir imagen: ${err.message}`);
      return null;
    }
  };

  // 2. SELECCIONAR FILA PARA EDITAR
  const handleSelectRow = async (blog: BlogType) => {
    if (blog.id !== undefined && blog.id !== null) {
      setSelectedId(blog.id);
      const contentValue = blog.content || '';

      console.log(blog.author)
      setFormData({
        title: blog.title || '',
        paragraph: blog.paragraph || '',
        content: contentValue,
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

      // Limpiar archivos locales y colocar URLs actuales
      setSelectedFile(null);
      setPreviewUrl(blog.image || '');

      setSelectedAuthorFile(null);
      setPreviewAuthorUrl(blog.author?.image || '');

      // Cargar contenido dentro del editor de BlockNote
      if (contentValue) {
        try {
          // Si el contenido guardado es HTML, lo convierte a bloques
          const blocks = await editor.tryParseHTMLToBlocks(contentValue);
          editor.replaceBlocks(editor.document, blocks);
        } catch (e) {
          console.error("Error cargando HTML en el editor:", e);
        }
      } else {
        // Si está vacío, limpia los bloques del editor
        editor.replaceBlocks(editor.document, []);
      }
    }
  };

  // 3. Limpiar formulario
  const handleResetForm = () => {
    setSelectedId(null);
    setFormData(initialFormState);

    // Resetear imagenes del post
    setSelectedFile(null);
    setPreviewUrl('');

    // Resetear imagenes del autor
    setSelectedAuthorFile(null);
    setPreviewAuthorUrl('');

    editor.replaceBlocks(editor.document, []);
  };

  // MANEJADORES DE INPUTS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'image') {
      setPreviewUrl(value);
      setSelectedFile(null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
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

    if (name === 'image') {
      setPreviewAuthorUrl(value);
      setSelectedAuthorFile(null);
    }
  };

  const handleAuthorFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedAuthorFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewAuthorUrl(objectUrl);
  };

  const handleEditorChange = async() => {
    try{
      const html = await editor.blocksToHTMLLossy(editor.document);
      setFormData((prev) => ({ ...prev, content: html }));
    }catch (e){
      console.error("Error al convertir bloques a HTML:", e);
    }
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
  const getOrCreateAuthorId = async (authorImageUrl: string): Promise<number> => {
    const author = formData.author.name.trim();
    const designation = formData.author.designation;

    const id = await get_create_author_id(author,authorImageUrl,designation)
    return id
  };

  // 5. ELIMINAR ENTRADA
  const handleDelete = async (blogToDelete: BlogType, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita seleccionar la fila al hacer clic en eliminar

    if (!blogToDelete.id) return;

    if (!window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      return;
    }

    setLoading(true);
    try{
      // 1. Eliminar la imagen del Storage si es de Supabase
      if (blogToDelete.image) {
        await deleteImageFromStorage(blogToDelete.image);
      }

      // 2. Eliminar la imagen del autor de Storage (opcional)
      if (blogToDelete.author?.image) {
        await deleteImageFromStorage(blogToDelete.author.image);
      }

      await supabase_eliminar(blogToDelete.id);
  
      if (selectedId === blogToDelete.id) {
        handleResetForm();
      }
  
      await cargarBlog();
    }catch(error){
      console.error("Error al eliminar:", error);
    }finally {
      setLoading(false); // ✅ Solucionado: Desbloquea el estado loading
    }
    
  };

  // 6. GUARDAR (INSERT / UPDATE) EN SUPABASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try{
      // 1. Manejo de la IMAGEN PRINCIPAL del Blog
      let finalBlogImageUrl = formData.image;
      if (selectedFile) {
        // 1. Si estamos editando y ya tenía una imagen anterior en Supabase, la eliminamos
        if (selectedId !== null && formData.image) {
          await deleteImageFromStorage(formData.image);
        }

        const uploadedUrl = await uploadImageToSupabase(selectedFile);
        if (!uploadedUrl) {
          setLoading(false);
          return; // Detener si falla la subida
        }
        finalBlogImageUrl = uploadedUrl;
      }
      
      // 2. Manejo de la IMAGEN DEL AUTOR
      let finalAuthorImageUrl = formData.author.image;
      if (selectedAuthorFile) {
        if (formData.author.image) {
          await deleteImageFromStorage(formData.author.image);
        }

        const uploadedAuthorUrl = await uploadImageToSupabase(selectedAuthorFile);
        if (!uploadedAuthorUrl) {
          setLoading(false);
          return;
        }
        finalAuthorImageUrl = uploadedAuthorUrl;
      }

      // 3. Obtener/Crear ID de Autor con la URL final de su foto
      const authorId = await getOrCreateAuthorId(finalAuthorImageUrl);

      // 4. Guardar / Actualizar en Base de Datos
      if (selectedId !== null) {
        // --- MODO ACTUALIZACIÓN (UPDATE) ---
        await supabase_update(
          formData.title,
          formData.paragraph,
          formData.content,
          finalBlogImageUrl,
          formData.tags,
          formData.publishDate,
          authorId,
          selectedId
        )

      } else {
        // --- MODO CREACIÓN (INSERT) ---
        await supabase_insertar(
          formData.title,
          formData.paragraph,
          formData.content,
          finalBlogImageUrl,
          formData.tags,
          formData.publishDate,
          authorId,
        )
      }
        
      handleResetForm();
      await cargarBlog();
    }catch(error){
      console.error("Error al guardar el artículo:", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageMeta
        title="Blog"
        description="Mi blog"
      />
      <PageBreadcrumb pageTitle="Administrador de blog" />

      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
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
            <div className="flex gap-2">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/blog/blog-01.jpg o sube una imagen ..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className={`px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors flex items-center justify-center shrink-0`}>
                📁 Seleccionar
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {selectedFile && (
              <p className="text-xs text-blue-500 mt-1 font-medium">
                📌 Archivo nuevo listo para subir al guardar: {selectedFile.name}
              </p>
            )}

            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="h-24 w-auto rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                />
              </div>
            )}
          </div>

          {/* Markdown Editor */}
          <div className='prose'>
            <label className="block text-sm font-medium mb-1">
              Cuerpo del Post (Markdown)
            </label>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden min-h-[300px]">
              <BlockNoteView
                editor={editor}
                theme="light" // o "dark"
                onChange={handleEditorChange}
              />
            </div>
          </div>

          {/* Datos del Autor */}
          <fieldset className="border border-gray-200 dark:border-gray-700 p-4 rounded-xl space-y-4 bg-gray-50 dark:bg-gray-800/50">
            <legend className="px-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              Datos del Autor (author)
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Nombre (author.name) *</label>
                <div>
                  <input
                    type="text"
                    name="image"
                    required
                    value={formData.author.name}
                    onChange={handleAuthorChange}
                    placeholder="Ej. Samuyl Joshi"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg cursor-pointer transition-colors flex items-center justify-center shrink-0">
                  👤 Seleccionar Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAuthorFileChange}
                    className="hidden"
                  />
                </label>
                </div>
                  {selectedAuthorFile && (
                    <p className="text-xs text-blue-500 mt-1 font-medium">
                      📌 Foto de autor lista para subir al guardar: {selectedAuthorFile.name}
                    </p>
                  )}
                  
                  {previewAuthorUrl && (
                    <div className="mt-2">
                      <img
                        src={previewAuthorUrl}
                        alt="Vista previa del Autor"
                        className="h-16 w-16 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                      />
                    </div>
                  )}

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
                          onClick={(e) => handleDelete(item, e)}
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
    </div>
  );
};

export default BlogDataForm;