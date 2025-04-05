import '../../css/Admin-dashboard/admin-dashboard.css';
import '../../css/Admin-dashboard/manage-content.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaSearch } from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";

function ManageUser() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(""); 

    // Fetch all users 
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:5000/api/users'); // Get users from the backend
                setUsers(response.data.users);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        }

        fetchUsers();
    }, []); // runs once on mount

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
            if (response.data.success) {
                setUsers(users.filter(user => user._id !== id));
                toast.success('User Deleted !');
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    function handleAddUser() {
        navigate('/a-dashboard/addUser');
    }

    const handleUpdateUser = (userId) => {
        navigate(`/a-dashboard/updateUser/${userId}`);
    };

    // Generate PDF Report
    const generatePDF = () => {
      const doc = new jsPDF();
      doc.text("User Management Report", 20, 10);
  
      const columns = ["Name", "Email", "Address", "Phone"];
      const rows = users.map(user => [user.full_name, user.email, user.address, user.phone]);
  

      autoTable(doc, {
          startY: 20,
          head: [columns],
          body: rows,
      });
  
      doc.save("User_Report.pdf");
  };

  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

    return (
        <>
            <div className="admin-dash">
                <h1 className="admin-dash-heading">Manage User</h1>
                
                <div className="manage">
                    <div className="manage-action">
                    <button className="add" onClick={handleAddUser}>Add User</button>
                    <button className="generate-report" onClick={generatePDF}>Generate Report</button>
                    </div>
                    <div className='actions'>
                <input
                    type="text"
                    placeholder="Search by User Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                    />
              <FaSearch />
        </div>
                    <div className="table-container">
                    <table className="manage-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user) => (
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
                    
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default ManageUser;
