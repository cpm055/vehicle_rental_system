import '../../css/Admin-dashboard/admin-dashboard.css'
import '../../css/Admin-dashboard/manage-content.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useParams } from 'react';

function MarkProgress() {

    const [deliveries, setdeliveries] = useState([]);

    const navigate = useNavigate();
    // Fetch all deliveries 
     useEffect(() => {
    async function fetchdeliveries() {
      try {
        const response = await axios.get('http://localhost:5000/api/assignDels'); // Get deliveries from the backend
        const token = localStorage.getItem('token');
        if (token) {
         
          const decodedToken = jwtDecode(token);
          const loggedInEmail = decodedToken.email; 
          console.log(loggedInEmail)
         
          const response = await axios.get('http://localhost:5000/api/assignDels'); 
          
          const filteredDeliveries = response.data.delivery.filter(delivery => delivery.delPersonEmail === loggedInEmail);
          
          setdeliveries(filteredDeliveries);
      }
      } catch (err) {
        console.error("Error fetching deliveries:", err);
      }
    }

    fetchdeliveries();
    }, []); // runs once on mount

    const handleUpdateDelivery = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/assignDels/${id}`, { delStatus: 'Complete' });
            if (response.data.success) {
                setdeliveries(deliveries.map(delivery => 
                    delivery._id === id ? { ...delivery, delStatus: 'Complete' } : delivery
                ));
            }
        } catch (err) {
            console.error("Error updating delivery status:", err);
        }
    };


    return (
        <>
            <div className="admin-dash">
                <h1 className="admin-dash-heading">Assigned Delivery</h1>
                
                <div className="manage">
                  
                    <table className="manage-table">
                        <thead>
                            <td>Car Name</td>
                            <td>Image</td>
                            <td>Name</td>
                            <td>Address</td>
                            <td></td>
                        </thead>
                        
                            <tbody>
                        {deliveries.map((delivery) => (
                            <tr key={delivery._id}>
                                <td>{delivery.name}</td>
                                <td><img src={delivery.image} width={100} /></td>
                                <td>{delivery.owner_name}</td>
                                <td>{delivery.address}</td>
                                <td>{delivery.phone}</td>
                                <td>
                                        <button 
                                            className="update-btn" 
                                            onClick={() => handleUpdateDelivery(delivery._id)} 
                                            disabled={delivery.delStatus === 'Complete'}>
                                            {delivery.delStatus === 'Complete' ? 'Completed' : 'Complete'}
                                        </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        
                    </table>
                </div>

            </div>
        </>
    );
}

export default MarkProgress;