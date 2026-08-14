import { Route, Routes, useLocation } from 'react-router-dom';
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
import AboutSectionOne from "./components/About/AboutSectionOne";
import AboutSectionTwo from "./components/About/AboutSectionTwo";

// Dashboard
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from './pages/dashboard/page';
import Ecommerce from './pages/ecommerce/page'

// FastAPI
import FastApi from './pages/fastAPI/page';

function App() {
  const location = useLocation();
  // Verifica si estamos en la landing o en alguna subruta
  const esDashboard = location.pathname.startsWith("/dashboard");
  const esEcommerce = location.pathname.startsWith("/ecommerce");
  const esForm = location.pathname.startsWith("/blog-form");
  const esFastAPI = location.pathname.startsWith("/fastapi");

  return (  
    <>
      <ScrollUp />
      {!esDashboard && !esEcommerce && !esForm && !esFastAPI && <Header />}

      <Routes>
        {/* Landing Page Principal */}
        <Route path='/' element={
                          <>
                            <Hero />
                            <Features />
                            <AboutSectionOne />
                            <AboutSectionTwo />     
                          </>
                          }/>
        
        {/* Páginas Públicas */}
        <Route path='/signin' element={<SigninPage />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/blog' element={<Blog />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/fastapi' element={<FastApi />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/blog-sidebar' element={<BlogSidebar />}/>
        <Route path='/blog-details/:id' element={<BlogDetail />}/>
        <Route path='/ecommerce/*' element={<Ecommerce />}/>
        
        {/* Rutas Protegidas (Solo accesibles con sesión) */}
        <Route 
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
                          
      {!esDashboard && !esEcommerce && !esForm && !esFastAPI && <Footer />}
    </>
  )
}

export default App
