import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config'

const STEPS = ["Processing", "Shipped", "Out for Delivery", "Delivered"]

function orderTotal(order) {
  return (order.Products || []).reduce(
    (acc, item) => acc + Number(item.ProductPrize || 0) * Number(item.ProductQuantity || 0),
    0
  )
}

function formatDate(d) {
  if (!d) return "-"
  return new Date(d).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  })
}

function StatusTracker({ status }) {
  if (status === "Cancelled") {
    return <div style={{ color: "#dc3545", fontWeight: 600 }}>Cancelled</div>
  }
  const currentIndex = STEPS.indexOf(status)
  return (
    <div style={styles.tracker}>
      {STEPS.map((step, i) => (
        <div key={step} style={styles.trackerStep}>
          <div style={{
            ...styles.trackerDot,
            backgroundColor: i <= currentIndex ? "#28a745" : "#e0e0e0",
            color: i <= currentIndex ? "#fff" : "#888"
          }}>
            {i < currentIndex ? "✓" : i + 1}
          </div>
          <span style={{
            ...styles.trackerLabel,
            color: i <= currentIndex ? "#28a745" : "#888",
            fontWeight: i === currentIndex ? 700 : 400
          }}>{step}</span>
          {i < STEPS.length - 1 && (
            <div style={{
              ...styles.trackerLine,
              backgroundColor: i < currentIndex ? "#28a745" : "#e0e0e0"
            }}></div>
          )}
        </div>
      ))}
    </div>
  )
}

function Ordertracking() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const Email = sessionStorage.getItem("user")
    if (!Email) {
      setLoading(false)
      return
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/api/fetch/${Email}`)
      const result = response.data
      if (result.statuscode == 1) {
        setOrders(result.data.slice().reverse())
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div class="breadcrumb-section">
        <div class="container">
          <h2>Order tracking</h2>
          <nav class="theme-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Order tracking</li>
            </ol>
          </nav>
        </div>
      </div>

      <section class="tracking-page section-b-space">
        <div class="container">
          {loading ? (
            <p>Loading your orders...</p>
          ) : !sessionStorage.getItem("user") ? (
            <p>Please log in to see your orders.</p>
          ) : orders.length === 0 ? (
            <p>You haven't placed any orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div>
                    <h5 style={{ margin: 0 }}>Order #{order._id.slice(-6).toUpperCase()}</h5>
                    <small style={{ color: "#888" }}>Placed on {formatDate(order.createdAt)}</small>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <h6 style={{ margin: 0 }}>₹{orderTotal(order).toFixed(2)}</h6>
                    <button
                      class="btn btn-sm"
                      style={{ border: "1px solid #ddd", marginTop: "6px" }}
                      onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                    >
                      {expanded === order._id ? "Hide details" : "View details"}
                    </button>
                  </div>
                </div>

                <StatusTracker status={order.Status || "Processing"} />

                {(order.Courier || order.TrackingNumber || order.CurrentLocation || order.EstimatedDelivery) && order.Status !== "Cancelled" && (
                  <div style={styles.trackingInfo}>
                    {order.Courier && <span><strong>Courier:</strong> {order.Courier}</span>}
                    {order.TrackingNumber && <span><strong>Tracking No:</strong> {order.TrackingNumber}</span>}
                    {order.CurrentLocation && <span><strong>Current location:</strong> {order.CurrentLocation}</span>}
                    {order.EstimatedDelivery && <span><strong>Estimated delivery:</strong> {formatDate(order.EstimatedDelivery)}</span>}
                  </div>
                )}

                {expanded === order._id && (
                  <div style={{ marginTop: "20px" }}>
                    {order.TimelineHistory && order.TimelineHistory.length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <label>Tracking history:</label>
                        <ul style={{ paddingLeft: "18px" }}>
                          {order.TimelineHistory.slice().reverse().map((t, idx) => (
                            <li key={idx} style={{ fontSize: "13px", marginBottom: "4px" }}>
                              <strong>{t.Status}</strong>{t.Location ? ` - ${t.Location}` : ""}{t.Note ? ` (${t.Note})` : ""} <span style={{ color: "#888" }}>{formatDate(t.Date)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div class="table-responsive">
                      <table class="table tacking-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Full Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(order.Products || []).map((p, idx) => (
                            <tr key={idx}>
                              <td class="product-image">
                                <img
                                  src={`${API_BASE_URL}/uploads/${p.File}`}
                                  class="img-fluid"
                                  style={{ width: "60px" }}
                                  alt=""
                                />
                              </td>
                              <td><h6>{p.ProductName}</h6></td>
                              <td><h6>₹{p.ProductPrize}</h6></td>
                              <td><h6>{p.ProductQuantity}</h6></td>
                              <td><h6>₹{(Number(p.ProductPrize) * Number(p.ProductQuantity)).toFixed(2)}</h6></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div class="details-box" style={{ marginTop: "10px" }}>
                      <label>Shipping Address:</label>
                      <h4 style={{ fontSize: "15px" }}>{order.Address}, Pincode: {order.Pincode} <br /> Phone: {order.Mobile}</h4>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

const styles = {
  orderCard: {
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px"
  },
  tracker: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px"
  },
  trackerStep: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    position: "relative",
    flexDirection: "column"
  },
  trackerDot: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700
  },
  trackerLabel: {
    fontSize: "11px",
    marginTop: "6px",
    textAlign: "center"
  },
  trackerLine: {
    position: "absolute",
    top: "14px",
    left: "calc(50% + 18px)",
    right: "calc(-50% + 18px)",
    height: "2px",
    zIndex: -1
  },
  trackingInfo: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    marginTop: "16px",
    fontSize: "13px",
    color: "#555"
  }
}

export default Ordertracking
