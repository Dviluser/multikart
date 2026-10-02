import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../config'

function Checkout() {
    const [Address,setaaddress]=useState("")
    const[Pin,setpin]=useState("")
    const[Mobile,setmobile]=useState("")
    // const[ProductName,setproductname]=useState("")
    // const[ProductPrize,setProductPrize]=useState("")
    // const[ProductQuantity,setProductQuantity]=useState("")
    const[arr,setarr]=useState([])
    const [totall,settotal]=useState()
    const [errors,setErrors]=useState({})

    const validate=()=>{
      const errs={}
      if(!Address.trim()){
        errs.Address="Address is required"
      }else if(Address.trim().length<10){
        errs.Address="Please enter a complete address (min 10 characters)"
      }
      if(!Pin.trim()){
        errs.Pin="Pincode is required"
      }else if(!/^\d{6}$/.test(Pin.trim())){
        errs.Pin="Enter a valid 6 digit pincode"
      }
      if(!Mobile.trim()){
        errs.Mobile="Mobile number is required"
      }else if(!/^[6-9]\d{9}$/.test(Mobile.trim())){
        errs.Mobile="Enter a valid 10 digit mobile number"
      }
      setErrors(errs)
      return Object.keys(errs).length===0
    }



  const [method, setMethod] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setMethod(value);

    // if (value === "card") {
    //   navigate("/payment"); // redirect
    // }
  };

const navigate=useNavigate()
    useEffect(()=>{
if(!sessionStorage.getItem("user")){
    alert("Please login to shop")
    navigate("/login")
    return
}
gett()
// console.log(totalcost())

    },[])
useEffect(() => {

 settotal(arr.reduce((acc, item) => {
    return acc + Number(item.ProductPrize) * Number(item.ProductQuantity);
  }, 0));


}, [arr]);


    const submit= async(e)=>{
      const Email=sessionStorage.getItem("user")
      if(!Email){
        alert("Please login to shop")
        navigate("/login")
        return
      }
      if(!validate()){
        return
      }
 if(!method){
        alert("Please select a payment method")
        return
      }
        const data={
            Address,
            Pin,
            Mobile,
            Email,
            arr
        }
        console.log(arr)

        try{
            const response = await axios.post(`${API_BASE_URL}/api/check`,data)
            const result=await response.data
            if(result.statuscode==1){
               if(method==="card"){
                    // Address saved, now hand off to Stripe Checkout
                    await payWithStripe(Email)
                }else{  
  alert("Data Added")
navigate({
    pathname:"/order",
    search:`?Email=${Email}`
})}
            }else{
                alert("data not added")
            }
          

        }
        catch(err)
        {
            console.log(err)
        }
    }


    const gett=async()=>{
    let Email=sessionStorage.getItem("user")
    console.log(Email)
    try{
        const response=await axios.get(`${API_BASE_URL}/api/cadget/${Email}`)
        const result= await response.data
        if(result.statuscode==1){
            alert("get data successfully")
            setarr(result.data)
            console.log(result.data)
            // totalcost()

        }else{
            alert("invalid")
        }
    }catch(err){
        console.log(err)
    }
    }
   
