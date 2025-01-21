import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';

const AllUsersCard = ({ item: user, index, handleDelete, handleMakeAdmin }) => {
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-100">
            <td className='p-5 font-bold text-xl'>{index + 1}</td>
            <td className="py-2 px-4 text-[#737373]">
                {user?.name}
            </td>
            <td className="py-2 px-4 text-[#737373]">{user.email}</td>
            <td className="py-2 px-4 text-[#737373]">{user.lastLoginTime}</td>
            <td className="py-2 px-4 text-[#737373]"><button onClick={() => handleMakeAdmin(user)} className={`font-bold text-xl btn ${user?.role === "admin" ? 'bg-green-400' : 'bg-[#D1A054]'} text-white`}>{user?.role === "admin" ? "Admin" : <FaUsers />}</button></td>
            <td className="py-2 px-4">
                <button
                    onClick={() => handleDelete(user?._id)}
                    className="text-white bg-red-600 btn hover:text-red-600 transition duration-500"
                >
                    <FaTrash size={20} />
                </button>
            </td>
        </tr>
    );
};

export default AllUsersCard;
