





import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

function AdminNav() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            setIsLoggedIn(true); 
            
            const decodedToken = jwtDecode(token);
            setUserName(decodedToken.name); 
        } else {
            setIsLoggedIn(false); 
        }
    }, []);

    return (
        <>
            <nav className="a-nav">
            
            
                <ul>
                    <h2 className="logo">RentCar.</h2>
                <h1 className="nav-head">Hi! 😎 {userName}</h1>
                    <li><Link className='text-none' to="/a-dashboard">Dashboard</Link></li>
                    <li><Link className='text-none' to="manStaff">Manage Staff</Link></li>
                    <li><Link className='text-none' to="manUser">Manage Users</Link></li>
                    <li><Link className='text-none' to="manDelPerson">Manage Delivery Person</Link></li>
                </ul>

                <div className="nav-a">
                    
                    <button className='login-btn' onClick={logout} type="submit">Log Out</button>
                </div>
            </nav>
        </>
    );
}

export default AdminNav;