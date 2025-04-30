import React, { useEffect, useState } from 'react';
import '../../css/Admin-dashboard/manage-content.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateDelivery() {
    const navigate = useNavigate();
    const { delId } = useParams(); 

    const [formData, setFormData] = useState({
        name: '',
        model: '',
        owner_email: '',
        owner_name: '',
        address: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        async function fetchDelData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/delivery/${delId}`);
                if (response.data.success) {
                    setFormData(response.data.delivery); // Populate the form
                } else {
                    console.log("Delivery not found");
                }
            } catch (error) {
                console.error("Error fetching delivery data:", error);
            }
        }

        fetchDelData();
    }, [delId]);

    const categories = ["SUV", "Sedan", "Electric"];

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.put(`http://localhost:5000/api/delivery/${delId}`, formData);
          if (response.data.success) {
              toast.success('Delivery updated successfully!');
              setTimeout(() => {
                  navigate("/delMan-dash/manDeliveries");
              }, 1000);
          } else {
              toast.error('Failed to update Delivery.');
          }
      } catch (error) {
          console.error("Error updating Delivery data:", error);
          toast.error('An error occurred while updating the Delivery.');
      }
  };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="add-user-container">
            <h2 className="add-user-heading">Update Delivery</h2>
            <form className="add-user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Car Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Model</label>
                    <input type="text" name="model" value={formData.model} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Owner Email</label>
                    <input type="email" name="owner_email" value={formData.owner_email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Owner Name</label>
                    <input type="text" name="owner_name" value={formData.owner_name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select a category</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                </div>
                <div className="button-group">
                    <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" className="submit-btn">Update</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateDelivery;
