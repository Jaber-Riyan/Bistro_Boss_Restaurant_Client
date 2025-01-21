import React from 'react';
import SectionTitle from '../../../../../Components/SectionTitle/SectionTitle';
import { ImSpoonKnife } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import UseAxiosNormal from '../../../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import { toast } from 'react-toastify';

const ManageItemsUpdate = () => {
    const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm();
    const params = useParams();
    const axiosInstanceSecure = UseAxiosSecure();
    const axiosInstanceNormal = UseAxiosNormal();
    // console.log(params);

    const { data: oneItem, refetch: refetchOneItem, isPending } = useQuery({
        queryKey: ['oneItem'],
        queryFn: async () => {
            const { data } = await axiosInstanceSecure.get(`/menu/${params.id}`);
            // console.log(data.data);
            return data.data
        }
    })

    const handleSubmitUpdateItem = async (data) => {
        try {
            // Extracting form data
            const name = data.recipeName;
            const category = data.category;
            const price = parseFloat(data.price);
            const recipe = data.recipeDetails;

            // Creating the updated data object
            const updatedData = { name, category, price, recipe };

            // Sending the PATCH request with updatedData
            const response = await axiosInstanceSecure.patch(`/menu/${oneItem?._id}`, updatedData);

            // Logging the response
            console.log('Update response:', response.data);

            if (response.data.status) {
                toast.success('Item updated successfully!');
                refetchOneItem();
            } else {
                toast.error('Failed to update item.');
            }
        } catch (error) {
            console.error('Error updating item:', error);
            toast.error('An error occurred while updating the item.');
        }
    };



    if (isPending) {
        return <div className='w-full min-h-screen flex justify-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-5">
                <SectionTitle heading={"Update an item"} subHeading={"You want to update?"}></SectionTitle>
            </section>
            <div className="p-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(handleSubmitUpdateItem)} className="space-y-6">
                    {/* Recipe Name */}
                    <div className="form-group">
                        <label htmlFor="recipeName" className="block text-lg font-semibold mb-2">Recipe name*</label>
                        <input
                            type="text"
                            id="recipeName"
                            placeholder="Recipe name"
                            name='recipeName'
                            {...register("recipeName")}
                            defaultValue={oneItem?.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>

                    <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                        {/* Category */}
                        <div className="form-group">
                            <label htmlFor="category" className="block text-lg font-semibold mb-2">Category*</label>
                            <select
                                id="category"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                name='category'
                                {...register("category")}
                                defaultValue={oneItem?.category}
                            >
                                <option value="">Select a Category</option>
                                <option value="dessert">Dessert</option>
                                <option value="soup">Soup</option>
                                <option value="pizza">Pizza</option>
                                <option value="drinks">Drinks</option>
                                <option value="salad">Salad</option>

                            </select>
                        </div>

                        {/* Price */}
                        <div className="form-group">
                            <label htmlFor="price" className="block text-lg font-semibold mb-2">Price*</label>
                            <input
                                type="text"
                                id="price"
                                placeholder="Price"
                                name='price'
                                {...register("price")}
                                defaultValue={oneItem?.price?.toFixed(2)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div className="form-group">
                        <label htmlFor="details" className="block text-lg font-semibold mb-2">Recipe Details*</label>
                        <textarea
                            id="details"
                            placeholder="Recipe Details"
                            rows="4"
                            name='recipeDetails'
                            defaultValue={oneItem?.recipe}
                            {...register("recipeDetails")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        ></textarea>
                    </div>

                    {/* File Upload */}
                    {/* <div className="form-group">
                        <label htmlFor="file" className="block text-lg font-semibold mb-2">Upload Image</label>
                        <div className='flex gap-10 items-center'>
                            <div>
                                <input
                                    type="file"
                                    id="file"
                                    name="recipePhoto"
                                    {...register("recipePhoto")}
                                    className="file-input file-input-bordered w-full max-w-xs bg-[#b5823077] text-white"
                                />
                            </div>

                            <img draggable={false} onContextMenu={(e) => e.preventDefault()} className='w-24 border-2 p-2 ' src={oneItem?.image} alt="" />
                        </div>

                    </div> */}

                    {/* Submit Button */}
                    <div className="form-group grid place-items-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-[#835d23] to-[#b58130] text-white hover:bg-gradient-to-l transition-all duration-1000 flex items-center gap-2 rounded-lg"
                        >
                            <span>Update Recipe Details</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageItemsUpdate;