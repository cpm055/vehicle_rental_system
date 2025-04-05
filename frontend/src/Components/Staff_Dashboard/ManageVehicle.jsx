import '../../css/Admin-dashboard/admin-dashboard.css';
import '../../css/Admin-dashboard/manage-content.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaSearch } from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";

function ManageVehicle() {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(""); 

    // Fetch all vehicles
    useEffect(() => {
        async function fetchVehicles() {
            try {
                const response = await axios.get('http://localhost:5000/api/getVehicles');
                setVehicles(response.data.vehicles);
            } catch (err) {
                console.error("Error fetching vehicles:", err);
            }
        }
        fetchVehicles();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/vehicle/${id}`);
            if (response.data.success) {
                toast.success('Vehicle Deleted !')
                setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
                
            }
        } catch (err) {
            console.error("Error deleting vehicle:", err);
        }
    };

    const handleAddVehicle = () => {
        navigate('/s-dash/addVehicle');
    };

    const handleUpdateVehicle = (vehicleId) => {
        navigate(`/s-dash/updateVehicle/${vehicleId}`);
    };

    // Generate PDF Report
        const generatePDF = () => {
          const doc = new jsPDF();
          doc.text("Vehicle Management Report", 20, 10);
      
          const columns = ["Name", "Model", "Seats", "Mileage", "Price", "Category"];
          const rows = vehicles.map(vehicle => [vehicle.name, vehicle.model, vehicle.seats, vehicle.milage, vehicle.price, vehicle.category]);
      
    
          autoTable(doc, {
              startY: 20,
              head: [columns],
              body: rows,
          });
      
          doc.save("Vehicle_Report.pdf");
      };

      const filteredVehices = vehicles.filter((vehicle) =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return (
        <div className="admin-dash">
            <h1 className="admin-dash-heading">Manage Vehicles</h1>
            <div className="manage">
                
                <div className="manage-action">
                <button className="add" onClick={handleAddVehicle}>Add Vehicle</button>
                    <button className="generate-report" onClick={generatePDF}>Generate Report</button>
                    </div>
                <div className="table-container">
                     <div className='actions'>
                                <input
                                    type="text"
                                    placeholder="Search by Car Name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-bar"
                                />
                                <FaSearch />
                </div>
            <table className="manage-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Seats</th>
                        <th>Mileage</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVehices.length > 0 ? (
                        filteredVehices.map((vehicle) => (
                            <tr key={vehicle._id}>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.seats}</td>
                                <td>{vehicle.milage}</td>
                                <td>Rs: {vehicle.price}</td>
                                <td>{vehicle.category}</td>
                                <td>
                                    <img 
                                        src={vehicle.image} 
                                        alt={vehicle.name} 
                                        className="vehicle-image" 
                                    />
                                </td>
                                <td>
                                    <button className="update-btn" onClick={() => handleUpdateVehicle(vehicle._id)}>Update</button>
                                    <button className="delete-btn" onClick={() => handleDelete(vehicle._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="no-data">No vehicles found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ManageVehicle;
