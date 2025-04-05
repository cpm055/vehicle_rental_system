



import '../../css/User_Management/login.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


function SignUp() {

    const [formData, setFormData] = useState({
        email: "",
        full_name: "",
        address: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/sign-up", formData);
            console.log(response);
            if (response.data.success) {
                toast.success("Sign-up successful! You can now log in.");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                toast.error(response.data.message || "Error in sign-up.");
            }
        } catch (error) {
            console.error(error);  // Log the error for debugging
            toast.error(error.response.data.message);
        }
    };

    

    return (
        <>
            <div className="login">
                <img className="r-log" src="../src/assets/images/graphics/signup.jpg" alt="" srcset="" />
                <div className="r-sign">
                    <form action="POST" className="log-in" onSubmit={handleSignUp}>
                        <h1 className="log-head">Join Us</h1>
                        <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Email" required/>
                        <input type="text" placeholder="Full Name" name='full_name' value={formData.full_name} onChange={handleChange} required/>
                        <input type="text" placeholder="Adress" name='address' value={formData.address} onChange={handleChange} required/>
                        <input type="phone" placeholder="Phone" name='phone' value={formData.phone} onChange={handleChange} required/>
                        <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} required/>
                        <button className='login-btn2' type="Submit">Sign Up</button>
                        <p>⬅  <Link className='link' to="/">Home</Link></p>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default SignUp;