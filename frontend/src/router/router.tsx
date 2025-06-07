import { createBrowserRouter } from "react-router-dom";
import Layout from '@layout/layout'
import BlogSingle from '@pages/blog-single'
import Home from '@pages/home'

export const router = createBrowserRouter([
  {
      path: '/',
      element: <Layout />,
      children: [
          {
              path: '/',
              element: <Home />
          },
          {
              path: '/blog/:slug',  // Changed from '/blog-single' to '/blog/:slug'
              element: <BlogSingle />  // This should be your BlogArticle component
          },
      ]
  }
])