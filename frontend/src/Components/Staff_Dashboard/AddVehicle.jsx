import React, { useState } from 'react';
import '../../css/Admin-dashboard/manage-content.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function AddVehicle() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        model: '',
        seats: '',
        milage: '',
        price: '',
        category: '',
        image: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/addVehicle", formData);
            console.log(response);
            if (response.data.success) {
                toast.success("Vehicle added successfully!");
                setTimeout(() => {
                    navigate("/s-dash/manVehicle");
                }, 1000);
            } else {
                toast.error(response.data.message || "Error in vehicle creation");
            }
        } catch (error) {
            console.error(error);
            toast.error("Vehicle creation failed! Please try again.");
        }
    };

    return (
        <div className="add-user-container">
            <h2 className="add-user-heading">Add New Vehicle</h2>
            <form className="add-user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Model</label>
                    <input type="text" name="model" value={formData.model} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Seats</label>
                    <input type="number" name="seats" value={formData.seats} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mileage (km/l)</label>
                    <input type="number" name="milage" value={formData.milage} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Price ($)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                <label className="form-label">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="form-select" required>
                        <option value="">Select Category</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Truck">Truck</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Convertible">Convertible</option>
                    </select>

                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                </div>
                <div className="button-group">
                    <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" className="submit-btn">Add Vehicle</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default AddVehicle;
