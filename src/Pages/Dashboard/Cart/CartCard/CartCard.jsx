import React from 'react';
import { FaTrash } from 'react-icons/fa';

const CartCard = ({ item, index, handleDelete }) => {
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className='p-5 font-bold text-xl'>{index + 1}</td>
            <td className="py-2 px-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                />
            </td>
            <td className="py-2 px-4 text-[#737373]">{item.name}</td>
            <td className="py-2 px-4 text-[#737373]"><span className='text-2xl'>৳ </span>{item.price.toFixed(2)}</td>
            <td className="py-2 px-4">
                <button
                    onClick={()=> handleDelete(item?._id)}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                >
                    <FaTrash size={20} />
                </button>
            </td>
        </tr>
    );
};

export default CartCard;
