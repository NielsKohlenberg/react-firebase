import React, { useRef, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext'

export default function UpdateProfile(){

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      history.push('/')
    }).catch(() => {
      setError('Failed to update Account')
    }).finally(() => {
      setLoading(false)
    })

  }

  return (
    <div>
      <div>
        <h3>Profile</h3>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} >
          <div>
            <label>Email</label>
            <input type="email" ref={emailRef} name="email" required defaultValue={currentUser.email} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" ref={passwordRef} name="password" required placeholder="Leave blank to keep current password"/>
          </div>
          <div>
            <label>Password Confirm</label>
            <input type="password" ref={passwordConfirmRef} name="passwordConfirm" required placeholder="Leave blank to keep current password"/>
          </div>
          <button disabled={loading} type="submit">
            Update
          </button>
        </form>
      </div>
      <div>
        <p><Link to="/">Cancel</Link></p>
      </div>
    </div>

  )
}
