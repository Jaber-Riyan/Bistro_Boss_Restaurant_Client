import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom'
import MenuCard from '../../../Components/MenuCard/MenuCard';
import UseAxiosNormal from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';

const PopularMenu = () => {
    const [popularMenus, setPopularMenus] = useState([]);
    const axiosInstanceNormal = UseAxiosNormal();

    useEffect(() => {
        axiosInstanceNormal.get('/menu')
            .then(res => {
                // console.log(data);
                const filtered = res.data.data.filter(item => item.category === 'popular');
                setPopularMenus(filtered)
            })
    }, [axiosInstanceNormal])
    return (
        <div>
            <SectionTitle heading={"FROM OUR MENU"} subHeading={"Check it out"}></SectionTitle>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3 mb-10'>
                {
                    popularMenus && popularMenus.map(popularMenu => <MenuCard key={popularMenu._id} popularMenu={popularMenu}></MenuCard>)
                }
            </div>
            <div className='md:flex justify-center'>
                <Link className='btn btn-outline font-bold text-black border-0 border-b-4'>
                    View Full Menu
                </Link>
            </div>
        </div>
    );
};

export default PopularMenu;