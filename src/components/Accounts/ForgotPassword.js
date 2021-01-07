import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'

export default function Login(){

  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your email')
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <div>
      <div>
        <h3>Password Reset</h3>
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} >
          <div>
            <label>Email</label>
            <input type="email" ref={emailRef} name="email" required />
          </div>
          <button disabled={loading} type="submit">
            Reset Password
          </button>
        </form>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>

  )
}
