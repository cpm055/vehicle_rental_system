import { useLocation , useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../../css/rent-car.css";
import { ToastContainer, toast } from 'react-toastify';

function RentCar() {
    const navigate = useNavigate();
    const location = useLocation();
    const car = location.state;
    const [days, setDays] = useState(1);
    const [formData, setFormData] = useState({
        address: "",
    });
    const [user, setUser] = useState({
        name: "",
        email: "",
    });

    // Load token data on component mount and update the user state
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser({
                    name: decodedToken.name || "",
                    email: decodedToken.email || "",
                });
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    if (!car) {
        return <p className="error-message">Car details not found.</p>;
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDaysChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setDays(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("User not logged in!");
            return;
        }
    
        try {
            const deliveryData = {
                carId: car._id,
                name: car.name,
                model: car.name,
                owner_email: user.email,
                owner_name: user.name,
                address: formData.address,
                category: car.category,
                image: car.image,
            };
    
    
            // Submit to backend
            const response = await axios.post("http://localhost:5000/api/addDelivery", 
                deliveryData 
            );
    
            toast.success("Car rented successfully!");
            setTimeout(() => {
                navigate("/rent");
            }, 1000);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            toast.error("Failed to rent the car. Please try again.");
        }
    };

    return (
        <div className="head">
            <div className="rent-car-container">
            <div className="rent-car-content">
                <h1 className="rent-car-title">Rent {car.name}</h1>
                <img className="rent-car-image" src={car.image} alt={car.name} />
                <div className="rent-car-details">
                    <p className="rent-car-price">Price: <span>Rs. {car.price} per day</span></p>
                    <label className="rent-duration-label">Rental Duration:</label>
                    <input 
                        type="number" 
                        className="rent-duration-input" 
                        value={days} 
                        onChange={handleDaysChange} 
                        min="1"
                    />
                    <p className="rent-car-total">Total Price: <span>Rs. {(car.price * days).toFixed(2)}</span></p>
                </div>
            </div>

            <form className="rent-form" onSubmit={handleSubmit}>
                <h3>Enter Your Details</h3>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    className="rent-input" 
                    value={user.name}
                    disabled  // prevents manual edits since it's auto-populated
                    required 
                />

                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    className="rent-input" 
                    value={user.email}
                    disabled  // prevents manual edits since it's auto-populated
                    required 
                />

                <label>Address:</label>
                <textarea 
                    name="address" 
                    className="rent-textarea" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    required 
                />

                <button type="submit" className="rent-car-button">Confirm Rental</button>
            </form>
            <ToastContainer />
        </div>
        </div>
        
    );
}

export default RentCar;
