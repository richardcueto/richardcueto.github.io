import { supabase } from '../../supabase/config';
import { BlogType } from "../../types/blog";

const blogData = async(): Promise<BlogType[]> => {
  const { data, error}=await supabase
    .from('Blogs')
    .select(`
      id,
      title,
      paragraph,
      content,
      image,
      tags,
      publishDate,
      author:Autores (
        name,
        image,
        designation
      )
    `);
  
  if (error) {
    console.error('Error al obtener los blogs desde Supabase:', error);
    return [];
  }

  const blogs: BlogType[] = data.map((b: any) => ({
    id: b.id,
    title: b.title,
    paragraph: b.paragraph,
    content: b.content,
    image: b.image,
    tags: b.tags || [],
    publishDate: b.publishDate || '',
    author: Array.isArray(b.author) 
      ? b.author[0] 
      : b.author || {name:"", image:"", designation:""}
  }));

  return blogs;
}

export default blogData;