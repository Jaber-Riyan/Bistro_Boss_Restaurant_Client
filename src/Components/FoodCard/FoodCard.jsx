import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import useAuth from '../../Hooks/UseAuth/UseAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAxiosNormal from '../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';
import UseCart from '../../Hooks/UseCart/UseCart';
import { toast } from 'react-toastify';

const FoodCard = ({ menu }) => {
    const { recipe, image, price, name, _id } = menu;
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstanceNormal = UseAxiosNormal();
    const [, refetch] = UseCart();


    const handleAddToCart = async () => {
        if (!user && !user?.email) {
            Swal.fire({
                title: "You are not authorized user, Login first!",
                icon: 'info'
            })
            return navigate('/login', { state: location?.pathname });
        }
        // console.log(food);
        const foodItem = {
            menuItemId: _id,
            orderer: user?.email,
            name,
            image,
            price
        }
        const { data } = await axiosInstanceNormal.post('/carts', foodItem);
        if (data.data.insertedId) {
            toast.success("Successfully added item in the cart");
            refetch();
        }
        else {
            toast.error("Something went wrong while adding item in cart!")
        }
    }


    return (
        <div className=" bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105 hover:shadow-lg">
            <div className="relative">
                <img
                    src={image}
                    alt="Caesar Salad"
                    className="w-full h-72 object-cover"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute font-semibold top-2 right-2 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-md">
                    ${price}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{name}</h3>
                <p className="text-gray-600 text-sm mb-4">{recipe}</p>
                <div className='flex justify-center'>
                    <button onClick={handleAddToCart} className=" bg-[#E8E8E8] text-[#BB8506] border-b-4 border-[#BB8506] font-semibold py-2 px-4 rounded-lg flex items-center justify-center hover:bg-[#111827] transition duration-300">
                        <FaCartPlus className="mr-2" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
