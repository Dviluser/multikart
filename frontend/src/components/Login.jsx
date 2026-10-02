import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import user_context from './Context'
import { API_BASE_URL } from '../config'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login() {
  const [Email, setemail] = useState("")
  const [Password, setpassword] = useState("")
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { Rolee, setRolee } = useContext(user_context)
  const navigate = useNavigate()

  const validate = () => {
    const errs = {}
    if (!Email.trim()) {
      errs.Email = "Email is required"
    } else if (!emailRegex.test(Email.trim())) {
      errs.Email = "Enter a valid email address"
    }
    if (!Password) {
      errs.Password = "Password is required"
    } else if (Password.length < 6) {
      errs.Password = "Password must be at least 6 characters"
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const data = { Email, Password }
      const response = await axios.post(`${API_BASE_URL}/api/student1`, data)
      const result = response.data
      if (result.statuscode == 1) {
        sessionStorage.setItem("user", result.data.Email)
        if (result.data.Role == "admin") {
          setRolee("admin")
        } else {
          setRolee("user")
        }
        alert(result.mssg)
        navigate("/")
      } else {
        alert(result.mssg)
      }
    } catch (err) {
      console.log(err)
      alert("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <section className="login-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3>Login Page</h3>
              <div className="theme-card">
                <form className="theme-form" onSubmit={submit} noValidate>
                  <div className="form-box">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="text"
                      className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                      id="email"
                      placeholder="Email"
                      value={Email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    {errors.Email && <div style={styles.error}>{errors.Email}</div>}
                  </div>
                  <div className="form-box">
                    <label htmlFor="review" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.Password ? "is-invalid" : ""}`}
                      id="review"
                      value={Password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    {errors.Password && <div style={styles.error}>{errors.Password}</div>}
                  </div>
                  <button className="btn btn-solid" type="submit" disabled={submitting}>
                    {submitting ? "Logging in..." : "Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const styles = {
  error: {
    color: "#dc3545",
    fontSize: "13px",
    marginTop: "4px"
  }
}

export default Login
