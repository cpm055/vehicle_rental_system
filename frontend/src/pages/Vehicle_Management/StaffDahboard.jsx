import { Outlet } from "react-router-dom";


import '../../css/Admin-dashboard/admin-dashboard.css';
import StaffNav from "../../Components/Staff_Dashboard/StaffNav";
function StaffDashboard() {
    return (
        <>
            <div className="dash">
                <StaffNav />
                <div className="content"></div>
                    <h1>Welcome to the Staff Dashboard</h1>
                    <p>Manage your tasks and view updates here.</p>
                </div>
                <Outlet />
            </div>
        </>
    );
}

export default StaffDashboard;