// "use client"

// import { useState } from "react"
// import { Link } from "react-router-dom"
// import { useAuth } from "../../contexts/AuthContext.jsx"
// import { MdEmail, MdArrowBack } from "react-icons/md"
// import "./Auth.css"

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("")
//   const [error, setError] = useState("")
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)

//   const { requestPasswordReset } = useAuth()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!email) {
//       setError("Please enter your email address")
//       return
//     }

//     try {
//       setError("")
//       setMessage("")
//       setLoading(true)
//       const result = await requestPasswordReset(email)

//       if (result.success) {
//         setMessage("Password reset instructions have been sent to your email")
//       } else {
//         setError(result.error || "Failed to send reset email")
//       }
//     } catch (error) {
//       setError("Failed to send reset email")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <h1 className="auth-logo">Rate Pro</h1>
//           <p className="auth-subtitle">Reset your password</p>
//         </div>

//         {error && <div className="auth-error">{error}</div>}
//         {message && <div className="auth-success">{message}</div>}

//         <form className="auth-form" onSubmit={handleSubmit}>
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

//           <button type="submit" className="auth-button" disabled={loading}>
//             {loading ? "Sending..." : "Send Reset Instructions"}
//           </button>
//         </form>

//         <div className="auth-footer">
//           <Link to="/login" className="back-to-login">
//             <MdArrowBack /> Back to Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ForgotPassword
"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext.jsx"
import "./Auth.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(email)
      setMessage("Check your email for further instructions")
    } catch (error) {
      setError("Failed to reset password")
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
          <p className="auth-subtitle">Reset your password</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
