// src/contexts/AuthContext.jsx
"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call
      const user = {
        id: "1",
        email,
        name: "Admin User",
        role: email === "admin@ratepro.com" ? "admin" : "company",
        company: "Rate Pro",
        permissions: {
          dashboard: true,
          surveys: true,
          analytics: true,
          content: email === "admin@ratepro.com",
          settings: true
        }
      }
      setCurrentUser(user)
      localStorage.setItem("currentUser", JSON.stringify(user))
      return user
    } catch (error) {
      throw error
    }
  }

  // Mock signup function
  const signup = async (email, password, name, company) => {
    try {
      setError("")
      // In a real app, this would be an API call
      const user = {
        id: "2",
        email: "company@email.com",
        name:"Apple",
        role: "company_admin",
        company:"APPLE Inc",
      }
      setCurrentUser(user)
      localStorage.setItem("currentUser", JSON.stringify(user))
      return user
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Mock logout function
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  // Mock password reset functions
  const resetPassword = async (email) => {
    try {
      setError("")
      // In a real app, this would send a reset email
      return true
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const updatePassword = async (password) => {
    try {
      setError("")
      // In a real app, this would update the password
      return true
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const updateProfile = async (data) => {
    try {
      setError("")
      // In a real app, this would update the user profile
      const updatedUser = { ...currentUser, ...data }
      setCurrentUser(updatedUser)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      return updatedUser
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
