import React from 'react';
import useAuth from '../../../Hooks/UseAuth/UseAuth';
import { GiWallet } from 'react-icons/gi';
import { FaProductHunt, FaUser, FaUsers } from 'react-icons/fa6';
import { AiOutlineProduct } from "react-icons/ai";
import { MdLocalShipping } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { Helmet } from 'react-helmet-async';
import ReactLoading from 'react-loading';

// bar charts related imports 
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

// pie charts related imports 
import { PieChart, Pie, Sector, Cell as CellPie, ResponsiveContainer, Legend } from 'recharts';




const AdminHome = () => {
    const { user } = useAuth();
    const axiosInstanceSecure = UseAxiosSecure();

    const { data: stats = {}, refetch: statsRefetch, isLoading } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure.get("/admin-stats");
            // console.log(data);
            return data;
        }
    })

    const { data: chartData = [], refetch: chartDataRefetch, isLoading: isLoadingChart } = useQuery({
        queryKey: ["adminChart"],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure.get("/revenue-categories");
            // console.log(data.data);
            return data.data;
        }
    })


    // custom shape of the bar charts 
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // custom shape of the pie charts 
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // legend for pie charts 
    const CustomLegend = () => {
        return (
            <ul className="flex justify-center">
                {chartData.map((entry, index) => (
                    <li key={`legend-${index}`} className="flex items-center mx-2">
                        <span
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: COLORS[index % COLORS.length],
                                display: 'inline-block',
                                marginRight: '8px'
                            }}
                        ></span>
                        <span className="capitalize">{entry.category}</span>
                    </li>
                ))}
            </ul>
        );
    };

    if (isLoading || isLoadingChart) {
        return (
            <div className="md:w-[80%] mx-auto mt-9">
                <Helmet><title>Admin Home | Bistro Boss Restaurant</title></Helmet>
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
            {/* Header Section  */}
            <section className='mb-7'>
                <h2 className='text-3xl cinzel-font font-semibold mt-8 border-b-4 w-[53%] border-black'>Welcome Back <span>Chef</span>, <span className='text-blue-700 font-bold'>{user?.displayName}!</span></h2>
            </section>

            {/* Admin Stats Section  */}
            <section className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mb-5'>
                {/* Revenue Section  */}
                <div className='px-14 py-9 bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-lg flex gap-3 justify-center items-center hover:scale-110 transition-all duration-500'>
                    <div>
                        <GiWallet color='white' size={40} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white'>${stats?.revenue?.toFixed(2)}</h2>
                        <p className='text-white text-xl'>Revenue</p>
                    </div>
                </div>

                {/* Customers Section  */}
                <div className='px-14 py-9 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] rounded-lg flex gap-3 justify-center items-center hover:scale-110 transition-all duration-500'>
                    <div>
                        <FaUsers color='white' size={40} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white'>{stats?.users}</h2>
                        <p className='text-white text-xl'>Customers</p>
                    </div>
                </div>

                {/* Products Section  */}
                <div className='px-14 py-9 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] rounded-lg flex gap-3 justify-center items-center hover:scale-110 transition-all duration-500'>
                    <div>
                        <AiOutlineProduct color='white' size={40} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white'>{stats?.menuItems}</h2>
                        <p className='text-white text-xl'>Products</p>
                    </div>
                </div>

                {/* Orders Section  */}
                <div className='px-14 py-9 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] rounded-lg flex gap-3 justify-center items-center hover:scale-110 transition-all duration-500'>
                    <div>
                        <MdLocalShipping color='white' size={40} />
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-white'>{stats?.orders}</h2>
                        <p className='text-white text-xl'>Orders</p>
                    </div>
                </div>
            </section>

            {/* Admin Items Category wise bar chart and pie chart */}
            <div className='flex'>
                {/* bar charts  */}
                <section className='flex-1'>
                    <BarChart
                        className="hover:scale-110 transition-all duration-1000"
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={`category`} className='capitalize font-bold text-xl' />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </section>

                {/* pie charts  */}
                <section className='flex-1'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Legend
                                align="center"
                                verticalAlign="top"
                                layout="horizontal"
                                iconType="diamond"
                                content={CustomLegend}
                            />
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="revenue"
                                className="hover:scale-110 transition-all duration-1000"
                            >
                                {chartData.map((entry, index) =>
                                    <CellPie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                )}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </section>
            </div>
        </div>
    );
};

export default AdminHome;