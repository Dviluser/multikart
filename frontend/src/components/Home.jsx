import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import HeroSlider from './HeroSlider'
import { API_BASE_URL } from '../config'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getdata()
  }, [])

  const getdata = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/proget`)
      const result = response.data
      if (result.statuscode == 1) {
        setProducts(result.data.slice(0, 8))
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="container" style={{ marginTop: "20px" }}>
        <HeroSlider />
      </div>

      <section className="container" style={{ marginTop: "50px" }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 style={{ margin: 0 }}>Featured Products</h3>
          <Link to="/cat">View all categories</Link>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products available yet.</p>
        ) : (
          <div className="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
            {products.map((data) => (
              <Link to={`/pd?pid=${data._id}`} key={data._id} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="basic-product theme-product-1">
                  <div className="overflow-hidden">
                    <div className="img-wrapper">
                      <img
                        src={`${API_BASE_URL}/uploads/${data.File}`}
                        className="img-fluid blur-up lazyload"
                        alt={data.ProductName}
                        style={{ height: "220px", objectFit: "cover", width: "100%" }}
                      />
                    </div>
                    <div className="product-detail">
                      <h6 style={{ marginTop: "10px" }}>{data.ProductName}</h6>
                      <h4 className="price">₹{data.ProductPrize}</h4>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
