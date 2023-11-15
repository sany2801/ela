import React, { useState, useEffect } from 'react';
import Menu from '../../components/menu/Menu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import "./home_page.css"

const Home = () => {
    const [activeLink, setActiveLink] = useState("");
    const navigate = useNavigate()
    const location = useLocation();
    const logout = () => {
        localStorage.clear()
        navigate("/")

    }
    useEffect(() => {
        const currentPath = window.location.pathname.toLowerCase();
        // console.log(currentPath)
        if (currentPath.includes("shipments")) {
            setActiveLink("Shipments")
        } else if (currentPath.includes("items")) {
            setActiveLink("Items")
        } else if (currentPath.includes("spaces")) {
            setActiveLink("Spaces")
        } else if (currentPath.includes("notifications")) {
            setActiveLink("Notifications")
        } else if (currentPath.includes("profile")) {
            setActiveLink("Account settings")
        } else {
            setActiveLink("")
        }
    }, [location])
    return (
        <div className='home_page'>
            <Menu></Menu>
            <div className='content_home_page'>
                <header className='header_home-page'>
                    <h2 className='header-tittle'>{activeLink}</h2>
                    <button className='header_btn-logout' onClick={logout}>Log out</button>
                </header>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Home;