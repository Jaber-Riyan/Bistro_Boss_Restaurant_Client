import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import PopularMenu from './PopularMenu/PopularMenu';
import Featured from './Featured/Featured';
import Testimonials from './Testimonials/Testimonials';
import MenuCategory from '../OurMenu/MenuCategory/MenuCategory';
import Cover from '../../Components/Cover/Cover';

const Home = () => {
    return (
        <div>
            <Helmet><title>Home | Bistro Boss Restaurant</title></Helmet>
            <header className='md:mb-20'>
                <Banner></Banner>
            </header>
            <section className='md:w-[80%] mx-auto container mb-20'>
                <Category></Category>
            </section>
            <section className='mb-20 md:w-[80%] mx-auto'>
                <Cover title={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo."} header={"Bistro boss"} bgImage={"https://i.ibb.co.com/z5B7KjS/chef-service.jpg"}></Cover>
            </section>
            <section className='md:w-[80%] mx-auto container mb-20'>
                <PopularMenu></PopularMenu>
            </section>
            <section className='mb-20'>
                <Featured></Featured>
            </section>
            <section className="mb-20 md:w-[70%] mx-auto">
                <Testimonials></Testimonials>
            </section>
        </div>
    );
};

export default Home;