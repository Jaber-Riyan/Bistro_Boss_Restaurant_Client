import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../Pages/Shared/Footer/Footer';
import Navbar from '../../Pages/Shared/Navbar/Navbar';

const MainLayout = () => {
    const location = useLocation();
    // console.log(location);
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');

    return (
        <div>
            <header className='fixed w-full z-20 backdrop-blur-sm bg-black/40'>
                {noHeaderFooter || <Navbar></Navbar>}
            </header>
            <Outlet></Outlet>
            <footer>
                {noHeaderFooter || <Footer></Footer>}
            </footer>
        </div>
    );
};

export default MainLayout;