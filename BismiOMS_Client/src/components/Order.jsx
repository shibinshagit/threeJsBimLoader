import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../constants/BaseUrl';

function Order() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    place: '',
    plan: [],
    paymentStatus: false,
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePlanChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const updatedPlan = checked
        ? [...prevFormData.plan, value]
        : prevFormData.plan.filter((plan) => plan !== value);
      return { ...prevFormData, plan: updatedPlan };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BaseUrl}/api/postorder`, formData)
      .then(response => {
        if (response.status === 200) {
          alert('User added successfully');
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert('Phone number already exists');
        } else {
          console.error('There was an error adding the user:', error);
          alert('Error adding user');
        }
      });
  };

  return (
    <div className="container">
      <div className="page-inner">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Add User</div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 col-lg-12">
                      <div className="form-group">
                        <div className="input-icon">
                          <span className="input-icon-addon">
                            <i className="fa fa-user"></i>
                          </span>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-icon">
                          <input
                            type="number"
                            name="phone"
                            className="form-control"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                          <span className="input-icon-addon">
                            <i className="fa fa-phone"></i>
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="text"
                            name="place"
                            className="form-control"
                            placeholder="Place"
                            value={formData.place}
                            onChange={handleChange}
                            required
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary btn-border dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Dropdown
                            </button>
                            <div className="dropdown-menu">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => setFormData({ ...formData, place: 'Brototype' })}
                              >
                                Brototype
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => setFormData({ ...formData, place: 'Vytila' })}
                              >
                                Vytila
                              </a>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() => setFormData({ ...formData, place: 'Infopark' })}
                              >
                                Infopark
                              </a>
                              <div role="separator" className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">Select on Map</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="paymentStatus"
                            checked={formData.paymentStatus}
                            onChange={handleChange}
                          />
                          <label className="form-check-label">Paid</label>
                        </div>
                      </div>
                      {formData.paymentStatus && (
                        <>
                          <div className="form-group">
                            <label>Plan</label>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="plan"
                                value="B"
                                onChange={handlePlanChange}
                              />
                              <label className="form-check-label">Breakfast</label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="plan"
                                value="L"
                                onChange={handlePlanChange}
                              />
                              <label className="form-check-label">Lunch</label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="plan"
                                value="D"
                                onChange={handlePlanChange}
                              />
                              <label className="form-check-label">Dinner</label>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Start Date</label>
                            <input
                              type="date"
                              name="startDate"
                              className="form-control"
                              value={formData.startDate}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>End Date</label>
                            <input
                              type="date"
                              name="endDate"
                              className="form-control"
                              value={formData.endDate}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <button type="submit" className="btn btn-success">Submit</button>
                  <button type="button" className="btn btn-danger mx-3" onClick={() => setFormData({
                    name: '',
                    phone: '',
                    place: '',
                    plan: [],
                    paymentStatus: false,
                    startDate: '',
                    endDate: ''
                  })}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