const payWithStripe= async(Email)=>{
        try{
            const response = await axios.post(`${API_BASE_URL}/api/create-checkout-session`,{arr,Email})
            const result = response.data
            if(result.success){
                window.location.href = result.url
            }else{
                alert("Unable to start payment")
            }
        }catch(err){
            console.log(err)
            alert("Unable to start payment")
        }
    }



  

  return (
    
     
    <div>
      
    <section class="section-b-space checkout-section-2">
        <div class="container">
            <div class="checkout-page">
                <div class="checkout-form">
                    <div class="row g-sm-4 g-3">
                        <div class="col-lg-7">
                            <div class="left-sidebar-checkout">
                                <div class="checkout-detail-box">
                                    <ul>
                                        <li>
                                            <div class="checkout-box">
                                                <div class="checkout-title">
                                                    <h4>Shipping Address</h4>
                                                    <button data-bs-toggle="modal" data-bs-target="#addAddress"
                                                        class="d-flex align-items-center btn"><i
                                                            class="ri-add-line me-1"></i> Add New</button>
                                                          


                                                    
                            <div class="form-box">
                                <label for="" class="form-label">Address</label>
                                <input type="text" class={`form-control ${errors.Address?"is-invalid":""}`} id="textarea" placeholder="Address" value={Address} onChange={(e)=>setaaddress(e.target.value)} 
                                />
                                {errors.Address && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.Address}</div>}
                            </div>
                            <div class="form-box">
                                <label for="review" class="form-label">Pincode</label>
                                <input type="text" class={`form-control ${errors.Pin?"is-invalid":""}`} id="pin" value={Pin} onChange={(e)=>setpin(e.target.value) }
                                    />
                                {errors.Pin && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.Pin}</div>}
                            </div>
                             <div class="form-box">
                                <label for="review" class="form-label">Mobile</label>
                                <input type="text" class={`form-control ${errors.Mobile?"is-invalid":""}`} id="mobile" value={Mobile} onChange={(e)=>setmobile(e.target.value) }
                                    />
                                {errors.Mobile && <div style={{color:"#dc3545",fontSize:"13px",marginTop:"4px"}}>{errors.Mobile}</div>}
                            </div>
                            
                                                                    </div>

                                                <div class="checkout-detail">
                                                    <div class="row g-3">
                                                        {/* <div class="col-xxl-6 col-lg-12 col-md-6">
                                                            <div class="delivery-address-box">
                                                                <input class="form-check-input" type="radio"
                                                                    name="flexRadioDefault" id="check" checked/>
                                                                <label class="form-check-label" for="check">
                                                                    <span class="name">New Home</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Address :</span> 26,
                                                                        Starts Hollow Colony, Denver, Colorado, United
                                                                        States</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Pin Code :</span>
                                                                        80014</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Phone :</span> +1
                                                                        5551855359</span>
                                                                </label>
                                                            </div>
                                                        </div> */}

                                                        {/* <div class="col-xxl-6 col-lg-12 col-md-6">
                                                            <div class="delivery-address-box">
                                                                <input class="form-check-input" type="radio"
                                                                    name="flexRadioDefault" id="check1"/>
                                                                <label class="form-check-label" for="check1">
                                                                    <span class="name">Old Home</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Address :</span> 53B,
                                                                        Claire New Street, San Jose, Colorado, United
                                                                        States</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Pin Code :</span>
                                                                        36954</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Phone :</span> +1
                                                                        5551855359</span>
                                                                </label>
                                                            </div>
                                                        </div> */}

                                                        {/* <div class="col-xxl-6 col-lg-12 col-md-6">
                                                            <div class="delivery-address-box">
                                                                <input class="form-check-input" type="radio"
                                                                    name="flexRadioDefault" id="check2"/>
                                                                <label class="form-check-label" for="check2">
                                                                    <span class="name">Office</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Address :</span> 21B, Row
                                                                        New Street, San Jose, California, United
                                                                        States</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Pin Code :</span>
                                                                        32659</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Phone :</span> +1
                                                                        5551855359</span>
                                                                </label>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        {/* <li>
                                            <div class="checkout-box">
                                                <div class="checkout-title">
                                                    <h4>Billing Address</h4>
                                                    <button data-bs-toggle="modal" data-bs-target="#addAddress"
                                                        class="d-flex align-items-center btn"><i
                                                            class="ri-add-line me-1"></i> Add New</button>
                                                </div>

                                                <div class="checkout-detail">
                                                    <div class="row g-3">
                                                        <div class="col-xxl-6 col-lg-12 col-md-6">
                                                            <div class="delivery-address-box">
                                                                <input class="form-check-input" type="radio"
                                                                    name="checkbox" id="check3"/>
                                                                <label class="form-check-label" for="check3">
                                                                    <span class="name">New Home</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Address :</span> 26,
                                                                        Starts Hollow Colony, Denver, Colorado, United
                                                                        States</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Pin Code :</span>
                                                                        80014</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Phone :</span> +1
                                                                        5551855359</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div class="col-xxl-6 col-lg-12 col-md-6">
                                                            <div class="delivery-address-box">
                                                                <input class="form-check-input" type="radio"
                                                                    name="checkbox" id="check4" checked/>
                                                                <label class="form-check-label" for="check4">
                                                                    <span class="name">Old Home</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Address :</span> 53B,
                                                                        Claire New Street, San Jose, Colorado, United
                                                                        States</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Pin Code :</span>
                                                                        36954</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Phone :</span> +1
                                                                        5551855359</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div class="col-xxl-6 col-lg-12 col-md-6">
                                                            <div class="delivery-address-box">
                                                                <input class="form-check-input" type="radio"
                                                                    name="checkbox" id="check5"/>
                                                                <label class="form-check-label" for="check5">
                                                                    <span class="name">Office</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Address :</span> 21B, Row
                                                                        New Street, San Jose, California, United
                                                                        States</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Pin Code :</span>
                                                                        32659</span>
                                                                    <span class="address text-content"><span
                                                                            class="text-title">Phone :</span> +1
                                                                        5551855359</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li> */}

                                        <li>
                                            <div class="checkout-box">
                                                <div class="checkout-title">
                                                    <h4>Delivery Options</h4>
                                                </div>

                                                <div class="checkout-detail">
                                                    <div class="row g-3">
                                                        <div class="col-xxl-6 col-lg-12 col-md-6">
                                                            <div class="delivery-address-box">
                                                                <input class="form-check-input" type="radio"
                                                                    name="checkbox2" id="check7"/>
                                                                <label class="form-check-label" for="check7">Standard
                                                                    Delivery | Approx 5 to 7 Days</label>
                                                            </div>
                                                        </div>

                                                        <div class="col-xxl-6 col-lg-12 col-md-6">
                                                            <div class="delivery-address-box">
                                                                <input class="form-check-input" type="radio"
                                                                    name="checkbox2" id="check8" checked/>
                                                                <label class="form-check-label" for="check8">Express
                                                                    Delivery | Schedule </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div class="checkout-box">
                                                <div class="checkout-title">
                                                    <h4>Payment Options</h4>
                                                </div>

                                                <div class="checkout-detail">
                                                    <div class="row g-3">
                                                        <div class="col-sm-6">
                                                          
                                                               {/* <select name="choose" id="Payment method" style={{width:"700px"}}> */}
  {/* <option value="cash">Cash on Delivery</option>
 <Link to="/payment"> <option value="card">Credit card</option></Link> */}

 <select onChange={handleChange}>
      <option value="">Select Payment Method</option>
      <option value="card">Credit Card</option>
      <option value="cash">Cash on Delivery</option>
    </select>
  
