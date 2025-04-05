import React, { useEffect, useState } from 'react';
import '../../css/Admin-dashboard/manage-content.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateVehicle() {
    const navigate = useNavigate();
    const { vehicleId } = useParams(); // Get vehicle ID from URL

    const [formData, setFormData] = useState({
        name: '',
        model: '',
        seats: '',
        milage: '',
        price: '',
        category: '',
        image: ''
    });

    // Predefined vehicle categories
    const categories = ["SUV", "Sedan", "Hatchback", "Truck", "Van", "Convertible"];

    useEffect(() => {
        async function fetchVehicleData() {
            try {
                const response = await axios.get(`http://localhost:5000/api/vehicle/${vehicleId}`);
                if (response.data.success) {
                    setFormData(response.data.vehicle); // Populate form with fetched data
                } else {
                    console.log("Vehicle not found");
                }
            } catch (error) {
                console.error("Error fetching vehicle data:", error);
            }
        }

        fetchVehicleData();
    }, [vehicleId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/vehicle/${vehicleId}`, formData);
            if (response.data.success) {
                toast.success('Vehicle updated successfully!');
                setTimeout(() => {
                    navigate("/s-dash/manVehicle");
                }, 1000);
            } else {
                toast.error('Failed to update vehicle.');
            }
        } catch (error) {
            console.error("Error updating vehicle data:", error);
            toast.error('An error occurred while updating the vehicle.');
        }
    };

    return (
        <div className="add-user-container">
            <h2 className="add-user-heading">Update Vehicle</h2>
            <form className="add-user-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Vehicle Name</label>
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
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="" disabled>Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} required />
                </div>
                <div className="button-group">
                    <button type="button" className="back-btn" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" className="submit-btn">Update Vehicle</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default UpdateVehicle;
