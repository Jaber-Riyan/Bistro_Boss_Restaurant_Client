import React from 'react';
import { FaTrash } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const ManageItemsCard = ({ item, index, handleDelete }) => {
    const navigate = useNavigate();

    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className='p-5 font-bold text-xl'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373]">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                />
            </td>
            <td className="py-2 px-4 text-[#737373]">{item?.name}</td>
            <td className="py-2 px-4 text-[#737373]"> <span className='text-2xl'>৳ </span>{parseFloat(item?.price).toFixed(2)}</td>
            <td className="py-2 px-4">
                <Link
                    to={`/dashboard/update-item/${item?._id}`}
                    className="text-white bg-[#D1A054] btn hover:text-[#d19f54bb] transition duration-500"
                >
                    <FiEdit size={20} />
                </Link>
            </td>
            <td className="py-2 px-4">
                <button
                    onClick={() => handleDelete(item?._id)}
                    className="text-white bg-red-600 btn hover:text-red-500 transition duration-500"
                >
                    <FaTrash size={20} />
                </button>
            </td>
        </tr>
    );
};

export default ManageItemsCard;