import React, { useEffect, useState} from 'react';
import '../../css/Admin-dashboard/manage-content.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
    const navigate = useNavigate();
    const { userId } = useParams();// Get user ID from URL To navigate back or to another page

  console.log("User ID:", userId);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // Fetch user data when component mounts
        async function fetchUserData() {
          try {
            const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
            if (response.data.success) {
              setFormData(response.data.users);  // Populate the form with the fetched data
            } else {
              console.log("User not found");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
        
        fetchUserData();
      }, [userId]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:5000/api/user/${userId}`, formData);
          if (response.data.success) {
            toast.success('User updated successfully!');
            setTimeout(() => {
                navigate("/a-dashboard/manUser");
            }, 1000);
          } else {
            toast.error('Failed to update user.');
          }
        } catch (error) {
          console.error("Error updating user data:", error);
          toast.error('An error occurred while updating the user.');
        }
      };
    
    


    return (
        <div className="add-user-container">
            <h2 className="add-user-heading">Update User</h2>
            <form className="add-user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="button-group">
                    <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" className="submit-btn">Update User</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateUser;
