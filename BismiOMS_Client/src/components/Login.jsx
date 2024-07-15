import React from 'react'
import Logo from '../../assets/imgs/LOGO ONG-04.png'
import './component.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./component.css"
import { BaseUrl } from '../constants/BaseUrl';
function Login() {
  const navigate = useNavigate();
 const handleSubmit = async (event) => {
  

    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
   

    try {
        const response = await axios.post(`${BaseUrl}/api/login`, { email, password });

        if (response.status === 200) {
          console.log('ok')
            const { token } = response.data;
            localStorage.setItem('token', token);
            
            toast.success('Login successful');
            navigate('/dash');
        } else {
            toast.error('Login failed');
            console.error('Error during login:', response);
        }
    } catch (error) {
        toast.error('An error occurred during login');
        console.error('Error during login:', error);
    }
};


    function navigateLogin(){
        navigate('/signup')
     }

  return (<>
   <ToastContainer />
<div className="d-flex align-items-center justify-content-center vh-100">
  <div className="card p-4 torn-paper" style={{ width: '100%', maxWidth: '400px', backgroundColor: "#ffb514" }}>
    <div className="card-body text-center">
      <img 
        src={Logo}
        alt="Logo" 
        className="mb-4" style={{ width: "100px", height: "100px" }}
      />
      <h5 className="card-title mb-4">Sign in</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input 
            type="email" 
            className="form-control" 
            id='email'
            placeholder="Email or phone" 
            required 
          />
        </div>
        <div className="form-group mb-4">
          <input 
            type="password" 
            className="form-control" 
            id='password'
            placeholder="Password" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-danger btn-block mb-3"
        >
          Next
        </button>
        {/* <div className="text-center">
          <a href="#" className="text-decoration-none">Forgot password?</a>
        </div> */}
      </form>
    </div>
  </div>
</div>






{/* american model of power station */}

   {/* <div className="d-flex align-items-center justify-content-center vh-100">
  <div className="card p-4 torn-paper" style={{ width: '100%', maxWidth: '400px',border:"none"}}>
    <div className="card-body text-center">
      <img 
        src={Logo}
        alt="Logo" 
        className="mb-4" style={{ width: "100px", height: "100px" }}
      />
      <h5 className="card-title mb-4">Sign in</h5>
      <form>
        <div className="form-group mb-3">
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email or phone" 
            required 
          />
        </div>
        <div className="form-group mb-4">
          <input 
            type="password" 
            className="form-control" 
            placeholder="Password" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary btn-block mb-3"
        >
          Next
        </button>
        
      </form>
    </div>
  </div>
</div>

<style jsx>{`
  .torn-paper {
    position: relative;
    padding: 20px;
    background-image: url('../../assets/imgs/bg12.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`}</style> */}

</>  
  )
}

export default Login
