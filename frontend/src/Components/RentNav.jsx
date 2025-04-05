

import { Link } from "react-router-dom";
import '../css/rent-nav.css';


function RentNav() {
    return (
        <>
            <div className="rent-header">
                    <p className="rent-heading">Collection</p>
                    <h1 className="rent-greeting">Explore Our Car Collection</h1>  
                <nav className="type-nav">
                <ul>
                    <li><Link to="/rent" className="nav-item">All Type</Link></li>
                    <li><Link to="/rent/suv" className="nav-item">SUV</Link></li>
                    <li><Link to="/rent/sedan" className="nav-item">Sedan</Link></li>
                    <li><Link to="/rent/electric" className="nav-item">Electric</Link></li>
                </ul>
             </nav>  
            </div>
        </>
    );
}


export default RentNav;