import '../../css/Admin-dashboard/admin-dashboard.css'
import '../../css/Admin-dashboard/manage-content.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useParams } from 'react';
import { FaSearch } from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";

function TrackDels() {

    const [deliveries, setdeliveries] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    const navigate = useNavigate();
    // Fetch all deliveries 
     useEffect(() => {
    async function fetchdeliveries() {
      try {
        const response = await axios.get('http://localhost:5000/api/assignDels'); // Get deliveries from the backend
        setdeliveries(response.data.delivery);
      } catch (err) {
        console.error("Error fetching deliveries:", err);
      }
    }

    fetchdeliveries();
    }, []); // runs once on mount

    const handleDelete = async (id) => {
            try {
              const response = await axios.delete(`http://localhost:5000/api/assignDels/${id}`);
              if (response.data.success) {
                setdeliveries(deliveries.filter(delivery => delivery._id !== id));
                toast.success("Delivery Deleted !")
              }
            } catch (err) {
              console.error("Error deleting delivery:", err);
            }
    };

    const filteredDeliveries = deliveries.filter((delivery) =>
      delivery.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <>
            <div className="admin-dash">
                <h1 className="admin-dash-heading">Track Delivery</h1>
                
                <div className="manage">
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
                            <td>Car Name</td>
                            <td>Image</td>
                            <td>Name</td>
                            <td>Address</td>
                            <td>Status</td>
                            <td>Actions</td>
                        </thead>
                        
                        <tbody>
    {filteredDeliveries.map((delivery) => (
        <tr key={delivery._id}>
            <td>{delivery.name}</td>
            <td><img src={delivery.image} width={100} alt="delivery" /></td>
            <td>{delivery.owner_name}</td>
            <td>{delivery.address}</td>
            <td>{delivery.delStatus}</td>
            <td>
  
                <button
                    className="delete-btn"
                    onClick={() => handleDelete(delivery._id)}
                    disabled={delivery.delStatus !== 'Complete'}
                >
                    Delete
                </button>
            </td>
        </tr>
    ))}
</tbody>

                        
                    </table>
                </div>
              <ToastContainer />
            </div>
        </>
    );
}

export default TrackDels;