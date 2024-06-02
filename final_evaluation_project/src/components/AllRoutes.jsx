import { Route, Routes } from "react-router-dom"
import Home  from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Products from "../pages/Products"
import ProductsDetails from "../pages/ProductsDetails"
import PrivateRouter from "./PrivateRoutes"

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
        <Route path="/" element={
          <PrivateRouter>
            <Home/>
          </PrivateRouter>
        } />
        <Route path="/about" element={
          <PrivateRouter>
            <About/>
          </PrivateRouter>
        }
        />
        <Route path="/contact" element={
        <PrivateRouter>
          <Contact/>
        </PrivateRouter>
          } />
        <Route path="/products" element={

            <Products/>

        } />
        <Route path="/products/details/:id" element={
        // <PrivateRouter>
        // </PrivateRouter>
          <ProductsDetails/>

        } />
    </Routes>
  )
}
