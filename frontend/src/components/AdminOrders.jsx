import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config'

const STATUS_OPTIONS = ["Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"]

function formatDate(d) {
  if (!d) return "-"
  return new Date(d).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  })
}

function orderTotal(order) {
  return (order.Products || []).reduce(
    (acc, item) => acc + Number(item.ProductPrize || 0) * Number(item.ProductQuantity || 0),
    0
  )
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)
  const [form, setForm] = useState({
    Status: "",
    Courier: "",
    TrackingNumber: "",
    CurrentLocation: "",
    EstimatedDelivery: "",
    Note: ""
  })

  useEffect(() => {
    getdata()
  }, [])

  const getdata = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/allorders`)
      const result = response.data
      if (result.statuscode == 1) {
        setOrders(result.data)
      } else {
        alert("data not get sucessfully")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const openTracking = (order) => {
    setExpanded(order._id)
    setForm({
      Status: order.Status || "Processing",
      Courier: order.Courier || "",
      TrackingNumber: order.TrackingNumber || "",
      CurrentLocation: order.CurrentLocation || "",
      EstimatedDelivery: order.EstimatedDelivery ? order.EstimatedDelivery.slice(0, 10) : "",
      Note: ""
    })
  }

  const updateTracking = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/orderstatus/${id}`, form)
      const result = response.data
      if (result.statuscode == 1) {
        alert("tracking details updated")
        setExpanded(null)
        getdata()
      } else {
        alert(result.mssg || "update failed")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <section class="login-page section-b-space">
        <div class="container">
          <h3>Manage Orders &amp; Tracking</h3>

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} style={styles.orderCard}>
                <div style={styles.orderHeader}>
                  <div>
                    <h5 style={{ margin: 0 }}>Order #{order._id.slice(-6).toUpperCase()}</h5>
                    <small style={{ color: "#888" }}>Placed on {formatDate(order.createdAt)}</small>
                    <br />
                    <small>Email: {order.Email}</small>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <h6 style={{ margin: 0 }}>₹{orderTotal(order).toFixed(2)}</h6>
                    <span style={styles.badge}>{order.Status}</span>
                    <br />
                    <button
                      class="btn btn-sm btn-solid"
                      style={{ marginTop: "6px" }}
                      onClick={() => expanded === order._id ? setExpanded(null) : openTracking(order)}
                    >
                      {expanded === order._id ? "Close" : "Update tracking"}
                    </button>
                  </div>
                </div>

                {expanded === order._id && (
                  <div style={styles.formBox}>
                    <div class="row g-3">
                      <div class="col-md-4">
                        <label class="form-label">Status</label>
                        <select class="form-control" value={form.Status} onChange={(e) => setForm({ ...form, Status: e.target.value })}>
                          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label class="form-label">Courier</label>
                        <input type="text" class="form-control" value={form.Courier} onChange={(e) => setForm({ ...form, Courier: e.target.value })} placeholder="e.g. BlueDart" />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label">Tracking Number</label>
                        <input type="text" class="form-control" value={form.TrackingNumber} onChange={(e) => setForm({ ...form, TrackingNumber: e.target.value })} />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label">Current Location</label>
                        <input type="text" class="form-control" value={form.CurrentLocation} onChange={(e) => setForm({ ...form, CurrentLocation: e.target.value })} placeholder="e.g. Mumbai Hub" />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label">Estimated Delivery</label>
                        <input type="date" class="form-control" value={form.EstimatedDelivery} onChange={(e) => setForm({ ...form, EstimatedDelivery: e.target.value })} />
                      </div>
                      <div class="col-md-4">
                        <label class="form-label">Note (added to timeline)</label>
                        <input type="text" class="form-control" value={form.Note} onChange={(e) => setForm({ ...form, Note: e.target.value })} placeholder="e.g. Left the sorting facility" />
                      </div>
                    </div>

                    {order.TimelineHistory && order.TimelineHistory.length > 0 && (
                      <div style={{ marginTop: "16px" }}>
                        <label class="form-label">Tracking history</label>
                        <ul style={{ paddingLeft: "18px" }}>
                          {order.TimelineHistory.slice().reverse().map((t, i) => (
                            <li key={i} style={{ fontSize: "13px", marginBottom: "4px" }}>
                              <strong>{t.Status}</strong> {t.Location ? `- ${t.Location}` : ""} {t.Note ? `(${t.Note})` : ""} <span style={{ color: "#888" }}>{formatDate(t.Date)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div style={{ marginTop: "16px", textAlign: "right" }}>
                      <button class="btn btn-solid" onClick={() => updateTracking(order._id)}>Save tracking details</button>
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
    marginBottom: "20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "10px"
  },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "20px",
    background: "#f0f0f0",
    fontSize: "12px",
    fontWeight: 600
  },
  formBox: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #eee"
  }
}

export default AdminOrders
