import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const nameRegex = /^[A-Za-z\s]{2,}$/
// at least 8 chars, one letter and one number
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

function Register() {
  const [Firstname, setfirstname] = useState("")
  const [Lastname, setlastname] = useState("")
  const [Email, setemail] = useState("")
  const [Password, setpassword] = useState("")
  const [ConfirmPassword, setconfirmpassword] = useState("")
  const [Role] = useState("user")
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const validate = () => {
    const errs = {}
    if (!Firstname.trim()) errs.Firstname = "First name is required"
    else if (!nameRegex.test(Firstname.trim())) errs.Firstname = "Only letters, min 2 characters"

    if (!Lastname.trim()) errs.Lastname = "Last name is required"
    else if (!nameRegex.test(Lastname.trim())) errs.Lastname = "Only letters, min 2 characters"

    if (!Email.trim()) errs.Email = "Email is required"
    else if (!emailRegex.test(Email.trim())) errs.Email = "Enter a valid email address"

    if (!Password) errs.Password = "Password is required"
    else if (!passwordRegex.test(Password)) errs.Password = "Min 8 characters, with a letter and a number"

    if (!ConfirmPassword) errs.ConfirmPassword = "Please confirm your password"
    else if (ConfirmPassword !== Password) errs.ConfirmPassword = "Passwords do not match"

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const show = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const data = { Firstname, Lastname, Email, Password, Role }
      const response = await axios.post(`${API_BASE_URL}/api/register`, data)
      const result = response.data
      if (result.statuscode == 1) {
        alert("Account created successfully")
        navigate("/login")
      } else {
        alert("Could not create account. Please try again.")
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
          <h3>create account</h3>
          <div className="theme-card">
            <form className="theme-form" onSubmit={show} noValidate>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-box">
                    <label htmlFor="fname" className="form-label">First Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.Firstname ? "is-invalid" : ""}`}
                      id="fname"
                      placeholder="First Name"
                      value={Firstname}
                      onChange={(e) => setfirstname(e.target.value)}
                    />
                    {errors.Firstname && <div style={styles.error}>{errors.Firstname}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <label htmlFor="lname" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.Lastname ? "is-invalid" : ""}`}
                      id="lname"
                      placeholder="Last Name"
                      value={Lastname}
                      onChange={(e) => setlastname(e.target.value)}
                    />
                    {errors.Lastname && <div style={styles.error}>{errors.Lastname}</div>}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-box">
                    <label htmlFor="email" className="form-label">email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                      id="email"
                      placeholder="Email"
                      value={Email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    {errors.Email && <div style={styles.error}>{errors.Email}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <label htmlFor="review" className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.Password ? "is-invalid" : ""}`}
                      id="review"
                      placeholder="Enter your password"
                      value={Password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    {errors.Password && <div style={styles.error}>{errors.Password}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-box">
                    <label htmlFor="confirm" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.ConfirmPassword ? "is-invalid" : ""}`}
                      id="confirm"
                      placeholder="Re-enter your password"
                      value={ConfirmPassword}
                      onChange={(e) => setconfirmpassword(e.target.value)}
                    />
                    {errors.ConfirmPassword && <div style={styles.error}>{errors.ConfirmPassword}</div>}
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-solid w-auto" type="submit" disabled={submitting}>
                    {submitting ? "Creating..." : "create Account"}
                  </button>
                </div>
              </div>
            </form>
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

export default Register
