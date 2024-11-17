import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Contact from "../Pages/Contact/Contact";
import ProductsDetail from "../Pages/Products/ProductsDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/products", element: <Products /> },
      { path: "/contact", element: <Contact /> },
      { path: "/product-detail/:id", element: <ProductsDetail /> },
    ],
  },
]);
