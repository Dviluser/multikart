import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'



function Card() {
     const [arr,setarr]=useState([])
     const navigate=useNavigate()

    useEffect(()=>{
        if(!sessionStorage.getItem("user")){
            alert("Please login to shop")
            navigate("/login")
            return
        }
        cardget()
    },[])

    const cardget=async()=>{
        const Email=sessionStorage.getItem("user")
        if(!Email) return
 try{
        const  response=await axios.get(`${API_BASE_URL}/api/cadget/${Email}`)
        const result=await response.data
        if(result.statuscode==1){
        //    alert("data get successfully")
           setarr(result.data)
}else
    {
alert("data not successfully")
} 
         }catch(err){
            console.log(err)
        }
 }



 const incre=(ProductQuantity,id,prize)=>{
  
let Quantity=Number(ProductQuantity)+1


update(Quantity,id,prize)

}
const decre=(ProductQuantity,id,prize)=>{
if(ProductQuantity>1){
    let Quantity=Number(ProductQuantity)-1
    update(Quantity,id,prize)
}
}
    
       const  update=async(Quantity,id,prize)=>{
      let total=Number(Quantity)*Number(prize)
        try{
       const response= await axios.put(`${API_BASE_URL}/api/cardupdate/${id}`,{Quantity,total})
       const result=response.data
       if(result.statuscode==1){
         
        cardget()

       }else{
          alert("data  not get successfully")
       }
          }catch(err){
            console.log(err)
          }
        }



        const del=async(id)=>{
          try{ 
            const response=await axios.delete(`${API_BASE_URL}/api/cardel/${id}`)
            const result=response.data
            if(result.statuscode==1){
                alert("data deleted successfully")
            }else{
                alert("data not deleted")
            }
          }catch(err){
            console.log(err)
          }
        }

    return (
    <div>
     <div class="breadcrumb-section">
        <div class="container">
            <h2>Cart</h2>
            <nav class="theme-breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Cart</li>
                </ol>
            </nav>
        </div>
    </div>
   


  
    <section class="cart-section section-b-space">
        <div class="container">
             <div class="cart_counter">
                <div class="countdownholder">
                    Your cart will be expired in<span id="timer"></span> minutes!
                </div>
               <Link to="/check">check out</Link>
            </div> 
            <div class="table-responsive">
                <table class="table cart-table">
                    <thead>
                        <tr class="table-head">
                            <th>image</th>
                            <th>product name</th>
                            <th>price</th>
                            <th>quantity</th>
                            <th>total</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
{
    arr.map((data,i)=>
                        <tr>
                            <td>
                                <a href="product-page(accordian).html">
                                    <img src={`${API_BASE_URL}/uploads/${data.File}`} />
                                </a>
                            </td>
                            <td>
                                <a href="product-page(accordian).html">{data.ProductName}</a>
                                <div class="mobile-cart-content row">
                                    <div class="col">
                                        <div class="qty-box">
                                            <div class="input-group qty-container">
                                                <button class="btn qty-btn-minus">
                                                    <i class="ri-arrow-left-s-line"></i>
                                                </button>
                                                <input type="number" readonly="" name="qty"
                                                    class="form-control input-qty" value="1"/>
                                                <button class="btn qty-btn-plus">
                                                    <i class="ri-arrow-right-s-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col table-price">
                                        <h2 class="td-color"></h2>
                                    </div>
                                    <div class="col">
                                        <h2 class="td-color">
                                            <a href="product-page(accordian).html" class="icon remove-btn">
                                                <i class="ri-close-line"></i>
                                            </a>
                                        </h2>
                                    </div>
                                </div>
                            </td>
                            <td class="table-price">
                                <h2>{data.ProductPrize}</h2>
                            </td>
                            <td>
                                <div class="qty-box">
                                    <div class="input-group qty-container">
                                        <button class="btn qty-btn-minus" onClick={()=>decre(data.ProductQuantity,data._id,data.ProductPrize)}>
                                           -
                                        </button>
                                        <input type="number" readonly="" name="qty" class="form-control input-qty"
                                            value={data.ProductQuantity}/>
                                        <button class="btn qty-btn-plus"  onClick={()=>incre(data.ProductQuantity,data._id,data.ProductPrize)}>
                                           +
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h2 class="td-color">{data.Description}</h2>
                       <h2>{data.Totalcost}</h2>
                            </td>
                            <td>
                               
                                <a href="" class="icon remove-btn">
                                   <i class="fa-solid fa-trash" onClick={()=>del(data._id)}></i>
                                </a>
                            </td>
                        </tr>
   )
}
                    </tbody>
                 
                 
                    <tfoot>
                        
                    </tfoot>
                </table>
            </div>

            <div class="row cart-buttons">
                <div class="col-6">
                    <a href="category-page(category-slider).html" class="btn btn-solid text-capitalize">continue
                        shopping</a>
                        
                </div>
                <div class="col-6">
                 <Link to="/check">check out</Link>
                </div>
            </div>
        </div>
    </section>
   </div>
  )
}
export default Card
