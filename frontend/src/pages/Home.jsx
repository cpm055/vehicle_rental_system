
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom"




function Home() {
    return (
        <>
            <NavBar/>
            <Outlet /> 
        </>
    <footer>
        <p>© 2023 Vehicle Rental System. All rights reserved.</p>
    </footer>
}

export default Home;