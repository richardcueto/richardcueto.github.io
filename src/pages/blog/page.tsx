import { useState,useEffect } from "react";
import SingleBlog from "../../components/Blog/SingleBlog";
import blogData from "../../components/Blog/blogData";
import Breadcrumb from "../../components/Common/Breadcrumb";
import { BlogType } from "../../types/blog";
import { Pagination } from "./pagination";

const Blog = () => {
  const [blogsList, setBlogsList] = useState<BlogType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Cantidad de blogs por página

  // Cálculo de índices
  const totalPages = Math.ceil(blogsList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogsList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Opcional: Hace scroll suave arriba
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try{
        const data = await blogData();
        setBlogsList(data)
      }catch (error){
        console.error('Error al cargar blogs',error)
      }
    };

    fetchBlogs();
  },[]);

  return (
    <>
      <Breadcrumb
        pageName="Blog"
        description="Este blog es de mis sucesos de mi vida diaria y profesional"
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
              >
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>

          {/* Componente de paginación dinámico */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;