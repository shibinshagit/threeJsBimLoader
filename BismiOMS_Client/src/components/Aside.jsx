import React from 'react'
import Logo from '../../assets/imgs/LOGO ONG-04.png'
function Aside() {
  return (
  <>
   {/* <!-- Sidebar --> */}
   <div className="sidebar" data-background-color="dark">
        <div className="sidebar-logo">
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
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-warning">
              <li className="nav-item active">
                <a
                  data-bs-toggle="collapse"
                  href="#dashboard"
                  className="collapsed"
                  aria-expanded="false"
                >
                  <i className="fas fa-home"></i>
                  <p>Dashboard</p>
                  <span className="caret"></span>
                </a>
              
              </li>
              
              <li className="nav-item">
                <a data-bs-toggle="collapse" href="#maps">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>Delivery</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="maps">
                  <ul className="nav nav-collapse">
                    <li>
                      <a href="maps/googlemaps.html">
                        <span className="sub-item">Google Maps</span>
                      </a>
                    </li>
                    <li>
                      <a href="maps/jsvectormap.html">
                        <span className="sub-item">Jsvectormap</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a data-bs-toggle="collapse" href="#charts">
                  <i className="far fa-chart-bar"></i>
                  <p>Invoice</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="charts">
                  <ul className="nav nav-collapse">
                    <li>
                      <a href="charts/charts.html">
                        <span className="sub-item">Chart Js</span>
                      </a>
                    </li>
                    <li>
                      <a href="charts/sparkline.html">
                        <span className="sub-item">Sparkline</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
             
            
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- End Sidebar --> */}
  </>
  )
}

export default Aside
