import { Outlet } from "react-router-dom";


import '../../css/Admin-dashboard/admin-dashboard.css';
import DelNav from "../../Components/Delivery_Dashboard/DelNav";

function DelManDashboard() {
    return (
        <>
            <div className="dash">
                <DelNav />
                <Outlet />
            </div>
        </>
    );
}

export default DelManDashboard;