import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../constants/BaseUrl';

function Stat() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    breakfastOrders: 0,
    lunchOrders: 0,
    dinnerOrders: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics(date);
  }, [date]);

  const fetchStatistics = async (selectedDate) => {
    try {
        const response = await axios.get(`${BaseUrl}/api/statistics?date=${selectedDate}`);
        if (response.status === 200) {
        setStatistics(response.data);
      } else {
        setError('Failed to fetch statistics');
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
      setError('Error fetching statistics. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const handleAddUser = () => {
    navigate('/order'); 
};

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
        <div>
          <h3 className="fw-bold mb-3">BismiMess</h3>
        </div>
        <div className="ms-md-auto px-2 py-md-0 d-flex">
          <input
            type="date"
            className="form-control mx-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {/* <button onClick={() => fetchStatistics(date)} className="btn btn-info btn-round">
            Fetch Data
          </button> */}
          <button onClick={handleAddUser} className="btn btn-danger btn-round">New+</button>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-primary bubble-shadow-small">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p className="card-category">Total Orders</p>
                    <h4 className="card-title">{statistics.totalOrders}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-info bubble-shadow-small">
                    <i className="fas fa-utensils"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p className="card-category">Breakfast</p>
                    <h4 className="card-title">{statistics.breakfastOrders}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-success bubble-shadow-small">
                    <i className="fas fa-utensil-spoon"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p className="card-category">Lunch</p>
                    <h4 className="card-title">{statistics.lunchOrders}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card card-stats card-round">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-icon">
                  <div className="icon-big text-center icon-secondary bubble-shadow-small">
                    <i className="fas fa-utensils"></i>
                  </div>
                </div>
                <div className="col col-stats ms-3 ms-sm-0">
                  <div className="numbers">
                    <p className="card-category">Dinner</p>
                    <h4 className="card-title">{statistics.dinnerOrders}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stat;
