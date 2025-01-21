import React from 'react';
import OurMenuBanner from './OurMenuBanner/OurMenuBanner';
import TodayOffer from './TodayOffer/TodayOffer';
import { Helmet } from 'react-helmet-async';
import MenuCategory from './MenuCategory/MenuCategory';
import dessertsImg from '../../assets/dessert-bg.jpeg'
import useMenu from '../../Hooks/UseMenu/useMenu';
import ReactLoading from 'react-loading';
import Cover from '../../Components/Cover/Cover';
import bannerImg from '../../assets/banner3.png'


const OurMenu = () => {
    const { menus, loading } = useMenu("popular");
    if (loading) {
        return (
            <div className="md:w-[80%] mx-auto mt-9">
                <Helmet><title>Menu | Bistro Boss Restaurant</title></Helmet>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                        <ReactLoading type="spin" color="red" />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Helmet>
                <title>Menu | Bistro Boss Restaurant</title>
            </Helmet>
            <section className='mb-20'>
                <Cover bgImage={bannerImg} header={"our shop"} title={"Would you like to try a dish?"}></Cover>
            </section>
            <section className='md:w-[80%] mx-auto container mb-20'>
                <TodayOffer category={"offered"}></TodayOffer>
            </section>
            {/* DESSERTS section  */}
            <section className='mb-20'>
                <MenuCategory header={"DESSERTS"} title={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} category={"dessert"} bgImage={dessertsImg}></MenuCategory>
            </section>

            {/* PIZZA section  */}
            <section className='mb-20'>
                <MenuCategory header={"pizza"} title={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} category={"pizza"} bgImage={"https://i.ibb.co.com/0cC9dTv/pizza-bg.jpg"}></MenuCategory>
            </section>

            {/* SALADS section  */}
            <section className="mb-20">
                <MenuCategory header={"salads"} title={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} category={"salad"} bgImage={"https://i.ibb.co.com/DYQR8Fh/salad-bg.jpg"}></MenuCategory>
            </section>
            
            {/* SOUPS section  */}
            <section className="mb-20">
                <MenuCategory header={"soups"} title={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} category={"soup"} bgImage={"https://i.ibb.co.com/jbQr8Rj/soup-bg.jpg"}></MenuCategory>
            </section>
        </div>
    );
};

export default OurMenu;