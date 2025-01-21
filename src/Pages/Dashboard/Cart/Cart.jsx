import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import UseCart from '../../../Hooks/UseCart/UseCart';
import CartCard from './CartCard/CartCard';
import { FaTrash } from 'react-icons/fa6';
import './Cart.css'
import UseAxiosNormal from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
    const [cart = [], refetch] = UseCart();
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const totalPrice = cart?.data?.reduce((sum, item) => sum + item?.price, 0);


    const handleDelete = async (id) => {
        Swal.fire({
            title: "Do you want to delete?",
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
            icon: 'info'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.delete(`/carts/${id}`);
                if (data?.data?.acknowledged && data?.data?.deletedCount > 0) {
                    toast.success("Item deleted successfully",{position:'top-right'});
                    refetch()
                }
            }
            // else if (result.isDenied) {
            //     Swal.fire("Delete are not perform", "", "info");
            // }
        });

    };


    return (
        <div>
            <section className='mb-5'>
                <SectionTitle heading={"WANNA ADD MORE?"} subHeading={"My Cart"}></SectionTitle>
            </section>
            <div className='px-12 py-10 bg-white'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] font-bold text-2xl'>Total orders: {cart?.data?.length || 0}</h2>
                    <h2 className='text-[#151515] font-bold text-2xl'>Total price: ${totalPrice || 0}</h2>
                    <button disabled={!cart?.data?.length} className='font-bold text-2xl btn bg-[#D1A054] text-white'><Link to={'/dashboard/payment'} >pay</Link></button>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-64 custom-scrollbar">
                        <table className="min-w-full table-fixed">
                            <thead>
                                <tr className="sticky top-0 bg-[#D1A054] text-white">
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">ITEM IMAGE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">ITEM NAME</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">PRICE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart?.data?.length > 0 ? cart?.data?.map((item, index) => {
                                        return <CartCard key={item?._id} item={item} index={index} handleDelete={handleDelete}></CartCard>

                                    }) :

                                        <tr className='text-3xl font-bold text-center text-red-600'>
                                            <td></td>
                                            <td></td>
                                            <td><h2 className=' p-6'>No Item In Your Cart </h2></td>
                                        </tr>

                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Cart;