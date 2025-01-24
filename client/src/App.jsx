import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Admin from './Components/Admin/Admin';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import AdminAllProducts from './Components/Admin/AdminAllProducts';
import CartDetails from './Components/Cart/CartDetails';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/allproducts" element={<AdminAllProducts/>} />
          <Route path="/cartdetails" element={<CartDetails/>} />
        </Routes>
      <Footer/>
    </Router>
      
    </>
  )
}

export default App
