import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import UseCart from '../../../Hooks/UseCart/UseCart';
import UseAxiosNormal from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AllUsersCard from './AllUsersCard/AllUsersCard';
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {
    const [cart, refetch] = UseCart();
    const axiosInstanceSecure = UseAxiosSecure();
    const axiosInstanceNormal = UseAxiosNormal();
    const navigate = useNavigate();


    const { refetch: refetchUsers, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosInstanceSecure.get('/users');
            // console.log(res.data);
            return res.data;
        }
    })


    const handleDelete = async (id) => {
        Swal.fire({
            title: "Do you want to delete?",
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
            icon: 'info'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.delete(`/users/${id}`);
                if (data?.data?.acknowledged && data?.data?.deletedCount > 0) {
                    Swal.fire({
                        title: "Successfully deleted",
                        icon: 'success'
                    })
                    refetchUsers()
                }
            }
            // else if (result.isDenied) {
            //     Swal.fire("Delete are not perform", "", "info");
            // }
        });
    };


    const handleMakeAdmin = async (user) => {
        Swal.fire({
            title: "Do you want to make this user Admin?",
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosInstanceSecure.patch(`/users/admin/${user?._id}`);
                if (data?.data?.modifiedCount > 0) {
                    Swal.fire({
                        title: `${user?.name} is an Admin now`,
                        icon: 'success',
                    })
                    refetchUsers()
                }
                else {
                    Swal.fire({
                        title: `${user?.name} is already Admin`,
                        icon: 'success',
                    })
                }
            }
            // else if (result.isDenied) {
            //     Swal.fire("Work is not perform", "", "info");
            // }
        });
    }


    return (
        <div>
            <section className='mb-5'>
                <SectionTitle heading={"MANAGE ALL USERS"} subHeading={"How Many"}></SectionTitle>
            </section>
            <div className='px-12 py-10 bg-white'>
                <div className='cinzel-font flex justify-between mb-10 items-center'>
                    <h2 className='text-[#151515] font-bold text-2xl'>Total Users: {users?.data?.length}</h2>
                </div>
                <div className="animate__animated animate__fadeInUp">
                    <div className="overflow-y-auto max-h-64 custom-scrollbar">
                        <table className="min-w-full table-fixed">
                            <thead className='sticky top-0'>
                                <tr className="bg-[#D1A054] text-white">
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">NAME</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">EMAIL</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">LAST LOGIN</th>
                                    <th className="py-2 px-4 text-left tracking-[2px]">ROLE</th>
                                    <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.data?.length > 0 ? users?.data?.map((user, index) => {
                                        return <AllUsersCard key={user?._id} item={user} index={index} handleDelete={handleDelete} handleMakeAdmin={handleMakeAdmin}></AllUsersCard>

                                    }) :

                                        <tr className='text-3xl font-bold text-center text-red-600'>
                                            <td></td>
                                            <td></td>
                                            <td><h2 className=' p-6'>No User</h2></td>
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

export default AllUsers;