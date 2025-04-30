import { Outlet } from "react-router-dom";


import '../../css/Admin-dashboard/admin-dashboard.css';
import StaffNav from "../../Components/Staff_Dashboard/StaffNav";
// import StaffDashboard from "../../Components/Staff_Dashboard/StaffDashboard";
// import StaffDashboard from "../../Components/Staff_Dashboard/StaffDashboard";        

function StaffDashboard() {
    return (
        <>
            <div className="dash">
                <StaffNav />
                <Outlet />
            </div>
        </>
    );
}

export default StaffDashboard;