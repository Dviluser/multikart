import React, { useEffect, useState } from 'react'
import axios from "axios"
import { API_BASE_URL } from '../config'

// text-only fields must not contain digits, numeric fields must not contain letters
const productNameRegex = /^(?=.*[A-Za-z])[A-Za-z0-9\s.\-]{2,}$/
const quantityRegex = /^[1-9]\d*$/
const priceRegex = /^\d+(\.\d{1,2})?$/
const sizeRegex = /^[A-Za-z0-9\s.\-]{1,20}$/

function Product() {
   const [ProductName,setproductname]=useState("")
    const [ProductQuantity,setproductquantity]=useState("")
    const [ProductPrize,setproductprize]=useState("")
    const [ProductDescription,setproductdescription]=useState("")
    const[Size,setsize]=useState("")
    const [File,setfile]=useState("")
    const[arr,setarr]=useState([])
    const [arr1,setarr1]=useState([])
        const [id,setid]=useState()
        const [flag,setflag]=useState(false)
        const[oldpic,setoldpic]=useState()
        const[pid,setpid]=useState()
        const [errors,setErrors]=useState({})
useEffect(()=>{
    getdata()
    getcat()
        },[])

    const validate=()=>{
      const errs={}
      if(!id){
        errs.id="Please choose a category"
      }
      if(!ProductName.trim()){
        errs.ProductName="Product name is required"
      }else if(!productNameRegex.test(ProductName.trim())){
        errs.ProductName="Enter a valid product name (letters required, no special symbols)"
      }
      if(!String(ProductQuantity).trim()){
        errs.ProductQuantity="Product quantity is required"
      }else if(!quantityRegex.test(String(ProductQuantity).trim())){
        errs.ProductQuantity="Quantity must be a number only, no letters"
      }
      if(!String(ProductPrize).trim()){
        errs.ProductPrize="Product price is required"
      }else if(!priceRegex.test(String(ProductPrize).trim())){
        errs.ProductPrize="Price must be a number only, no letters"
      }
      if(!ProductDescription.trim()){
        errs.ProductDescription="Product description is required"
      }
      if(!Size.trim()){
        errs.Size="Size is required"
      }else if(!sizeRegex.test(Size.trim())){
        errs.Size="Enter a valid size"
      }
      if(!flag && !File){
        errs.File="Please choose an image"
      }
      setErrors(errs)
      return Object.keys(errs).length===0
    }

    const submit=async(e)=>{

       e.preventDefault()
       if(!validate()) return
       if(flag==true){
        update()
        return;
       }
       try{
       const formdata=new FormData()
        formdata.append("ProductName",ProductName)
        formdata.append("ProductQuantity",ProductQuantity)
        formdata.append("ProductPrize",ProductPrize)
        formdata.append("ProductDescription",ProductDescription)
        formdata.append("File",File)
        formdata.append("Size",Size)
        formdata.append("subid",id)
       const response=await axios.post(`${API_BASE_URL}/api/product`,formdata)
       const result=response.data
       console.log(result)
       if(result.statuscode==1){
        alert("data is store ")
       }else{
        alert("data not store")
       }
     }catch(err){
        console.log(err)
     }
 
    }

const getdata=async()=>{
   try{
    const response=await axios.get(`${API_BASE_URL}/api/proget`)
    const result=await response.data
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

    
    const del=async(id)=>{
      try{
        alert("hello")
        const response=await axios.delete(`${API_BASE_URL}/api/prodel/${id}`)
        const result=response.data
        if(result.statuscode==1){
          alert("data deleted")
          getdata();

        }else{
          alert("data not deleted")
        }
      }catch(err){
        console.log(err)
      }

    }

    const getcat=async()=>{
   try{
    const response=await axios.get(`${API_BASE_URL}/api/subget`)
    const result=await response.data
    if(result.statuscode==1){
        alert("data get sucessfully")
        console.log(result.data)
        setarr1(result.data)

    }else{
        alert("data not get sucessfully")
    }
    }
      catch(err){
    console.log(err)
}
    }
  
    const update=async()=>{
        try{
          const formdata=new FormData()
            formdata.append("ProductName",ProductName)
            formdata.append("ProductQuantity",ProductQuantity)
            formdata.append("ProductPrize",ProductPrize)
            formdata.append("ProductDescription",ProductDescription)
            formdata.append("Size",Size)
            formdata.append("File",File)

         const response=await axios.put(`${API_BASE_URL}/api/proupdate/${pid}`,formdata)
         const result=await response.data

            if(result.statuscode==1){
                alert("data update successfully")
                setflag(false)
                getdata()

            }else{
                alert("data not update successfully")
            }
        }catch(err)
{
    console.log(err)
}    }


    const up=async(data)=>{
    setpid(data._id)
    setproductname(data.ProductName)
    setproductquantity(data.ProductQuantity)
    setproductprize(data.ProductPrize)
    setproductdescription(data.ProductDescription)
    setoldpic(data.File)
     setflag(true)
    }
  return (
    <div>
        <section class="login-page section-b-space">
        <div class="container">
            <h3>Product Information</h3>
            <div class="theme-card">
                <form class="theme-form"  onSubmit={submit}>
                                             <select onChange={(e)=>setid(e.target.value)}>
                                    <option value="">choose</option>
{
    arr1.map((data,i)=>
    <option value={data._id}>{data.
Subcategory}
</option>
    )
}
                                </select>
                                {errors.id && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.id}</div>}
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-box">
                                <label for="product" class="form-label">Product Name</label>
                                <input type="text" class={`form-control ${errors.ProductName?"is-invalid":""}`} id="fname" placeholder="Product Name" value={ProductName} onChange={(e)=>setproductname(e.target.value)} />
                                {errors.ProductName && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.ProductName}</div>}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-box">
                                <label for="review" class="form-label">Product Quantity</label>
                                <input type="text" class={`form-control ${errors.ProductQuantity?"is-invalid":""}`} id="lname" placeholder="Product Quantity"   value={ProductQuantity} onChange={(e)=>setproductquantity(e.target.value)}
                                    />
                                {errors.ProductQuantity && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.ProductQuantity}</div>}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-box">
                                <label for="text" class="form-label">Product Prize</label>
                                <input type="text" class={`form-control ${errors.ProductPrize?"is-invalid":""}`} id="email" placeholder="Product Prize" value={ProductPrize} onChange={(e)=>setproductprize(e.target.value)} />
                                {errors.ProductPrize && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.ProductPrize}</div>}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-box">
                                <label for="review" class="form-label">Product Description</label>
                                <input type="Text" class={`form-control ${errors.ProductDescription?"is-invalid":""}`} id="review" value={ProductDescription}
                                    placeholder="Product Description" onChange={(e)=>setproductdescription(e.target.value)} />
                                {errors.ProductDescription && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.ProductDescription}</div>}
                            </div>
                        </div>
                        <div class="form-box">
                                <label for="review" class="form-label">File</label>
                                <input type="file" class={`form-control ${errors.File?"is-invalid":""}`} id="review"  onChange={(e)=>setfile(e.target.files[0]) }
                                />
                                {errors.File && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.File}</div>}
