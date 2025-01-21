import { useEffect, useState } from "react";
import UseAxiosNormal from "../UseAxiosSecureAndNormal/UseAxiosNormal";
import { useQuery } from "@tanstack/react-query";

const useMenu = (category) => {
    const [menus, setMenus] = useState([]);
    // const [allMenus, setAllMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosInstanceNormal = UseAxiosNormal();


    // all menus data load
    const { data: allMenus, refetch: refetchMenu } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const { data } = await axiosInstanceNormal.get('/menu');
            return data.data;
        }
    })
    // useEffect(() => {
    //     axiosInstanceNormal.get('/menu')
    //         .then(res => {
    //             // console.log(res.data.data);
    //             setAllMenus(res.data.data);
    //         })
    // }, [axiosInstanceNormal])

    // category wish data load 
    useEffect(() => {
        axiosInstanceNormal.get(`/category-wish-items/${category}`)
            .then(res => {
                // console.log(res.data.data);
                setMenus(res.data.data);
            })
    }, [axiosInstanceNormal, category])



    // loading spinner timer off 
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    // console.log(menus);
    // console.log(allMenus);

    return { menus, loading, allMenus, refetchMenu }
}

export default useMenu;