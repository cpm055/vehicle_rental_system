import { Outlet } from "react-router-dom";


import '../../css/Admin-dashboard/admin-dashboard.css';
import DelPerNav from "../../Components/DeliverPerson_Dashboard/DelNav";

function DelPerDashboard() {
    return (
        <>
            <div className="dash">
                <DelPerNav />
                <Outlet />
            </div>
        </>
    );
}

export default DelPerDashboard;