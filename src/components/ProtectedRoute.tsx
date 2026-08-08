import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChange } from "../services/auth";

// 1. Definimos la interfaz para recibir children
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => { 
        // 2. Escuchar cambios de estado (si el usuario cierra sesión)
        const subscription = onAuthStateChange((_event, session) => {
              
            if(session){
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }
            setLoading(false);
        });

        return () => {
            subscription?.unsubscribe();
        };
    
    }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Verificando sesión...</p>
      </div>
    );
  }

  // Si no está autenticado, lo redirige al Login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Si está autenticado, renderiza las rutas hijas
  return <>{children}</>;
};