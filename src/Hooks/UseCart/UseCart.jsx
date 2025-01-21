import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosNormal from '../UseAxiosSecureAndNormal/UseAxiosNormal';
import useAuth from '../UseAuth/UseAuth';
import UseAxiosSecure from '../UseAxiosSecureAndNormal/UseAxiosSecure';

const UseCart = () => {
    const axiosInstanceNormal = UseAxiosNormal();
    const axiosInstanceSecure = UseAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ["cart", user?.email],
        queryFn: async () => {
            const response = await axiosInstanceSecure.get(`/carts/${user?.email}`);
            return response.data;
        },
        // enabled: !!user?.email,
    });

    return [cart, refetch];
};

export default UseCart;
