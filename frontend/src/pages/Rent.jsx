import { Outlet } from "react-router-dom";
import RentNav from "../Components/RentNav";
import '../../css/utils.css'


function Rent() {
    return(
        <>
            <div className="rent header">
                
                <RentNav />
                <Outlet />
            </div>
        </>
    );
}

export default Rent;