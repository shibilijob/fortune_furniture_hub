import React, { Suspense, lazy, useContext  } from 'react'
import NavBar from './component/navbar/NavBar'
import Login from './component/login/Login'
import SignUp from './component/signUp/SignUp'
import Products from './component/products/Products'
import ProductDetailPage from './component/products/ProductDetailPage'
import { Routes, Route } from 'react-router-dom'
import Cart from './component/cart/Cart'
import CartPage from './pages/cart page/CartPage'
import AdminPage from './pages/admin_panel/AdminPage'
import AllProduct from './component/admin_component/product_section/AllProduct'
import UsersList from './component/admin_component/users-list/UsersList'
import DashBord from './component/admin_component/dash/DashBord'
import AdminNavBar from './component/navbar/AdminNavBar'
import AllUserProduct from './component/orders/AllUserProduct'
import Orders from './component/orders/Orders'
import AdminProtectedRoute from './component/protected_rout/AdminProtectedRoute'
import UserProtectedRout from './component/protected_rout/UserProtectedRout'
import OrdersList from './component/admin_component/ordersList/OrdersList'
import { dataContext } from './context/AppContext'


const HomePage = lazy(() => import('./pages/home page/HomePage'));
const ProductPage = lazy(() => import('./pages/product page/ProductPage'));
const AboutPage = lazy(() => import('./pages/about page/AboutPage'));

function App() {
  const { user } = useContext(dataContext)

  return (
    <div>

      {user?.role === 'admin' ? <AdminNavBar /> : <NavBar />}

      <Suspense fallback={<h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>}>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='productPage' element={<ProductPage />} />
          <Route path='aboutPage' element={<AboutPage />} />

          <Route path='/allProducts' element={<AllUserProduct />} />
          <Route path='/Orders' element={<Orders/>}/>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path='/cart' element={
            <UserProtectedRout>
              <Cart />
            </UserProtectedRout>
            } />
          <Route path='/CartPage' element={<CartPage />} />

          
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminPage />
            </AdminProtectedRoute>
            }>
            <Route index element={<DashBord />} />
            <Route path="products" element={<AllProduct />} />
            <Route path="users" element={<UsersList />} />
            <Route path='ordersList' element={<OrdersList />} />
          </Route>
        </Routes>

      </Suspense>
    </div>
  )
}

export default App
