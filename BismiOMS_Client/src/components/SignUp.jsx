import React from 'react';
import axios from 'axios';
import Logo from '../../assets/imgs/LOGO ONG-04.png';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  function navigateLogin() {
    navigate('/login');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', {
        name,
        email,
        password
      });
      
      if (response.status === 200) {
        navigate('/otp');
      } else {
        console.error('Error during signup:', response);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <img src={Logo} alt="Eduzell Logo" className="img-fluid" style={{ width: '150px' }} />
        </div>
        <form id="signup-form" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="signup-name" placeholder="Name" required />
            <label htmlFor="signup-name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="signup-email" placeholder="Email" required />
            <label htmlFor="signup-email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="signup-password" placeholder="Password" required />
            <label htmlFor="signup-password">Password</label>
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
          <p className="text-center">Already have an account? <a href="#login" onClick={navigateLogin}>Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
