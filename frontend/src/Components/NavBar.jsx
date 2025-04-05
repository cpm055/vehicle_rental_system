


import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

import '../css/navbar.css';

function NavBar() {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    
    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    useEffect(() => {
        const token = localStorage.getItem('token'); // or sessionStorage
        if (token) {
            setIsLoggedIn(true); // User is logged in
            
            const decodedToken = jwtDecode(token);
            setUserName(decodedToken.name); // Assuming "full_name" is part of the JWT payload
        } else {
            setIsLoggedIn(false); // User is not logged in
        }
    }, []);

    function  handleSignIn() {
        navigate("/login");
    };
    function  handleSignUp() {
        navigate("/signup");
    };

    return (
        <>
            <nav className="nav-bar">
                <h2 className="logo">RentCar.</h2>
                <ul>
                    <li><Link className='text-none' to="/">Home</Link></li>
                    <li><Link className='text-none' to="/rent">Rent</Link></li>
                    <li><Link className='text-none' to="/smartTravel">Smart Travel</Link></li>
                    <li><Link className='text-none' to="/">How it Works</Link></li>
                </ul>
                <div>
                {isLoggedIn ? (
                    <>
                        <div className="nav-c">
                            <h1>Hi! {userName}</h1>
                            <button className='login-btn' onClick={logout} type="submit">Log Out</button>
                        </div>
                        
                    </>
                    ) : (
                        <>
                            <div className="nav-c">
                                <button className='login-btn' type="submit" onClick={handleSignIn}>Login</button>
                                <button className="signup-btn" type="submit" onClick={handleSignUp}>Sign Up</button>
                            </div>
                        </>
                )}
                </div>
            </nav>
        </>
    );
}

export default NavBar;