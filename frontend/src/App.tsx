import { Route, Routes } from 'react-router-dom';
import PublicLayout from './layout/PublicLayout';

//🟢 RUTAS PÚBLICAS (Heredan Header, ScrollUp y Footer)
import Hero from "./components/Hero";
import Features from "./components/Features";
import AboutSectionTwo from "./components/About/AboutSectionTwo";
import AboutSectionOne from "./components/About/AboutSectionOne";

import SigninPage from "./pages/signin/page";
import SignupPage from "./pages/signup/page";
import Blog from "./pages/blog/page";
import About from "./pages/about/page";
import Contact from "./pages/contact/page";
import BlogSidebar from "./pages/blog-sidebar/page";
import BlogDetail from "./pages/blog-details/page";

//🔴 RUTAS SIN HEADER NI FOOTER (Standalone / Dashboard / App)
import FastApi from './pages/fastAPI/page';
import HTML from './pages/Etiquetas HTML/page'
import VentasWhatsapp from './pages/ventasWhatsap/page'
import PuntoVenta from './pages/puntoVenta/page'
import Ecommerce from './pages/ecommerce/page';
import Prueba from './pages/pruebas/page';

//🔒 RUTAS PROTEGIDAS
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from './pages/dashboard/page';

function App() {
  return (  
    <>
      <Routes>

        {/* 🟢 RUTAS PÚBLICAS (Heredan Header, ScrollUp y Footer) */}
        <Route element={<PublicLayout />}>
          <Route path='/' element={
            <>
              <Hero />
              <Features />
              <AboutSectionOne />
              <AboutSectionTwo />
            </>
          } />
          <Route path='/signin' element={<SigninPage />}/>
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/blog' element={<Blog />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/blog-sidebar' element={<BlogSidebar />}/>
          <Route path='/blog-details/:id' element={<BlogDetail />}/>  
        </Route>
        
        {/* 🔴 RUTAS SIN HEADER NI FOOTER (Standalone / Dashboard / App) */}
        <Route path='/fastapi' element={<FastApi />}/>
        <Route path='/html' element={<HTML />}/>
        <Route path='/ventasWhatsapp' element={<VentasWhatsapp />}/>
        <Route path='/puntoVenta' element={<PuntoVenta />}/>
        <Route path='/ecommerce/*' element={<Ecommerce />}/>
        <Route path='/prueba' element={<Prueba />}/>

        {/* 🔒 RUTAS PROTEGIDAS */}
        <Route 
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  )
}

export default App
