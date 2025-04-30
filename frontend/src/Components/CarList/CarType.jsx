import Car from "../Car";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../css/rent-page.css';

function CarType() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/getVehicles");
                setVehicles(response.data.vehicles);
            } catch (err) {
                setError("Failed to fetch vehicles");
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    const handleCarClick = (vehicle) => {
        navigate(`/rent/${vehicle._id}`, { state: vehicle });
    };

    return (
        <div className="car-list">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                vehicles.map((vehicle) => (
                    <div key={vehicle._id} onClick={() => handleCarClick(vehicle)} style={{ cursor: "pointer" }}>
                        <Car name={vehicle.name} image={vehicle.image} cateogry={vehicle.category} price={vehicle.price} />
                    </div>
                ))
            )}
        </div>
    );
}

export default CarType;
