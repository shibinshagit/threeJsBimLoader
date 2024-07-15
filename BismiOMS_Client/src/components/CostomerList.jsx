import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { BaseUrl } from '../constants/BaseUrl';

function UserList() {
    const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All'); // Default filter

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/users`);
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setError('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users. Please try again later.');
    } finally {
      setLoading(false); // Set loading state to false once data fetching is complete
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateorder/${id}`);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Filtering logic based on selected filter
  const filteredUsers = users.filter(user => {
    if (filter === 'All') {
      return true; // Show all users if filter is 'All'
    } else {
      return user.orders.length > 0 && user.orders[user.orders.length - 1].status.toLowerCase() === filter.toLowerCase();
    }
  }).filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Display error message if there's an error fetching data
  }

  return (
    <div className="container">
      <div className="page-inner">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-round">
              <div className="card-header">
                <div className="card-head-row card-tools-still-right">
                  <div className="card-title"></div>
                  <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-lg-flex">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button type="submit" className="btn btn-search pe-1">
                          <i className="fa fa-search search-icon"></i>
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Search ..."
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                  </nav>
                  <div className="card-tools">
                    <div className="dropdown">
                      <button
                        className="btn btn-icon btn-clean me-0"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a
                          className={`dropdown-item ${filter === 'All' ? 'active' : ''}`}
                          href="#"
                          onClick={() => handleFilterChange('All')}
                        >
                          All
                        </a>
                        <a
                          className={`dropdown-item ${filter === 'Active' ? 'active' : ''}`}
                          href="#"
                          onClick={() => handleFilterChange('Active')}
                        >
                          Active
                        </a>
                        <a
                          className={`dropdown-item ${filter === 'Leave' ? 'active' : ''}`}
                          href="#"
                          onClick={() => handleFilterChange('Leave')}
                        >
                          Leave
                        </a>
                        <a
                          className={`dropdown-item ${filter === 'Renew' ? 'active' : ''}`}
                          href="#"
                          onClick={() => handleFilterChange('Renew')}
                        >
                          Renew
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table align-items-center mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col" className="text-end">Phone</th>
                        <th scope="col" className="text-end">Station</th>
                        <th scope="col" className="text-end">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center">No users found.</td>
                        </tr>
                      ) : (
                        filteredUsers.map(user => (
                          <tr key={user._id} onClick={() => {handleUpdate(user._id)}}>
                            <td>
                            <button className="btn btn-icon btn-round btn-success btn-sm me-2">
  {user.orders.length > 0 && user.orders[user.orders.length - 1].plan  ? user.orders[user.orders.length - 1].plan.length : 0}
</button>

                              {user.name}{user.orders.length > 0 && user.orders[user.orders.length - 1].plan ? `(${user.orders[user.orders.length - 1].plan.join(', ')})` : ''}
                            </td>
                            <td className="text-end">{user.phone}</td>
                            <td className="text-end">{user.place}</td>
                            <td className="text-end">
                              <span className={`badge 
                                badge-${
                                  user.orders.length > 0 ? (
                                    user.orders[user.orders.length - 1].status === 'renew' ? 'dark' :
                                    user.orders[user.orders.length - 1].status === 'leave' ? 'warning' :
                                    (new Date(user.orders[user.orders.length - 1].orderEnd).getTime() - new Date().getTime()) <= (3 * 24 * 60 * 60 * 1000) ? 'danger' :
                                    'success'
                                  ) : 'secondary' // Fallback class if no orders
                                }`}
                              >
                                {user.orders.length > 0 ? user.orders[user.orders.length - 1].status : 'No orders'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
