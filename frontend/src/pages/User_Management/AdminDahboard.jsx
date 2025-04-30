import { Outlet } from "react-router-dom";
import AdminNav from "../../Components/Admin_Dashboard/AdminNav";


import '../../css/Admin-dashboard/admin-dashboard.css';

function AdminDashboard() {
    return (
        <>
            <div className="dash">
                <AdminNav />
                <Outlet />
            </div>
        </>
    );
}

export default AdminDashboard;