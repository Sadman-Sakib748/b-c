import React from 'react';
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {

    const [cart] = useCart();
    // TODO : get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className='flex'>
            <div className='w-64 min-h-screen bg-orange-600'>
                <ul className='menu p-4 '>
                    {
                        isAdmin ?
                            <>
                            {/* admin links */}
                                <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <FaHome></FaHome>
                                        Admin Home</NavLink>
                                </li>


                                <li>
                                    <NavLink to="/dashboard/addItems">
                                        <FaUtensils></FaUtensils>
                                        Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">
                                        <FaList></FaList>
                                        Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaBook></FaBook>
                                        Manage Bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUsers">
                                        <FaUsers></FaUsers>
                                       All Users</NavLink>
                                </li>
                            </>
                            :
                            <>
                            {/* users link */}
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>


                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar></FaCalendar>
                                        Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaList></FaList>
                                        My Bookings</NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav link */}
                    <div className='divider'></div>
                    <li>
                        <NavLink to="/dashboard/home">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;