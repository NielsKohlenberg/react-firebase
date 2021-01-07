import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../../contexts/AuthContext"

export default function Dashboard() {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')

    try {
      await logout();
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <div>
      <div>
        <h2>Profile</h2>
        {error && <p>{error}</p>}
        <p>Email: {currentUser.email}</p>
        <Link to="/profile">Update Profile</Link>
      </div>
      <div>
        <button type="button" onClick={handleLogout} >Log out</button>
      </div>
    </div>
  )
}
