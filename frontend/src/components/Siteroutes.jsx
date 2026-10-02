import React from 'react'
import Addcategory from './Addcategory'
import Addget from './Addget'
import Addsubcategory from './Addsubcategory'
import Header from './Header'
import Login from './Login'
import Pget from './Pget'
import Product from './Product'
import Register from './Register'
import Subget from './Subget'
import {Route,Routes} from "react-router-dom"
import ProductDetail from './ProductDetail'
import Card from './Card'
import Ordersucessfully from './Ordersucessfully'
import Ordertracking from './Ordertracking'
import Wishlist from './Wishlist'
import Adminheader from './Adminheader'
import AdminOrders from './AdminOrders'
import Checkout from './Checkout'
import Payment from './Payment'
import Home from './Home'
function Siteroutes() {
  return (
    <div>
      <Routes>
        
      <Route path="/addcat" element={<Addcategory/>}/>
      <Route path="/cat" element={<Addget/>}/>
      <Route path="/addsub" element={<Addsubcategory/>}/>
       <Route path="/Head" element={<Header/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
             <Route path="/P" element={<Pget/>}/>
               <Route path="/Head" element={<Header/>}/>
                  <Route path="/Pro" element={<Product/>}/>
                   <Route path="/reg" element={<Register/>}/>
                    <Route path="/sub" element={<Subget/>}/>
                       <Route path="/pd" element={<ProductDetail/>}/>
                       <Route path='/Card' element={<Card/>}/>
                       <Route path="/order" element={<Ordersucessfully/>}/>
                       <Route path="/ordert" element={<Ordertracking/>}/>
                       <Route path="/wish" element={<Wishlist/>}/>
                       <Route path='/admin' element={<Adminheader/>}/>
                       <Route path='/admin/orders' element={<AdminOrders/>}/>
                       <Route path='/check' element={<Checkout/>}/>
                       <Route path='/payment' element={< Payment/>}/>
      </Routes>
    </div>
  )
}

export default Siteroutes
