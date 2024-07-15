import React from 'react'
import Logo from '../../assets/imgs/LOGO ONG-04.png'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Nav() {

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      toast.success('Logout successful');
      navigate('/login'); 
  };
  
  return (
    <>
     {/* <!-- Navbar Header --> */}



     <nav
            className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom"
          >
            <div className="container-fluid">
            
              <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
              
              
                
                <li className="nav-item topbar-icon dropdown hidden-caret">
                  <a
                    className="nav-link"
                    data-bs-toggle="dropdown"
                    href="#"
                    aria-expanded="false"
                  >
                    <i className="fas fa-layer-group"></i>
                  </a>
                  <div className="dropdown-menu quick-actions animated fadeIn">
                    <div className="quick-actions-header">
                      <span className="title mb-1">Quick Actions</span>
                      <span className="subtitle op-7">Shortcuts</span>
                    </div>
                    <div className="quick-actions-scroll scrollbar-outer">
                      <div className="quick-actions-items">
                        <div className="row m-0">
                          <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                              <div className="avatar-item bg-danger rounded-circle">
                                <i className="far fa-calendar-alt"></i>
                              </div>
                              <span className="text">Calendar</span>
                            </div>
                          </a>
                          <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                              <div
                                className="avatar-item bg-warning rounded-circle"
                              >
                                <i className="fas fa-map"></i>
                              </div>
                              <span className="text">Maps</span>
                            </div>
                          </a>
                          <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                              <div className="avatar-item bg-info rounded-circle">
                                <i className="fas fa-file-excel"></i>
                              </div>
                              <span className="text">Reports</span>
                            </div>
                          </a>
                          <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                              <div
                                className="avatar-item bg-success rounded-circle"
                              >
                                <i className="fas fa-envelope"></i>
                              </div>
                              <span className="text">Emails</span>
                            </div>
                          </a>
                          <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                              <div
                                className="avatar-item bg-primary rounded-circle"
                              >
                                <i className="fas fa-file-invoice-dollar"></i>
                              </div>
                              <span className="text">Invoice</span>
                            </div>
                          </a>
                          <a className="col-6 col-md-4 p-0" href="#">
                            <div className="quick-actions-item">
                              <div
                                className="avatar-item bg-secondary rounded-circle"
                              >
                                <i className="fas fa-credit-card"></i>
                              </div>
                              <span className="text">Payments</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>


                <li className="nav-item topbar-user dropdown hidden-caret">
                  <a
                    className="dropdown-toggle profile-pic"
                    data-bs-toggle="dropdown"
                    href="#"
                    aria-expanded="false"
                  >
                    <div className="avatar-sm">
                      <img
                        src={Logo}
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <span className="profile-username">
                      <span className="op-7"></span>
                      <span className="fw-bold"></span>
                    </span>
                  </a>
                  <ul className="dropdown-menu dropdown-user animated fadeIn">
                    <div className="dropdown-user-scroll scrollbar-outer">
                      {/* <li>
                        <div className="user-box">
                          <div className="avatar-lg">
                            <img
                              src=""
                              alt="image profile"
                              className="avatar-img rounded"
                            />
                          </div>
                          <div className="u-text">
                            <h4>Hizrian</h4>
                            <p className="text-muted">hello@example.com</p>
                            <a
                              href="profile.html"
                              className="btn btn-xs btn-secondary btn-sm"
                              >View Profile</a
                            >
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">My Profile</a>
                        <a className="dropdown-item" href="#">My Balance</a>
                        <a className="dropdown-item" href="#">Inbox</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Account Setting</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={handleLogout}>Logout</a>
                      </li> */}
                       <a className="dropdown-item" onClick={handleLogout}>Logout</a>  
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          {/* <!-- End Navbar --> */}
    </>
  )
}

export default Nav
