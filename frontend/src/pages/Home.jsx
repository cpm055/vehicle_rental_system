
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom"




function Home() {
    return (
        <>
            <NavBar/>
            <Outlet /> 
        </>
    );
}

export default Home;