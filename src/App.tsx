import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import Admin from './pages/admin/Admin'
import AdminLayout from './components/layout/AdminLayout'
import BrandEdit from './components/admin/brands/BrandEdit'
import Categories from './pages/admin/Categories'
import Brands from './pages/admin/Brands'
import Products from './pages/admin/Products'
import CategoryEdit from './components/admin/categories/CategoryEdit'
import ProductEdit from './components/admin/products/ProductEdit'
import Artikli from './pages/home/Artikli'
import CategoriesPage from './pages/home/Categories'
import Details from './pages/home/Details'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>     
        <Route path="/artikli" element={<Artikli />} />
        <Route path="/kategorije/:id" element={<CategoriesPage />} />
        <Route path="/artikli/:categoryId/:productId" element={<Details />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path="/admin/brendovi" element={<Brands />} />
        <Route path="/admin/brendovi/:id" element={<BrandEdit />} />
        <Route path="/admin/kategorije" element={<Categories />} />
        <Route path="/admin/kategorije/:id" element={<CategoryEdit />} />
        <Route path="/admin/artikli" element={<Products />} />        
        <Route path="/admin/artikli/:id" element={<ProductEdit />} />        
      </Route>
    </Route>
  )
)

function App() {
  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />      
    </ThemeProvider>
  )
}

export default App
