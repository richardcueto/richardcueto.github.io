import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './components/context/ThemeContext'
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const redirect = window.location.search;

if (redirect.startsWith("?/")) {
  const newUrl = redirect.replace("?/", "/");
  window.history.replaceState(null, "", newUrl);
}

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