</div>
                          <div class="col-md-6">
                            <div class="form-box">
                                <label for="review" class="form-label">Size</label>
                                <input type="Text" class={`form-control ${errors.Size?"is-invalid":""}`} id="review"
                                    placeholder="Size" value={Size} onChange={(e)=>setsize(e.target.value)} />
                                {errors.Size && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.Size}</div>}
                            </div>


                            </div>
                        <div class="col-12">
                           <button class="btn btn-solid w-auto"  type='submit'>{flag==true?"Update":"AddProduct"}</button>
                        </div>
                    </div>     
                     
                </form>
          
            </div>
        </div>
    </section>
    <div class="container">
    <div class="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
                        {
                        arr.map((data,i)=>
                            
                        <div>
                    <div class="basic-product theme-product-1">
                        <div class="overflow-hidden">
                            <div class="img-wrapper">
                                <div class="ribbon"><span>Exclusive</span></div>
                                <a href="product-page(image-swatch).html">
                                    <img src={`${API_BASE_URL}/uploads/${data.File}`}
                                        class="img-fluid blur-up lazyload" alt="" style={{width:"100%",height:"250px"}}/>
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
                                   &nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-solid" onClick={()=>del(data._id)}>delete</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                   <button  class="btn btn-solid" onClick={()=>up(data)}>Update</button>
                            </div>
                        </div>
                    </div>

                </div>
              
)}</div>
        </div>
    </div>
   
  )
}

export default Product
