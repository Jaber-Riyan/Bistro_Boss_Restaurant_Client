import React from 'react';
import useAuth from '../../../Hooks/UseAuth/UseAuth';

const UserHome = () => {
    const { user } = useAuth();
    return (
        <div>
            <section>
                <h2 className='text-3xl cinzel-font font-semibold mt-8 border-b-4 w-[49%] border-black'>Hi, <span className='text-blue-700 font-bold'>{user?.displayName}</span> Welcome Back!</h2>
            </section>
        </div>
    );
};

export default UserHome;