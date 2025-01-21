import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuCard from '../../../Components/MenuCard/MenuCard';
import useMenu from '../../../Hooks/UseMenu/useMenu';

const MenuCategory = ({ header, title, bgImage, category }) => {
    const { menus, loading } = useMenu(category)

    return (
        <div>
            <div style={{ backgroundImage: `url(${bgImage})` }} className="relative bg-black/40 bg-cover bg-center  h-screen w-full md:py-32 md:px-40 p-4 flex justify-center items-center">
                <div className="absolute inset-0 bg-black/40">
                </div>
                <div className='relative z-10 bg-[#15151599] py-36 px-20'>
                    <h2 className='text-center text-5xl cinzel-font text-white font-bold mb-4 uppercase'>{header}</h2>
                    <p className='text-center text-white font-semibold'>{title}</p>
                </div>
            </div>
            <div className='mt-16 md:w-[80%] mx-auto space-y-9'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                    {
                        menus && menus.map(popularMenu => <MenuCard key={popularMenu._id} popularMenu={popularMenu}></MenuCard>)
                    }
                </div>
                <div className='md:flex justify-center'>
                    <Link to={`/order-food/${category}`} className='btn btn-outline font-bold text-black border-0 border-b-4'>
                        ORDER YOUR FAVORITE FOOD
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MenuCategory;