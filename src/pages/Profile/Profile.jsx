// "use client"

// import { useState } from "react"
// import { useAuth } from "../../contexts/AuthContext.jsx"
// import { MdSave, MdLock, MdVisibility, MdVisibilityOff, MdPerson, MdEmail, MdPhone, MdLocationOn } from "react-icons/md"
// import "./Profile.css"

// const Profile = () => {
//   const { currentUser, updateProfile, changePassword } = useAuth()

//   // Profile form state
//   const [profileForm, setProfileForm] = useState({
//     name: currentUser?.name || "",
//     email: currentUser?.email || "",
//     phone: currentUser?.phone || "",
//     company: currentUser?.company || "",
//     position: currentUser?.position || "",
//     location: currentUser?.location || "",
//     bio: currentUser?.bio || "",
//   })

//   // Password form state
//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   })

//   const [showCurrentPassword, setShowCurrentPassword] = useState(false)
//   const [showNewPassword, setShowNewPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const [profileMessage, setProfileMessage] = useState({ type: "", text: "" })
//   const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" })
//   const [loading, setLoading] = useState(false)

//   // Handle profile form changes
//   const handleProfileChange = (e) => {
//     const { name, value } = e.target
//     setProfileForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   // Handle password form changes
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target
//     setPasswordForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   // Handle profile update
//   const handleProfileUpdate = async (e) => {
//     e.preventDefault()

//     try {
//       setLoading(true)
//       setProfileMessage({ type: "", text: "" })

//       const result = await updateProfile(profileForm)

//       if (result.success) {
//         setProfileMessage({ type: "success", text: "Profile updated successfully" })
//       } else {
//         setProfileMessage({ type: "error", text: result.error || "Failed to update profile" })
//       }
//     } catch (error) {
//       setProfileMessage({ type: "error", text: "Failed to update profile" })
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Handle password change
//   const handlePasswordChangeSubmit = async (e) => {
//     e.preventDefault()

//     if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//       setPasswordMessage({ type: "error", text: "Passwords do not match" })
//       return
//     }

//     if (passwordForm.newPassword.length < 6) {
//       setPasswordMessage({ type: "error", text: "Password must be at least 6 characters" })
//       return
//     }

//     try {
//       setLoading(true)
//       setPasswordMessage({ type: "", text: "" })

//       const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword)

//       if (result.success) {
//         setPasswordMessage({ type: "success", text: "Password changed successfully" })
//         setPasswordForm({
//           currentPassword: "",
//           newPassword: "",
//           confirmPassword: "",
//         })
//       } else {
//         setPasswordMessage({ type: "error", text: result.error || "Failed to change password" })
//       }
//     } catch (error) {
//       setPasswordMessage({ type: "error", text: "Failed to change password" })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="profile-page">
//       <div className="page-header">
//         <h1>My Profile</h1>
//       </div>

//       <div className="profile-container">
//         <div className="profile-sidebar">
//           <div className="profile-avatar-container">
//             {currentUser?.avatar ? (
//               <img src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} className="profile-avatar" />
//             ) : (
//               <div className="profile-avatar-placeholder">
//                 <MdPerson />
//               </div>
//             )}
//             <h3 className="profile-name">{currentUser?.name || "User"}</h3>
//             <p className="profile-email">{currentUser?.email || "user@example.com"}</p>
//           </div>

//           <div className="profile-info">
//             {currentUser?.position && (
//               <div className="profile-info-item">
//                 <MdPerson className="profile-info-icon" />
//                 <span>{currentUser.position}</span>
//               </div>
//             )}

//             {currentUser?.company && (
//               <div className="profile-info-item">
//                 <MdLocationOn className="profile-info-icon" />
//                 <span>{currentUser.company}</span>
//               </div>
//             )}

//             {currentUser?.phone && (
//               <div className="profile-info-item">
//                 <MdPhone className="profile-info-icon" />
//                 <span>{currentUser.phone}</span>
//               </div>
//             )}

//             {currentUser?.location && (
//               <div className="profile-info-item">
//                 <MdLocationOn className="profile-info-icon" />
//                 <span>{currentUser.location}</span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="profile-content">
//           <div className="profile-section">
//             <h2>Personal Information</h2>

//             {profileMessage.text && (
//               <div className={`profile-message ${profileMessage.type}`}>{profileMessage.text}</div>
//             )}

