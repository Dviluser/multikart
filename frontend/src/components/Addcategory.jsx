import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from '../config'

const nameRegex = /^[A-Za-z\s]{2,}$/

function Addcategory() {
    const [Category,setcategory]=useState("")
    const [file,setfile]=useState("")
    const [oldpic,setoldpic]=useState("")
    const [catid,setcatid]=useState("")
    const [flag,setflag]=useState(false)
    const[arr,setarr]=useState([])
    const [errors,setErrors]=useState({})
    useEffect(()=>{
getdata()
    },[])

    const validate=()=>{
      const errs={}
      const category=(Category||"").trim()
      if(!category){
        errs.Category="Category name is required"
      }else if(!nameRegex.test(category)){
        errs.Category="Only letters are allowed, numbers are not allowed"
      }
      if(!flag && !file){
        errs.file="Please choose an image"
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
       formdata.append("Category",Category)
        formdata.append("File",file)
       const response=await axios.post(`${API_BASE_URL}/api/login`,formdata)
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



    
    const del=async(id)=>{
      try{
        alert("hello")
        const response=await axios.delete(`${API_BASE_URL}/api/catdel/${id}`)
        const result=response.data
        if(result.statuscode==1){
          alert("data deleted")
          getdata();
``
        }else{
          alert("data not deleted")
        }
      }catch(err){
        console.log(err)
      }

    }


    const update=async()=>{
        try{
            
            const formdata=new FormData()
            formdata.append("Category",Category)
            formdata.append("File",file)
            formdata.append("oldpic",oldpic)
         const response=await axios.put(`${API_BASE_URL}/api/catup/${catid}`,formdata)
         const result=await response.data
         if(result.statuscode==1){
            alert("data update successfully")
            setflag(false)
            getdata()
         }else{
            alert("data not update successfully")
         }
        }catch(err){
            console.log(err)
        }
        
    }
     const up=async(data)=>{
    setcategory(data.Category)
    setoldpic(data.File)
    setcatid(data._id)
    setflag(true)

     }
  return (
    <div>
      <section class="login-page section-b-space">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <h3>Add category</h3>
                    <div class="theme-card">
                        <form class="theme-form" onSubmit={submit}>
                            <div class="form-box">
                                <label for="email" class="form-label">category name</label>
                                <input type="text" class={`form-control ${errors.Category?"is-invalid":""}`} id="email" placeholder="category name" value={Category} onChange={(e)=>setcategory(e.target.value)}
                                />
                                {errors.Category && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.Category}</div>}
                            </div>
                            <div class="form-box">
                                <label for="review" class="form-label">File</label>
                                <input type="file" class={`form-control ${errors.file?"is-invalid":""}`} id="review" onChange={(e)=>setfile(e.target.files[0])} />
                                {errors.file && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.file}</div>}
                            </div>
                        
                            <div style={{textAlign:"center", display:"flex",gap:"10px"}}>
                            <button  style={{width:"120px"}} class="btn btn-solid" type='submit'>{flag==true?"update":"Add"}</button>
                          
                            </div>
                           </form>
                    </div>
                </div>
            
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
                                        class="img-fluid blur-up lazyload" alt="" style={{width:"100%",height:"200px"}}/>
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
                               &nbsp; &nbsp; <button class="btn btn-solid" onClick={()=>del(data._id)}>delete</button> &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                                <button class="btn btn-solid"  onClick={()=>up(data)}>Update</button>
                            </div>
                        </div>
                    </div>

             </div>)}</div>
</div>
    </div>
  )}
export default Addcategory
