import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useSearchParams } from 'react-router-dom'
import { API_BASE_URL } from '../config'

function Pget() {
   const[arr,setarr]=useState([])
        useEffect(()=>{
    getdata()
        },[])
   const isLoggedIn=!!sessionStorage.getItem("user")
   const [params]=useSearchParams()
   const pid=params.get("pid")
  const getdata=async()=>{
        try{
       const response=await axios.get(`${API_BASE_URL}/api/pget/${pid}`)
       const result=response.data
       if(result.statuscode==1){
        alert("data get successfully")
        setarr(result.data)
       }else
        {
            alert("data not successfully")}
        }catch(err){
            console.log(err)
        }
    }
      return (
    <div>
          <div class="container">
    {isLoggedIn ? (
    <div class="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
                        {
                        arr.map((data,i)=>
                            <Link to={`/pd?pid=${data._id}`}>
   
                        <div>
                    <div class="basic-product theme-product-1">
                        <div class="overflow-hidden">
                            <div class="img-wrapper">
                                <div class="ribbon"><span>Exclusive</span></div>
                                <a href="product-page(image-swatch).html">
                                    <img src={`${API_BASE_URL}/uploads/${data.File}`}
                                        class="img-fluid blur-up lazyload" alt=""/>
                                </a>
                                <div class="rating-label"><i class="ri-star-fill"></i><span>4.5</span>
                                </div>
                                <div class="cart-info">
                                    <a href="#!" title="Add to Wishlist" class="wishlist-icon">
                                        <i class="ri-heart-line"></i>
                                    </a>
                                    <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                        <i class="ri-shopping-cart-line"></i>
                                    </button>
                                    <a href="#!" data-bs-toggle="modal" data-bs-target="#quickView" title="Quick View">
                                        <i class="ri-eye-line"></i>
                                    </a>
                                    <a href="compare.html" title="Compare">
                                        <i class="ri-loop-left-line"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="product-detail">
                                <div>
                                    <div class="brand-w-color">
                                        <a class="product-title" href="product-page(accordian).html">
                                            {data.ProductName}
                                       </a>
                                        <div class="color-panel">
                                            <ul>
                                                <li style={{backgroundColor: "papayawhip"}}></li>
                                                <li style={{backgroundcolor: "burlywood"}}></li>
                                                <li style={{backgroundcolor: "gainsboro"}}></li>
                                            </ul>
                                            <span>+2</span>
                                        </div>
                                    </div>
                                    <h6>Boyfriend Shirts</h6>
                                    <h4 class="price">$ 2.79<del> $3.00 </del><span class="discounted-price"> 7% Off
                                        </span>
                                    </h4>
                                </div>
                                <ul class="offer-panel">
                                    <li><span class="offer-icon"><i class="ri-discount-percent-fill"></i></span>
                                        Limited Time Offer: 5% off</li>
                                    <li><span class="offer-icon"><i class="ri-discount-percent-fill"></i></span>
                                        Limited Time Offer: 5% off</li>
                                    <li><span class="offer-icon"><i class="ri-discount-percent-fill"></i></span>
                                        Limited Time Offer: 5% off</li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>

                </div>
                </Link>

)}</div>
    ) : (
        <p>Please login to view products</p>
    )}
        </div>
    </div>
   
  )
}

export default Pget