//             <form onSubmit={handleProfileUpdate}>
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="name">Full Name</label>
//                   <div className="input-with-icon">
//                     <MdPerson className="input-icon" />
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={profileForm.name}
//                       onChange={handleProfileChange}
//                       placeholder="Enter your full name"
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email Address</label>
//                   <div className="input-with-icon">
//                     <MdEmail className="input-icon" />
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={profileForm.email}
//                       onChange={handleProfileChange}
//                       placeholder="Enter your email"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="phone">Phone Number</label>
//                   <div className="input-with-icon">
//                     <MdPhone className="input-icon" />
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={profileForm.phone}
//                       onChange={handleProfileChange}
//                       placeholder="Enter your phone number"
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="location">Location</label>
//                   <div className="input-with-icon">
//                     <MdLocationOn className="input-icon" />
//                     <input
//                       type="text"
//                       id="location"
//                       name="location"
//                       value={profileForm.location}
//                       onChange={handleProfileChange}
//                       placeholder="Enter your location"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="company">Company</label>
//                   <input
//                     type="text"
//                     id="company"
//                     name="company"
//                     value={profileForm.company}
//                     onChange={handleProfileChange}
//                     placeholder="Enter your company name"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="position">Position</label>
//                   <input
//                     type="text"
//                     id="position"
//                     name="position"
//                     value={profileForm.position}
//                     onChange={handleProfileChange}
//                     placeholder="Enter your position"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="bio">Bio</label>
//                 <textarea
//                   id="bio"
//                   name="bio"
//                   value={profileForm.bio}
//                   onChange={handleProfileChange}
//                   placeholder="Tell us about yourself"
//                   rows={4}
//                 ></textarea>
//               </div>

//               <button type="submit" className="profile-save-btn" disabled={loading}>
//                 <MdSave /> Save Changes
//               </button>
//             </form>
//           </div>

//           <div className="profile-section">
//             <h2>Change Password</h2>

//             {passwordMessage.text && (
//               <div className={`profile-message ${passwordMessage.type}`}>{passwordMessage.text}</div>
//             )}

//             <form onSubmit={handlePasswordChangeSubmit}>
//               <div className="form-group">
//                 <label htmlFor="currentPassword">Current Password</label>
//                 <div className="input-with-icon">
//                   <MdLock className="input-icon" />
//                   <input
//                     type={showCurrentPassword ? "text" : "password"}
//                     id="currentPassword"
//                     name="currentPassword"
//                     value={passwordForm.currentPassword}
//                     onChange={handlePasswordChange}
//                     placeholder="Enter your current password"
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                   >
//                     {showCurrentPassword ? <MdVisibilityOff /> : <MdVisibility />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="newPassword">New Password</label>
//                   <div className="input-with-icon">
//                     <MdLock className="input-icon" />
//                     <input
//                       type={showNewPassword ? "text" : "password"}
//                       id="newPassword"
//                       name="newPassword"
//                       value={passwordForm.newPassword}
//                       onChange={handlePasswordChange}
//                       placeholder="Enter new password"
//                     />
//                     <button
//                       type="button"
//                       className="password-toggle"
//                       onClick={() => setShowNewPassword(!showNewPassword)}
//                     >
//                       {showNewPassword ? <MdVisibilityOff /> : <MdVisibility />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="confirmPassword">Confirm New Password</label>
//                   <div className="input-with-icon">
//                     <MdLock className="input-icon" />
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       value={passwordForm.confirmPassword}
//                       onChange={handlePasswordChange}
//                       placeholder="Confirm new password"
//                     />
//                     <button
//                       type="button"
//                       className="password-toggle"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <button type="submit" className="profile-save-btn" disabled={loading}>
//                 <MdLock /> Change Password
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Profile
"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext.jsx"
import { MdSave, MdEdit, MdLock } from "react-icons/md"
import "./Profile.css"

const Profile = () => {
  const { currentUser, updateProfile, updatePassword } = useAuth()

  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    company: currentUser?.company || "",
    phone: currentUser?.phone || "",
    position: currentUser?.position || "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()

    try {
      setError("")
      setSuccess("")
      setLoading(true)

      await updateProfile(profileData)
      setSuccess("Profile updated successfully")
      setEditMode(false)
    } catch (error) {
      setError("Failed to update profile")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setPasswordError("Passwords do not match")
    }

    try {
      setPasswordError("")
      setPasswordSuccess("")
      setLoading(true)

      await updatePassword(passwordData.newPassword)
      setPasswordSuccess("Password updated successfully")
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      setPasswordError("Failed to update password")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>My Profile</h1>
        {!editMode ? (
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            <MdEdit /> Edit Profile
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        )}
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Personal Information</h2>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleProfileSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={profileData.company}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                />
              </div>

              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={profileData.position}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                disabled={!editMode}
              />
            </div>

            {editMode && (
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <MdSave /> {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <h2>Change Password</h2>
          </div>

          {passwordError && <div className="alert alert-danger">{passwordError}</div>}
          {passwordSuccess && <div className="alert alert-success">{passwordSuccess}</div>}

          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <MdLock /> {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
