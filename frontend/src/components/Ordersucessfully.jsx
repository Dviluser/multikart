import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../config'

function Ordersucessfully() {

    const [arr, setarr] = useState([])
    const [Address, setaaddress] = useState("")
    const [Pincode, setpin] = useState("")
    const [Mobile, setmobile] = useState("")
    const [id, setid] = useState("")

    useEffect(() => {
        gett()
    }, [])

    const gett = async () => {
        const Email = sessionStorage.getItem("user")

        try {
            const response = await axios.get(`${API_BASE_URL}/api/fetch/${Email}`)
            const result = response.data

            if (result.statuscode == 1) {

                const data = result.data[0]   // ✅ FIX

                setarr(data.Products)
                setaaddress(data.Address)   // ✅ FIX
                setpin(data.Pincode)        // ✅ FIX
                setmobile(data.Mobile)      // ✅ FIX
                setid(data._id)             // ✅ FIX

            } else {
                alert("Data is not fetched")
            }

        } catch (err) {
            console.log(err)
        }
    }

    // ✅ TOTAL CALCULATION (correct place)
    const total = arr.reduce((sum, item) => {
        return sum + (Number(item.ProductQuantity) * Number(item.ProductPrize))
    }, 0)

    // ✅ DATE
    const today = new Date().toLocaleDateString()

    // ✅ DELIVERY DATE (+5 days)
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 5)
    const delivery = deliveryDate.toLocaleDateString()

    return (
        <div>

            <section className="section-b-space light-layout">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="success-text">
                                <h2>thank you</h2>
                                <p>Payment is successfully processsed and your order is on the way</p>
                                <p className="font-weight-bold">{`Transaction ${id}`}</p>
                                <Link to="/ordert" className="btn btn-solid">Track Your Order</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-b-space">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-6">
                            <div className="product-order">
                                <table className="table product-order-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>product name</th>
                                            <th>quantity</th>
                                            <th>price</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            arr.map((data, index) =>
                                                <tr key={index}>
                                                    <td>
                                                        <img
                                                            src={`${API_BASE_URL}/uploads/${data.File}`}
                                                            alt=""
                                                            className="w-100 img-fluid blur-up lazyload"
                                                        />
                                                    </td>
                                                    <td>{data.ProductName}</td>
                                                    <td>{data.ProductQuantity}</td>
                                                    <td>{data.ProductPrize}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>

                                    <tfoot>
                                        <tr>
                                            <td colSpan="2">total</td>
                                            <td colSpan="2">{total}</td> {/* ✅ FIX */}
                                        </tr>
                                    </tfoot>

                                </table>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="order-success-sec">
                                <div className="row">

                                    <div className="col-sm-6">
                                        <h4>summery</h4>
                                        <ul className="order-detail">
                                            <li>order ID: {id}</li>
                                            <li>Order Date: {today}</li>
                                            <li>Order Total: ₹{total}</li>
                                        </ul>
                                    </div>

                                    <div className="col-sm-6">
                                        <h4>shipping address</h4>
                                        <ul className="order-detail">
                                            <li>{Address}</li>
                                            <li>Pincode: {Pincode}</li>
                                            <li>Contact No. {Mobile}</li>
                                        </ul>
                                    </div>

                                    <div className="col-sm-12 payment-mode">
                                        <h4>payment method</h4>
                                        <p>Pay on Delivery (Cash/Card).</p>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="delivery-sec">
                                            <h3>expected date of delivery: <span>{delivery}</span></h3>
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

export default Ordersucessfully