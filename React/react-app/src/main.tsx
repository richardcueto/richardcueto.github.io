import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from './components/context/ThemeContext'
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <BrowserRouter>
          <App /> 
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