{/* </select> */}
                                                      
                                                        </div>

                                                        

                                                        {/* <div class="col-sm-6">
                                                            <div class="delivery-address-box">
                                                                <input class="form-check-input" type="radio"
                                                                    name="checkbox3" id="check11" checked/>
                                                                <label class="form-check-label"
                                                                    for="check11">STRIPE</label>
                                                            </div>
                                                        </div> */}

     
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div class="checkout-right-box">
                                <div class="checkout-details">
                                    <div class="order-box">
                                        <div class="title-box">
                                            <h4>Summary Order</h4>
                                            <p>For a better experience, verify your goods and choose your shipping
                                                option.</p>
                                        </div>

                                        <ul class="qty">
                                            {
                                                arr.map((data,i)=>
                                             
                                            <li>
                                                <div class="cart-image">
                                                     <img src={`${API_BASE_URL}/uploads/${data.File}`} alt=""
                                                    class="w-100 img-fluid blur-up lazyload"/>
                                                       
                                                </div>
                                                <div class="cart-content">
                                                    <div>
                                                        <h4>{data.ProductName}</h4>
                                                        <h5>{data.ProductQuantity}</h5>
                                                     <h5>{data.ProductPrize}</h5>

                                                    </div>
                                                    <span class="text-theme">{data.ProductPrize*data.ProductQuantity
                                                        }</span>
                                                </div>
                                            </li>
   )
                                            }
                                        
                                        </ul>
                                    </div>
                                </div>

                                <div class="checkout-details">
                                    <div class="order-box">
                                        <div class="title-box">
                                            <h4>Billing Summary</h4>
                                            <div class="promo-code-box">
                                                <div class="promo-title">
                                                    <h5>Promo code</h5>
                                                    <button class="btn" data-bs-toggle="modal"
                                                        data-bs-target="#couponModal"><i class="ri-coupon-line"></i>View
                                                        All</button>
                                                </div>
                                                <div class="row g-sm-3 g-2 mb-3">
                                                    <div class="col-md-6">
                                                        <div class="coupon-box">
                                                            <div class="card-name">
                                                                <h6>Holiday Savings</h6>
                                                            </div>
                                                            <div class="coupon-content">
                                                                <div class="coupon-apply">
                                                                    <h6 class="coupon-code success-color">#HOLIDAY40
                                                                    </h6>
                                                                    <a class="btn theme-btn border-btn copy-btn mt-0"
                                                                        href="#!">Copy Code</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-md-6">
                                                        <div class="coupon-box">
                                                            <div class="card-name">
                                                                <h6>Holiday Savings</h6>
                                                            </div>
                                                            <div class="coupon-content">
                                                                <div class="coupon-apply">
                                                                    <h6 class="coupon-code success-color">#HOLIDAY40
                                                                    </h6>
                                                                    <a class="btn theme-btn border-btn copy-btn mt-0"
                                                                        href="#!">Copy Code</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="coupon-input-box">
                                                    <input type="text" id="coupon" class="form-control"
                                                        placeholder="Enter Coupon Code Here..."/>
                                                    <button class="apply-button btn">Apply now</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="custom-box-loader">
                                            <ul class="sub-total">
                                                
                                                <li class="border-cls">
                                                    <label for="ponts" class="form-check-label m-0">Would you prefer
                                                        to pay using points?</label>
                                                    <input type="checkbox" id="ponts"
                                                        class="checkbox_animated check-it"/>
                                                </li>
                                                
                                                <li class="border-cls">
                                                    <label for="wallet" class="form-check-label m-0">Would you
                                                        prefer to pay using wallet?</label>
                                                    <input type="checkbox" id="wallet"
                                                        class="checkbox_animated check-it"/>
                                                </li>
                                            </ul>
                                        </div>
                                        <ul class="total">
                                            <li>Total <span class="count">{totall}</span></li>
                                        </ul>
                                        <div class="text-end">
                                            <button class="btn order-btn" onClick={submit}>Place Order</button>
                                        </div>
                                    </div>
                                </div>
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

export default Checkout
