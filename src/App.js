import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import PrivateRoute from './contexts/PrivateRoute'

import SignUp from './components/Accounts/SignUp'
import Login from './components/Accounts/Login'
import ForgotPassword from './components/Accounts/ForgotPassword'
import UpdateProfile from './components/Accounts/UpdateProfile'

import Dashboard from './components/Dashboard/Dashboard'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />

          <PrivateRoute path="/profile" component={UpdateProfile} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />

        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
