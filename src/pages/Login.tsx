import React, { Component } from 'react'
import AuthTemplate from '../components/common/AuthTemplate'

export class Login extends Component {
  render() {
    return (
      <div>
        <AuthTemplate type='login'/>
      </div>
    )
  }
}

export default Login
