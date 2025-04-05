import { Outlet } from "react-router-dom";


import '../../css/Admin-dashboard/admin-dashboard.css';
import StaffNav from "../../Components/Staff_Dashboard/StaffNav";

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