import '../../css/Admin-dashboard/admin-dashboard.css'
import '../../css/Admin-dashboard/manage-content.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useParams } from 'react';
import {toast, ToastContainer} from "react-toastify";

function ManageDelPerson() {
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
  // Fetch all users 
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/api/delPersons'); // Get users from the backend
        setUsers(response.data.delPerson);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []); // runs once on mount

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/delPerson/${id}`);
      if (response.data.success) {
        // Remove the deleted user from the users state to update the UI
        setUsers(users.filter(user => user._id !== id));
        toast.success("User Deleted !")
        
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  function handleAddUser() {
    navigate('/a-dashboard/addDelPerson')
  }

  const handleUpdateUser = (userId) => {
    navigate(`/a-dashboard/updateDelPerson/${userId}`);
  };

    return (
        <>
            <div className="admin-dash">
                <h1 className="admin-dash-heading">Manage Delivery Persons</h1>
                
                <div className="manage">
                    <button className="add" onClick={handleAddUser}>Add Delivery Persons</button>

                    <table className="manage-table">
                        <thead>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Address</td>
                            <td>Phone</td>
                            <td>Actions</td>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.full_name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <button className="update-btn" onClick={() => handleUpdateUser(user._id)}>Update</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
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

export default ManageDelPerson;