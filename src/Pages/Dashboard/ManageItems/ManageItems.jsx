import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import ManageItemsCard from './ManageItemsCard/ManageItemsCard';
import useMenu from '../../../Hooks/UseMenu/useMenu';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';

const ManageItems = () => {
    const { allMenus, refetchMenu } = useMenu();
    // console.log(allMenus);
    const axiosInstanceSecure = UseAxiosSecure();
    const navigate = useNavigate();

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
                const { data } = await axiosInstanceSecure.delete(`/menu/${id}`);
                if (data?.data?.acknowledged && data?.data?.deletedCount > 0) {
                    Swal.fire({
                        title: "Successfully deleted",
                        icon: 'success'
                    })
                    refetchMenu()
                }
            }
            // else if (result.isDenied) {
            //     Swal.fire("Delete are not perform", "", "info");
            // }
        });

    };



    return (
        <div>
            <div>
                <section className='mb-5'>
                    <SectionTitle heading={"MANAGE ALL ITEMS"} subHeading={"Hurry Up!"}></SectionTitle>
                </section>
                <div className='px-12 py-10 bg-white'>
                    <div className='cinzel-font flex justify-between mb-10 items-center'>
                        <h2 className='text-[#151515] font-bold text-2xl'>Total Items: {allMenus?.length}</h2>
                    </div>
                    <div className="animate__animated animate__fadeInUp">
                        <div className="overflow-y-auto max-h-64 custom-scrollbar">
                            <table className="min-w-full table-fixed">
                                <thead className='sticky top-0'>
                                    <tr className="bg-[#D1A054] text-white cinzel-font">
                                        <th className="py-2 px-4 text-left tracking-[2px] rounded-tl-2xl">NO</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">item image</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">item name</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">price</th>
                                        <th className="py-2 px-4 text-left tracking-[2px]">update</th>
                                        <th className="py-2 px-4 text-left tracking-[2px] rounded-tr-2xl">
                                            delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='mt-10'>
                                    {
                                        allMenus?.length > 0 ? allMenus.map((item, index) => <ManageItemsCard item={item} key={item?._id} index={index} handleDelete={handleDelete}></ManageItemsCard>) :
                                            <tr className='text-3xl font-bold text-center text-red-600'>
                                                <td></td>
                                                <td></td>
                                                <td><h2 className=' p-6'>No Items Available</h2></td>
                                            </tr>
                                    }
                                    {/* <ManageItemsCard item={{ name: "tandoori", price: 200, image: "https://i.ibb.co/T2BDsZZ/Tandoori-Chicken-Recipe.jpg", }} index={1}></ManageItemsCard> */}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ManageItems;