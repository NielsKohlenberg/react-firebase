import React, { useRef, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'

export default function SignUp(){

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div>
      <div>
        <h3>Sign Up</h3>
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
          <div>
            <label>Password Confirm</label>
            <input type="password" ref={passwordConfirmRef} name="passwordConfirm" required />
          </div>
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div>
        <p>Already have an account? <Link to="/login">Log In</Link></p>
      </div>
    </div>

  )
}
