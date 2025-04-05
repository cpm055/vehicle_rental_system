import axios from "axios";
import "../../css/smartTravel.css";
import "../../css/util.css";
import Car from "../../Components/Car";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WeatherData from "./WeatherData";

function SmartTravelAssistance() {
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [seats, setSeats] = useState(""); // New state for seats
    const [travelDetails, setTravelDetails] = useState(null);
    const [error, setError] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [weathers, setWeather] = useState([]);

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

    
    const fetchWeather = async (destination) => {
        if (!destination) return; // Prevent unnecessary API call
    
        try {
            const response = await axios.get(`http://localhost:5000/api/weather/${destination}`);
            setWeather(response.data.list);
            console.log("Weather Data:", response.data);
        } catch (err) {
            console.error("Error fetching weather data:", err);
        }
    };

    const handleCarClick = (vehicle) => {
        navigate(`/rent/${vehicle._id}`, { state: vehicle });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
    
        if (!start || !destination || !seats) {
            setError("Please enter start location, destination, and number of seats.");
            return;
        }
    
        setError("");
        setLoading(true);
    
        try {

            // Fetch weather data
        await fetchWeather(destination);

            const routeResponse = await fetchRouteDetails(start, destination);

            const evFriendlyDestinations = [
                "colombo",
                "malabe",
                "galle",
                "negombo",
                "mount lavinia",
                "fort",         // Colombo Fort
                "wellawatte",   // Wellawatte area
                "borella",      // Borella area
                "kollupitiya",  // Kollupitiya area
                "dehiwala",     // Dehiwala area (near Colombo)
                "pettah"      // Pettah (commercial area of Colombo)
            ];

            if (!routeResponse.success) {
                setError(routeResponse.message || "Could not fetch route details.");
                return;
            }

            setTravelDetails(routeResponse.routeDetails);
    
            const distanceKm = routeResponse.routeDetails?.summary?.distance / 1000;
    
            let query = {seats: parseInt(seats)}; // Define `query`
            let excludeCategories = [];
    
            if (distanceKm > 100) {
                query.category = ["SUV", "Sedan"];
            } else if (evFriendlyDestinations.includes(destination.toLowerCase())) {
                excludeCategories.push("SUV");
            } else if (start.toLowerCase() !== "colombo" && destination.toLowerCase() !== "colombo") {
                excludeCategories.push("Electric");
            }

            console.log("Fetching vehicles with query:", query, excludeCategories);
    
            const vehiclesResponse = await axios.get("http://localhost:5000/api/getVehicles", {
                params: {
                    category: query.category || undefined,
                    excludeCategory: excludeCategories.length > 0 ? excludeCategories : undefined,
                    seats: query.seats
                },
            });
    
            setVehicles(vehiclesResponse.data.vehicles || []);

            // Calculate fuel stops
            let fuelStops = 0;
            if (evFriendlyDestinations.includes(destination.toLowerCase()) || evFriendlyDestinations.includes(start.toLowerCase())) {
                // If inside Colombo, fuel stops every 10 km
                fuelStops = Math.floor(distanceKm / 10);
            } else {
                // Outside Colombo, fuel stops every 25 km
                fuelStops = Math.floor(distanceKm / 25);
            }

            console.log("Number of fuel stops required:", fuelStops);
    
        } catch (err) {
            setError("Error fetching travel details. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    const fetchRouteDetails = async (start, destination) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/get-route/${start}/${destination}`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching route details.");
        }
    };

    // Helper function to calculate fuel stops
const calculateFuelStops = (distanceKm) => {
    const evFriendlyDestinations = [
        "colombo",
        "malabe",
        "galle",
        "negombo",
        "mount lavinia",
        "fort",         // Colombo Fort
        "wellawatte",   // Wellawatte area
        "borella",      // Borella area
        "kollupitiya",  // Kollupitiya area
        "dehiwala",     // Dehiwala area (near Colombo)
        "pettah"        // Pettah (commercial area of Colombo)
    ];


    if (evFriendlyDestinations.includes(destination.toLowerCase()) || evFriendlyDestinations.includes(start.toLowerCase())) {
        // If inside Colombo, fuel stops every 10 km
        return Math.floor(distanceKm / 10);
    } else {
        // Outside Colombo, fuel stops every 25 km
        return Math.floor(distanceKm / 25);
    }
};


    return (
        <div className="smartAssist">
            <div className="left">
                <h1 className="smart-heading">Where Are You Going ?...</h1>
                <form onSubmit={handleSubmit} className="smartForm">
                    <label>From</label>
                    <input
                        type="text"
                        name="start"
                        placeholder="ex: Colombo"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
    
                    <label>To</label>
                    <input
                        type="text"
                        name="destination"
                        placeholder="ex: Kandy"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />

<label>Number of Seats</label>
                    <input
                        type="number"
                        name="seats"
                        placeholder="Enter number of seats"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        min={1}
                        max={8}
                    />
                    
                    <button type="submit" className="login-btn2">Get Vehicles</button>
                </form>
    
                {error && <p className="error-message">{error}</p>}
    
                {travelDetails && (
                    <div className="travelDetails">
                        <p className="t-details">Start: {start}</p>
                        <p className="t-details">End: {destination}</p>
                        <p className="t-details">
                            Total Distance: {(travelDetails?.summary?.distance / 1000).toFixed(2)} km
                        </p>
                        <p className="t-details">
                            Duration: {Math.round((travelDetails?.summary?.duration / 3600) * 10) / 10} hrs
                        </p>
    
                        {/* Add Fuel Stops output below Duration */}
                        <p className="t-details">
                            Fuel Stops: {calculateFuelStops(travelDetails?.summary?.distance / 1000)} stops
                        </p>

                        <p className="t-details">
                            Weather Details: {destination}
                        </p>

                        {weathers.length > 0 ? (
                    <div className="weather-list">
                        {weathers.map((weather, index) => {
                            const dayIndex = index + 1; 
                            const day = [1, 2].includes(dayIndex) ? dayIndex : null;
                            return day ? (
                                <WeatherData
                                    key={index}
                                    day={day}
                                    temp={weather.temp.day}
                                    desc={weather.weather[0].description}
                                    icon={weather.weather[0].icon}
                                />
                            ) : null;
                        })}
                    </div>
                ) : (
                    <p>Loading weather data...</p>
                )}
                    </div>
                )}
            </div>
    
            <div className="right">
                <h1 className="smart-heading">Perfect Vehicles</h1>
                <div className="car-list-new">
                    {loading ? (
                        <p>Loading vehicles...</p>
                    ) : error ? (
                        <p style={{ color: "red" }}>{error}</p>
                    ) : (
                        vehicles.length > 0 ? (
                            vehicles.map((vehicle) => (
                                <div
                                    key={vehicle._id}
                                    onClick={() => handleCarClick(vehicle)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <Car
                                        name={vehicle.name}
                                        image={vehicle.image}
                                        category={vehicle.category}
                                        price={vehicle.price}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No vehicles available.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
    
}

export default SmartTravelAssistance;  