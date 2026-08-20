import { Menu } from "../../types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Acerca de",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Blogger",
    path: "/blog",
    newTab: false,
  },
  {
    id: 4,
    title: "Soporte",
    path: "/contact",
    newTab: false,
  },
  {
    id: 6,
    title: "FastAPI",
    path: "/fastapi",
    newTab: false,
  },
  {
    id: 5,
    title: "Otros Contenidos",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "Blog Sidebar Page",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 52,
        title: "Pruebas",
        path: "/prueba",
        newTab: false,
      },
      {
        id: 53,
        title: "HTML",
        path: "/html",
        newTab: false,
      },
      {
        id: 54,
        title: "VentasWhatsapp",
        path: "/ventasWhatsapp",
        newTab: false,
      },
      {
        id: 55,
        title: "puntoVenta",
        path: "/puntoVenta",
        newTab: false,
      },
    ],
  },
];
export default menuData;