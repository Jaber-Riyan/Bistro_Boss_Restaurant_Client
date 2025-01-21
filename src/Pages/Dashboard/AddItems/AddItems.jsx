import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { ImSpoonKnife } from 'react-icons/im';
import { useQuery } from '@tanstack/react-query';
import UseAxiosNormal from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import Swal from 'sweetalert2';


const ImageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const AddItems = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();



    const handleSubmitAddItem = async (data) => {
        // console.log(data);
        const recipeName = data.recipeName;
        const category = data.category;
        const price = data.price;
        const recipeDetails = data.recipeDetails;
        let recipePhoto = data.recipePhoto[0];
        const { data: imageURL } = await axiosInstanceNormal.post(`https://api.imgbb.com/1/upload?key=${ImageHostingKey}`, { image: recipePhoto }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        recipePhoto = imageURL.data.url;
        // console.log(imageURL);
        if (imageURL.success) {
            // now time to send item value to the server with image url
            const menuItem = {
                name: recipeName,
                recipe: recipeDetails,
                image: recipePhoto,
                category: category,
                price: parseFloat(price)
            }
            // send to server 
            const menuRes = await axiosInstanceSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            console.log(menuItem);
            if (menuRes.data.data.insertedId) {
                reset();
                Swal.fire({
                    title: `${menuItem.name} item Successfully Added`,
                    icon: "success"
                })
            }
        }

        // console.table({ recipeName, category, price, recipeDetails, recipePhoto });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-5">
                <SectionTitle heading={"Add an item"} subHeading={"What's New?"}></SectionTitle>
            </section>
            <div className="p-8 bg-white rounded-lg shadow-lg">
                <form onSubmit={handleSubmit(handleSubmitAddItem)} className="space-y-6">
                    {/* Recipe Name */}
                    <div className="form-group">
                        <label htmlFor="recipeName" className="block text-lg font-semibold mb-2">Recipe name*</label>
                        <input
                            type="text"
                            id="recipeName"
                            placeholder="Recipe name"
                            name='recipeName'
                            {...register("recipeName", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                        {errors.recipeName && <span className="text-red-500">This field is required</span>}
                    </div>

                    <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                        {/* Category */}
                        <div className="form-group">
                            <label htmlFor="category" className="block text-lg font-semibold mb-2">Category*</label>
                            <select
                                id="category"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                                name='category'
                                {...register("category", { required: true })}
                                defaultValue="default"
                            >
                                <option value="default">Select a Category</option>
                                <option value="dessert">Dessert</option>
                                <option value="soup">Soup</option>
                                <option value="pizza">Pizza</option>
                                <option value="drinks">Drinks</option>
                                <option value="salad">Salad</option>

                            </select>
                            {errors.category && <span className="text-red-500">This field is required</span>}
                        </div>

                        {/* Price */}
                        <div className="form-group">
                            <label htmlFor="price" className="block text-lg font-semibold mb-2">Price*</label>
                            <input
                                type="number"
                                id="price"
                                placeholder="Price"
                                name='price'
                                {...register("price", { required: true })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                            />
                            {errors.price && <span className="text-red-500">This field is required</span>}
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
                            {...register("recipeDetails", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        ></textarea>
                        {errors.recipeDetails && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* File Upload */}
                    <div className="form-group">
                        <label htmlFor="file" className="block text-lg font-semibold mb-2">Upload Image</label>
                        <input
                            type="file"
                            id="file"
                            name="recipePhoto"
                            {...register("recipePhoto", { required: true })}
                            className="file-input file-input-bordered w-full max-w-xs bg-[#b5823077] text-white"
                        />

                        {errors.recipePhoto && <span className="text-red-500">This field is required</span>}
                    </div>

                    {/* Submit Button */}
                    <div className="form-group">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-[#835d23] to-[#b58130] text-white hover:bg-gradient-to-l transition-all duration-1000 flex items-center gap-2 rounded-lg"
                        >
                            <span>Add Item</span>
                            <ImSpoonKnife></ImSpoonKnife>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
