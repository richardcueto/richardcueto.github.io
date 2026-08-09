import { supabase } from "../supabase/config";

export async function supabase_blog() {

  const { data, error } = await supabase.from('Blogs')
    .select(`
      *,
      author:author_id (
        id,
        name,
        image,
        designation
      )
      `);

  if (error){
    throw error;
  }

  return data;
}

export async function supabase_blog_id(id:string) {

  const { data, error } = await supabase.from('Blogs')
    .select(`
      *,
      author:author_id (
        id,
        name,
        image,
        designation
      )
      `)
    .eq("id",id)
    .single();

  if (error){
    throw error;
  }

  return data;
}

export async function get_create_author_id(authorName:string,image:any,designation:string) {
  const { data :autorData, error:autorError } = await supabase.from('Autores')
  .select('id')
  .eq("name",authorName)
  .maybeSingle();
  
  if (autorError) throw autorError
  
  if (autorData){
    console.log(image)
    console.log(autorData.id)
    const { data, error: updateError } = await supabase.from('Autores')
    .update({
      name: authorName,
      image: image,
      designation: designation,
    })
    .eq("id",autorData.id)
    .select();

    if (updateError) {
      console.error("Error al actualizar autor:", updateError.message);
      throw updateError;
    }
    
    console.log("Autor actualizado correctamente:", data)
    return autorData.id;

  }else{
    const { data :newAutor, error:NewAutorError } = await supabase.from('Autores')
      .insert([{
        name: authorName,
        image: image,
        designation: designation,
      }])
      .select()
      .single();
      if (NewAutorError) throw NewAutorError

    return newAutor.id;

  }
}

export async function supabase_eliminar(id:number|string):Promise<void> {

  const { error } = await supabase.from('Blogs').delete().eq('id',id);

  if (error){
    throw error;
  }

  alert('¡Artículo eliminado con éxito!');

}

export async function supabase_update(title:string,paragraph:string,content:string,image:string,tags:any,publishDate:string,authorId:string|number,selectedId:string|number):Promise<void> {

  const { error } = await supabase.from('Blogs').update({
    title: title,
    paragraph: paragraph,
    content: content,
    image: image,
    tags: tags,
    publishDate: publishDate,
    author_id: authorId,
    })
    .eq('id',selectedId)
    .select();

  if (error){
    throw error;
  }

  alert('¡Artículo actualizado exitosamente!');

}

export async function supabase_insertar(title:string,paragraph:string,content:string,image:string,tags:any,publishDate:string,authorId:string|number):Promise<void> {

  const { error } = await supabase.from('Blogs').insert({
    title: title,
    paragraph: paragraph,
    content: content,
    image: image,
    tags: tags,
    publishDate: publishDate,
    author_id: authorId,
    });

  if (error){
    throw error;
  }

  alert('¡Artículo guardado exitosamente!');

}

