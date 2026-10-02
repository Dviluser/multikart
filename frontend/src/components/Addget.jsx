import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../config'

function Addget() {
    useEffect(()=>{
getdata()
    },[])
    const [arr,setarr]=useState([])
    const isLoggedIn=!!sessionStorage.getItem("user")
    const getdata=async()=>{
    const response=await axios.get(`${API_BASE_URL}/api/addcats`)
    const result=await response.data
    try{
    if(result.statuscode==1){
        alert("data get sucessfully")
        setarr(result.data)

    }else{
        alert("data not get sucessfully")
    }
    }
catch(err){
    console.log(err)
}
    }
  return (
    <div>
      {/* {
        arr.map((data,i)=>
            <>
            <h1>{data.Category}</h1>
            <h1>{data.File}</h1>
            </>
        )
      } */}
 <section class="section-b-space pt-0 ratio_asos">
        <div class="container">
    

            
            {isLoggedIn ? (
            <div class="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
                        {
arr.map((data,i)=>
    <Link to={`/sub?catid=${data._id}`}>
                <div>
                    
                    <div class="basic-product theme-product-1">
                        <div class="overflow-hidden">
                            <div class="img-wrapper">
                                <div class="ribbon"><span>Exclusive</span></div>
                                <a href="product-page(image-swatch).html">
                                    <img src={`${API_BASE_URL}/uploads/${data.File}`}
                                        class="img-fluid blur-up lazyload" alt="" style={{height:"300px",width:"100%"}}/>
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
                                            {data.Category}
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
)}
                
                <div>
                    {/* <div class="basic-product theme-product-1">
                        <div class="overflow-hidden">
                            <div class="img-wrapper">
                                <a href="product-page(accordian).html"><img
                                        src="../assets/images/fashion-1/product/2.jpg"
                                        class="img-fluid blur-up lazyload" alt=""/></a>
                                <div class="rating-label"><i class="ri-star-s-fill"></i> <span>4.5</span>
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
                                            VogueVista
                                        </a>

                                    </div>
                                    <h6>Classic Jacket</h6>
                                    <h4 class="price">$ 3.45 </h4>
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
                    </div> */}
                </div>
                <div>
                    {/* <div class="basic-product theme-product-1">
                        <div class="overflow-hidden">
                            <div class="img-wrapper">
                                <a href="product-page(accordian).html"><img
                                        src="../assets/images/fashion-1/product/3.jpg"
                                        class="img-fluid blur-up lazyload" alt=""/></a>
                                <div class="rating-label"><i class="ri-star-s-fill"></i> <span>4.5</span>
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
                                            VogueVista
                                        </a>
                                        <div class="color-panel">
                                            <ul>
                                                <li style={{backgroundcolor: "papayawhip"}}></li>
                                                <li style={{backgroundcolor: "burlywood"}}></li>
                                                <li style={{backgroundcolor: "gainsboro"}}></li>
                                            </ul>
                                            <span>+2</span>
                                        </div>
                                    </div>
                                    <h6>Versatile Shacket</h6>
                                    <h4 class="price">$ 3.12</h4>
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
                    </div> */}
                </div>
                <div>
                    {/* <div class="basic-product theme-product-1">
                        <div class="overflow-hidden">
                            <div class="img-wrapper">
                                <div class="ribbon"><span>Exclusive</span></div>
                                <a href="product-page(accordian).html"><img
                                        src="../assets/images/fashion-1/product/4.jpg"
                                        class="img-fluid blur-up lazyload" alt=""/></a>
                                <div class="rating-label"><i class="ri-star-s-fill"></i> <span>4.5</span>
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
                                            Glamour Gaze
                                        </a>

                                    </div>
                                    <h6>Chic Denim</h6>
                                    <h4 class="price">$ 5.19<del> $6.00 </del><span class="discounted-price"> 8% Off
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
                    </div> */}
                </div>
            </div>
            ) : (
                <p>Please login to view products</p>
            )}

        </div>
    </section>
  
    </div>
  )
}

export default Addget
