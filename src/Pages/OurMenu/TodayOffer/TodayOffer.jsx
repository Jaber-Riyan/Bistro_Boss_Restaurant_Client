import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';
import PopularMenuCard from '../../../Components/MenuCard/MenuCard';
import useMenu from '../../../Hooks/UseMenu/useMenu';

const TodayOffer = ({ category }) => {
    const { menus } = useMenu(category);
    
    return (
        <div>
            <SectionTitle heading={"TODAY'S OFFER"} subHeading={"Don't Miss"}></SectionTitle>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3 mb-10'>
                {
                    menus && menus.map(popularMenu => <PopularMenuCard key={popularMenu._id} popularMenu={popularMenu}></PopularMenuCard>)
                }
            </div>
            <div className='md:flex justify-center'>
                <Link to={'/order-food'} className='btn btn-outline font-bold text-black border-0 border-b-4'>
                    ORDER YOUR FAVOURITE FOOD
                </Link>
            </div>
        </div>
    );
};

export default TodayOffer;