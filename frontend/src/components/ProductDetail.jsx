import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import "./ProductDetail.css"
import Product3DView from './Product3DView'
import { API_BASE_URL } from '../config'
function ProductDetail() {
           useEffect(()=>{
          getda()
           },[])
           const [ProductName,setproductname]=useState("")
               const [ProductQuantity,setproductquantity]=useState("")
               const [ProductPrize,setproductprize]=useState("")
               const [ProductDescription,setproductdescription]=useState("")
               const [File,setfile]=useState("")
               const [id,setid]=useState("")
               const[Email,setemail]=useState()
            //    const [Totalcost,settotalcost]=useState(0)
               const navigate=useNavigate()


  const [params]=useSearchParams()
      const pid=params.get("pid")
     const getda=async()=>{
      
           try{
          const response=await axios.get(`${API_BASE_URL}/api/pdetail/${pid}`)
          const result=response.data
          if(result.statuscode==1){
           alert("data get successfully")
        setproductname(result.data.ProductName)
        setproductquantity(result.data.ProductQuantity)
        setproductprize(result.data.ProductPrize)
        setproductdescription(result.data.ProductDescription)
        setfile(result.data.File)

        setid(result.data._id)
       }else
           {
               alert("data not successfully")}
           }catch(err){
               console.log(err)
           }
       }
const incre=()=>{
  
let Quantity=Number(ProductQuantity)+1

update(Quantity,id)

}
const decre=()=>{
if(ProductQuantity>1){
    let Quantity=Number(ProductQuantity)-1
    update(Quantity,id)
}
}
    
       const  update=async(Quantity,id)=>{
      
        try{
       const response= await axios.put(`${API_BASE_URL}/api/ProductQuantity/${id}`,{Quantity})
       const result=response.data
       if(result.statuscode==1){
           alert("data get successfully")
           getda()

       }else{
          alert("data  not get successfully")
       }
          }catch(err){
            console.log(err)
          }
        }



        const gett=async()=>{
            try{
let Email=sessionStorage.getItem("user")
if(!Email){
    alert("Please login to add items to cart")
    navigate("/login")
    return
}

   let Totalcost=Number(ProductQuantity)*Number(ProductPrize)

            const data={ProductName,ProductQuantity,ProductPrize,ProductDescription,File,Totalcost,Email}  
            const response=await axios.post(`${API_BASE_URL}/api/cardd`,data)
            const result=response.data
            if(result.statuscode==1){
                alert("data store successfully")
navigate("/Card")
            }else{
                alert("data not store successfully")
            }

            }catch(err){
            console.log(err)}
        }
  return (
    <div>
        <section>
        <div class="collection-wrapper">
            <div class="container">
                <div class="collection-wrapper">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="row g-0">
                                <div class="col-12">
                                    <div class="product-slick">
                                        <div>
                                            <div class="position-relative">
                                                <Product3DView
                                                    src={`${API_BASE_URL}/uploads/${File}`}
                                                    alt={ProductName}
                                                />
                                                {/* <button type="button" class="media-btn" data-bs-toggle="modal"
                                                    data-bs-target="#videoModal">
                                                    <i class="ri-play-fill"></i>
                                                </button> */}
                                            </div>
                                        </div>
                                        <div>
                                            <img src="" alt=""
                                                class="w-100 img-fluid blur-up lazyload"/>
                                        </div>
                                        <div>
                                            <img src="" alt=""
                                                class="w-100 img-fluid blur-up lazyload"/>
                                        </div>
                                        <div>
                                            <img src="" alt=""
                                                class="w-100 img-fluid blur-up lazyload"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="slider-nav">
                                        <div>
                                            <img src="" alt=""
                                                class="img-fluid blur-up lazyload"/>
                                        </div>
                                        <div>
                                            <img src="" alt=""
                                                class="img-fluid blur-up lazyload"/>
                                        </div>
                                        <div>
                                            <img src="" alt=""
                                                class="img-fluid blur-up lazyload"/>
                                        </div>
                                        <div>
                                            <img src="" alt=""
                                                class="img-fluid blur-up lazyload"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="product-page-details product-description-box sticky-details">
                                <div class="trending-text ">
                                    <img src="" class="img-fluid" alt=""/>
                                    <h5>Selling fast! 4 people have this in their carts.
                                    </h5>
                                </div>

                                <h2 class="main-title">{ProductName}</h2>
                                <div class="product-rating">
                                    <div class="rating-list">
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-fill"></i>
                                        <i class="ri-star-line"></i>
                                    </div>

                                    <span class="divider">|</span>
                                    <a href="#!">20 Reviews</a>
                                </div>

                                <div class="price-text">
                                    <h3><span class="fw-normal">Rs{ProductPrize}</span>
                                        
                                    </h3><span>Inclusive all the text </span>
                                </div>

                                <div class="size-delivery-info flex-wrap">
                                    <a href="#return" data-bs-toggle="modal" class=""><i class="ri-truck-line"></i>
                                        Delivery &amp; Return </a>

                                    <a href="#ask-question" class="" data-bs-toggle="modal"><i
                                            class="ri-questionnaire-line"></i>
                                        Ask a Question </a>

                                </div>


                                <div class="accordion accordion-flush product-accordion" id="accordionFlushExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                                aria-expanded="false" aria-controls="flush-collapseOne">
                                                Product Description </button>
                                        </h2>
                                        <div id="flush-collapseOne" class="accordion-collapse collapse"
                                            data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">
                                                <p>{ProductDescription}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                                aria-controls="flush-collapseTwo">
                                                Information </button>
                                        </h2>
                                        <div id="flush-collapseTwo" class="accordion-collapse collapse show"
                                            data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">
                                                <div class="bordered-box border-0 mt-0 pt-0">
                                                    <h4 class="sub-title">
                                                        product Info</h4>
                                                    <ul class="shipping-info">
                                                        <li><span>SKU: </span>SP18
                                                            (COPY) </li>

                                                        <li><span>Unit: </span>1
                                                            Item </li>

                                                        <li><span>Weight:
                                                            </span>150 Gms </li>

                                                        <li><span>Stock Status:
                                                            </span>In stock </li>

                                                        <li><span>{ProductQuantity}
                                                            </span>40 Items Left </li>
                                                    </ul>
                                                </div>

                                                <div class="bordered-box">
                                                    <h4 class="sub-title">
                                                        Delivery Details</h4>
                                                    <ul class="delivery-details">
                                                        <li><i class="ri-truck-line"></i> Your order is
                                                            likely to reach you within 7 days. </li>

                                                        <li><i class="ri-arrow-left-right-line"></i>
                                                            Hassle free returns within 7 Days. </li>
                                                    </ul>
                                                </div>

                                                <div class="dashed-border-box mb-0">
                                                    <h4 class="sub-title">Guaranteed Safe Checkout</h4>
                                                    <img class="img-fluid" alt=""
                                                        src=""/>
                                                </div>

                                                <div class="dashed-border-box mb-0">
                                                    <h4 class="sub-title">Secure Checkout</h4>
                                                    <img class="img-fluid" alt=""
                                                        src=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="product-page-details product-form-box product-right-box d-flex
                                align-items-center flex-column">
                                <h4 class="sub-title">Colour:</h4>
                                <div class="variation-box size-box">
                                    <ul class="image-box image">
                                        <li class="active">
                                            <a>
                                                <img src="" alt=""/>
                                            </a>
                                        </li>

                                        <li>
                                            <a>
                                                <img src="" alt=""/>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <img src="" alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="product-buttons">
                                    <div class="qty-section">
                                        <div class="qty-box">
                                            <div class="input-group">
                                                <span class="input-group-prepend">
                                                    <button type="button" class="btn quantity-left-minus"
                                                        data-type="minus" data-field="" onClick={decre}>
                                                     -
                                                    </button>
                                                </span>
                                                <input type="text" name="quantity" class="form-control input-number"
                                                    value={ProductQuantity}/>
                                                <span class="input-group-prepend">
                                                    <button type="button" class="btn quantity-right-plus"
                                                        data-type="plus" data-field="" onClick={incre}>
                                                   +
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="product-buttons">
                                    <div class="d-flex align-items-center gap-3">
                                        <button class="btn btn-solid text-white"
                                            type="button" onClick={gett}> Add to cart
                                        </button>
                                        <a href="#!" class="btn btn-solid">Buy Now
                                        </a>
                                    </div>
                                </div>

                                <div class="left-progressbar w-100">
                                    <h6>Please Hurry Only 10 Left In Stock</h6>
                                    <div role="progressbar" class="progress">
                                        <div class="progress-bar" style={{width: "100%"}}>
                                        </div>
                                    </div>
                                </div>

                                <div class="buy-box justify-content-center gap-3">
                                    <a href="#!">
                                        <i class="ri-heart-line"></i>
                                        <span>Add To Wishlist</span>
                                    </a>

                                    <a href="#!" class="add-compare">
                                        <i class="ri-refresh-line"></i>
                                        <span>Add To Compare</span>
                                    </a>

                                    <a href="#share" data-bs-toggle="modal">
                                        <i class="ri-share-line"></i>
                                        <span>Share</span>
                                    </a>
                                </div>

                                <ul class="nav nav-tabs nav-material" id="top-tab" role="tablist">
                        {/* <li class="nav-item" role="presentation"><a class="nav-link active" id="top-home-tab" data-bs-toggle="tab" href="#top-home" role="tab" aria-selected="true"><i class="icofont icofont-ui-home"></i>Description</a>
                        </li> */}

                        {/* <li class="nav-item" role="presentation"><a class="nav-link" id="review-top-tab" data-bs-toggle="tab" href="#top-review" role="tab" aria-selected="false" tabindex="-1" style={{fontSize:"20px",marginLeft:"170px"}}><i class="icofont icofont-contacts"></i>Review</a>
                        </li> */}
                        <div class="review-card">
        <li class="nav-item" role="presentation"><a class="nav-link" id="review-top-tab" data-bs-toggle="tab" href="#top-review" role="tab" aria-selected="false" tabindex="-1" style={{fontSize:"20px",marginLeft:"20px"}}><i class="icofont icofont-contacts"></i>Review</a>
                        </li>
                        </div>
    <div class="user">
        <div class="user-icon"></div>
        <div class="name">Bhushan Wadhai</div>
    </div>

    <div>
        {/* <span class="rating">4.0 ★</span> */}
        <span class="date">Posted on 18 June 2026</span>
    </div>

    <div class="review-text">
        Price ke according thik thak hai 5-6 month easily chal jayegi bas thoda cheap feel aata hai lekin chalra haj
    </div>

    <img src="your-image.jpg" alt="Review Image" class="review-img"/>

    {/* <div class="helpful">👍 Helpful (10)</div> */}
                        {/* <li class="nav-item" role="presentation"><a class="nav-link" id="contact-top-tab" data-bs-toggle="tab" href="#top-contact" role="tab" aria-selected="false" tabindex="-1"><i class="icofont icofont-contacts"></i>Q &amp; A</a>
                        </li> */}
                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default ProductDetail
