import React from 'react';
import { FaCalendarAlt, FaHome, FaShoppingCart } from 'react-icons/fa';
import { ImSpoonKnife } from "react-icons/im";
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import './DashboardStyle/DashboardStyle.css'
import { FiMenu } from 'react-icons/fi';
import { MdLogout, MdRateReview } from "react-icons/md";
import { FaBook, FaList, FaUsers } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';
import UseCart from '../../Hooks/UseCart/UseCart';
import { IoMdMail } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import useAuth from '../../Hooks/UseAuth/UseAuth';
import UseAdmin from '../../Hooks/UseAdmin/UseAdmin';
import UsePaymentHistory from '../../Hooks/UsePaymentHistory/UsePaymentHistory';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { IoWalletSharp } from "react-icons/io5";





const DashboardLayout = () => {
    const [cart] = UseCart();
    const { paymentHistory } = UsePaymentHistory();
    const navigate = useNavigate();
    const { user, handleLogout, setUser } = useAuth();
    const { isAdmin } = UseAdmin();
    // console.log(isAdmin);


    const logoutHandler = () => {
        handleLogout()
            .then(res => {
                Swal.fire({
                    title: "Logout Successfully",
                    icon: 'success'
                })
                setUser(null);
                navigate('/login');
            })
            .catch(error => {
                const errorCode = error.code.split("auth/")[1];
                const formattedError = errorCode
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
                toast.error(formattedError);
            })

    }



    return (
        <div className='flex'>
            <Helmet><title>Dashboard | Bistro Boss Restaurant</title></Helmet>
            <div className="w-80 min-h-screen bg-[#D1A054] p-11">
                <div className='mb-14'>
                    <Link className='cinzel-font' to={'/dashboard/admin-home'}>
                        <h2 className='text-2xl font-black cinzel-font text-[#151515]'>Bistro BOSS <br /> <span className='text-xl font-bold tracking-[4px]'>restaurant</span></h2>
                    </Link>
                </div>
                <div>
                    {
                        isAdmin ?
                            <>
                                <ul className='space-y-3'>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/admin-home'}><FaHome /> <span>Admin Home</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/add-item'}><ImSpoonKnife /> <span>Add Items</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/manage-items'}><FaList /> <span>Manage Items</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/manage-bookings'}><FaBook /> <span>Manage Bookings</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/all-users'}><FaUsers /> <span>All Users</span></NavLink>
                                    </li>
                                    <div className="border-t-2 border-white"></div>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/'}><FaHome /> <span>Home</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/order-food/salad'}><FiMenu /> <span>Menu</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/order-food/salad'}><GiShoppingBag /> <span>Shop</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/contact'}><IoMdMail /> <span>contact</span></NavLink>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/contact'}><MdLogout /> <span>logout</span></button>
                                    </li>
                                </ul>
                            </> :
                            <>
                                <ul className='space-y-3'>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/user-home'}><FaHome /> <span>user Home</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/reservation'}><FaCalendarAlt /> <span>Reservation</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/payment-history'}><IoWalletSharp /> <span>Payment History ({paymentHistory?.data?.length || 0})</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/cart'}><FaShoppingCart /> <span>My Cart ({cart?.data?.length || 0})</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/add-review'}><MdRateReview /> <span>Add Review</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/bookings'}><FaList /> <span>My Bookings</span></NavLink>
                                    </li>
                                    <div className="border-t-2 border-white"></div>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/'}><FaHome /> <span>Home</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/order-food/salad'}><FiMenu /> <span>Menu</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/contact'}><IoMdMail /> <span>contact</span></NavLink>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className='flex items-center gap-3 text-[1.1rem] cinzel-font font-bold' to={'/dashboard/contact'}><MdLogout /> <span>logout</span></button>
                                    </li>
                                </ul>
                            </>
                    }
                </div>
            </div>
            <div className='flex-1 min-h-screen bg-gray-200 px-6 py-2'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;