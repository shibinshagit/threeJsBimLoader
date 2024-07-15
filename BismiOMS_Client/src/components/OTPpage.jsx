import React from 'react'

function OTPpage() {
  return (
    <div>
          <form id="signup-form" >
            <h2>Sign Up</h2>
            <div className="input-group">
                <input type="text" id="signup-name" required/>
                <label for="signup-name">Name</label>
            </div>
            <div className="input-group">
                <input type="email" id="signup-email" required/>
                <label for="signup-email">Email</label>
            </div>
            <div className="input-group">
                <input type="password" id="signup-password" required/>
                <label for="signup-password">Password</label>
            </div>
            <button type="submit">Sign Up</button>
            <p className="switch-form">Already have an account? <a href="#" id="show-login">Login</a></p>
        </form>
    </div>
  )
}

export default OTPpage
