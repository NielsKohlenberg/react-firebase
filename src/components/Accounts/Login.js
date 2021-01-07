import React, { useRef, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'

export default function Login(){

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to sign in")
    }

    setLoading(false)
  }

  return (
    <div>
      <div>
        <h3>Log In</h3>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} >
          <div>
            <label>Email</label>
            <input type="email" ref={emailRef} name="email" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" ref={passwordRef} name="password" required />
          </div>
          <button disabled={loading} type="submit">
            Log In
          </button>
        </form>
        <div>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>

  )
}
