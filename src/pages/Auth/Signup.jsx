// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext.jsx"
// import { MdPerson, MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md"
// import "./Auth.css"

// const Signup = () => {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)

//   const { signup } = useAuth()
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!name || !email || !password || !confirmPassword) {
//       setError("Please fill in all fields")
//       return
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match")
//       return
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters")
//       return
//     }

//     try {
//       setError("")
//       setLoading(true)
//       const result = await signup(name, email, password)

//       if (result.success) {
//         navigate("/")
//       } else {
//         setError(result.error || "Failed to create account")
//       }
//     } catch (error) {
//       setError("Failed to create account")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <h1 className="auth-logo">Rate Pro</h1>
//           <p className="auth-subtitle">Create your account</p>
//         </div>

//         {error && <div className="auth-error">{error}</div>}

//         <form className="auth-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Full Name</label>
//             <div className="input-with-icon">
//               <MdPerson className="input-icon" />
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <div className="input-with-icon">
//               <MdEmail className="input-icon" />
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div className="input-with-icon">
//               <MdLock className="input-icon" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Create a password"
//                 required
//               />
//               <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
//               </button>
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <div className="input-with-icon">
//               <MdLock className="input-icon" />
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 placeholder="Confirm your password"
//                 required
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" className="auth-button" disabled={loading}>
//             {loading ? "Creating Account..." : "Create Account"}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <p>
//             Already have an account?{" "}
//             <Link to="/login" className="auth-link">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup
"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext.jsx"
import "./Auth.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(formData.email, formData.password, formData.name, formData.company)
      navigate("/")
    } catch (error) {
      setError("Failed to create an account")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Rate Pro</h1>
          <p className="auth-subtitle">Create your account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
