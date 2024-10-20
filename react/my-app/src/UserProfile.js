import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user data');
        toast.error('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      {user ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text"><strong>Email:</strong> {user.email}</p>
            <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
            <p className="card-text"><strong>Address:</strong> {user.address}</p>
            {/* Add more user information as needed */}
          </div>
        </div>
      ) : (
        <div>No user data available.</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
