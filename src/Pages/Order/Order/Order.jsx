import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import useMenu from '../../../Hooks/UseMenu/useMenu';
import Cover from '../../../Components/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FoodCard from '../../../Components/FoodCard/FoodCard';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OrderTab from '../OrderTab/OrderTab';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { menus, allMenus, loading } = useMenu("popular");
    const { category } = useParams();
    const initialInx = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialInx);
    // console.log(category);

    if (loading) {
        return (
            <div className="md:w-[80%] mx-auto mt-9">
                <Helmet><title>Food Order | Bistro Boss Restaurant</title></Helmet>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                        <ReactLoading type="spin" color="red" />
                    </div>
                </div>
            </div>
        );
    }

    const salad = allMenus.filter(item => item.category === "salad");
    const pizza = allMenus.filter(item => item.category === "pizza");
    const soup = allMenus.filter(item => item.category === "soup");
    const dessert = allMenus.filter(item => item.category === "dessert");
    const drinks = allMenus.filter(item => item.category === "drinks");


    return (
        <div>
            <Helmet><title>Food Order | Bistro Boss Restaurant</title></Helmet>
            <section className='mb-20'>
                <Cover
                    bgImage={"https://i.ibb.co/hMkzH93/banner2.jpg"}
                    header={"Order Food"}
                    title={"Would you like to try a dish?"}
                />
            </section>
            <section className='md:w-[80%] container mx-auto mb-20'>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className="flex space-x-4 justify-center mb-10">
                        <Tab
                            className="py-2 px-4 cursor-pointer focus:outline-none uppercase font-bold"
                            selectedClassName="py-2 px-4 cursor-pointer border-b-4 border-[#BB8506] text-[#BB8506]"
                        >
                            Salad ({salad.length})
                        </Tab>
                        <Tab
                            className="py-2 px-4 cursor-pointer focus:outline-none uppercase font-bold"
                            selectedClassName="py-2 px-4 cursor-pointer border-b-4 border-[#BB8506] text-[#BB8506]"
                        >
                            Pizza ({pizza.length})
                        </Tab>
                        <Tab
                            className="py-2 px-4 cursor-pointer focus:outline-none uppercase font-bold"
                            selectedClassName="py-2 px-4 cursor-pointer border-b-4 border-[#BB8506] text-[#BB8506]"
                        >
                            Soups ({soup.length})
                        </Tab>
                        <Tab
                            className="py-2 px-4 cursor-pointer focus:outline-none uppercase font-bold"
                            selectedClassName="py-2 px-4 cursor-pointer border-b-4 border-[#BB8506] text-[#BB8506]"
                        >
                            Desserts ({dessert.length})
                        </Tab>
                        <Tab
                            className="py-2 px-4 cursor-pointer focus:outline-none uppercase font-bold"
                            selectedClassName="py-2 px-4 cursor-pointer border-b-4 border-[#BB8506] text-[#BB8506]"
                        >
                            Drinks ({drinks.length})
                        </Tab>
                    </TabList>

                    {/* salad tab  */}
                    <TabPanel>
                        <OrderTab items={salad}></OrderTab>
                    </TabPanel>

                    {/* pizza tab  */}
                    <TabPanel>
                        <OrderTab items={pizza}></OrderTab>
                    </TabPanel>

                    {/* soup tab  */}
                    <TabPanel>
                        <OrderTab items={soup}></OrderTab>
                    </TabPanel>

                    {/* dessert tab  */}
                    <TabPanel>
                        <OrderTab items={dessert}></OrderTab>
                    </TabPanel>

                    {/* drinks tab  */}
                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                </Tabs>
            </section>
        </div>
    );
};

export default Order;
