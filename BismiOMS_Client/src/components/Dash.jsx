import React from 'react'
import Logo from '../../assets/imgs/LOGO ONG-04.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import CostomerList from './CostomerList';
import Stat from './Stat';
import Nav from './Nav';
import Aside from './Aside';

function Dash() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout successful');
    navigate('/login'); 
};




  
  return (
   <>
     <div className="wrapper">
     <Aside/>

      <div className="main-panel">
        <div className="main-header">
          <div className="main-header-logo">
            {/* <!-- Logo Header --> */}
            <div className="logo-header" data-background-color="dark">
              <a href="index.html" className="logo">
                <img
                  src={Logo}
                  alt="navbar brand"
                  className="navbar-brand"
                  height="50"
                />
              </a>
              <div className="nav-toggle">
                <button className="btn btn-toggle toggle-sidebar">
                  <i className="gg-menu-right"></i>
                </button>
                <button className="btn btn-toggle sidenav-toggler">
                  <i className="gg-menu-left"></i>
                </button>
              </div>
              <button className="topbar-toggler more">
                <i className="gg-more-vertical-alt"></i>
              </button>
            </div>
            {/* <!-- End Logo Header --> */}
          </div>
         <Nav/>

        </div>

        <div className="container">
          <div className="page-inner">
           
            <Stat/>
            
            <CostomerList/>
          </div>
        </div>

        <footer className="footer">
          <div className="container-fluid d-flex justify-content-between">
          
            <div>
              Developed by
              <a target="_blank" href="https://shibinsha.cloud/">BirdTech Digitals</a>.
            </div>
          </div>
        </footer>
      </div>


    </div>
   </>
  )
}

export default Dash
