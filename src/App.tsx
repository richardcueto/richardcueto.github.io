import { Route, Routes, useLocation } from 'react-router-dom';
import './index.css'
import './index.css'

// Componentes globales
import Header from "./components/Header";
import Footer from './components/Footer';

// Páginas Públicas
import Hero from "./components/Hero";
import Features from "./components/Features";
import SigninPage from "./pages/signin/page"
import SignupPage from "./pages/signup/page"
import Blog from "./pages/blog/page"
import About from "./pages/about/page"
import Contact from "./pages/contact/page"
import BlogSidebar from "./pages/blog-sidebar/page"
import BlogDetail from "./pages/blog-details/page"
import ScrollUp from "./components/Common/ScrollUp";
import Video from "./components/Video";
import Brands from "./components/Brands";
import AboutSectionOne from "./components/About/AboutSectionOne";
import AboutSectionTwo from "./components/About/AboutSectionTwo";

// Dashboard
import Dashboard from './pages/dashboard/page';
import BlogForm from "./dashboard/pages/Blog/blog";
// import Ecommerce from './pages/ecommerce/page'

function App() {
  const location = useLocation();

  // Verifica si estamos en la landing o en alguna subruta del dashboard
  const esDashboard = location.pathname.startsWith("/dashboard");
  const esEcommerce = location.pathname.startsWith("/ecommerce");
  const esForm = location.pathname.startsWith("/blog-form");

  return (  
    <>
      <ScrollUp />
      {!esDashboard && !esEcommerce && !esForm && <Header />}

      <Routes>
        {/* Landing Page Principal */}
        <Route path='/' element={
                          <>
                            <Hero />
                            <Features />
                            <Video /> 
                            <Brands />
                            <AboutSectionOne />
                            <AboutSectionTwo />     
                          </>
                          }/>
        
        {/* Páginas Públicas */}
        <Route path='/signin' element={<SigninPage />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/blog' element={<Blog />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/blog-sidebar' element={<BlogSidebar />}/>
        <Route path='/blog-details/:id' element={<BlogDetail />}/>

        <Route path='/dashboard/*' element={<Dashboard />}/>
        <Route path="blog-form" element={<BlogForm />}></Route>
        {/* <Route path='/ecommerce/*' element={<Ecommerce />}/> */}
      </Routes>
                          
      {!esDashboard && !esEcommerce && !esForm && <Footer />}
    </>
  )
}

export default App
