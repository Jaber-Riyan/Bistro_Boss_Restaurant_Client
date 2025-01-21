import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import UseAxiosNormal from '../../../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';



const Testimonials = () => {
    const axiosInstanceNormal = UseAxiosNormal();

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axiosInstanceNormal.get('/reviews')
        .then(res => {
            // console.log(res.data.data);
            setReviews(res.data.data);
        })
    }, [axiosInstanceNormal])

    return (
        <div>
            <div className='mb-10'>
                <SectionTitle subHeading={"What Our Clients Say"} heading={"TESTIMONIALS"}></SectionTitle>
            </div>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => {
                            return (
                                <SwiperSlide className='px-20' key={review?._id}>
                                    <div >
                                        <div className='flex justify-center mb-6'>
                                            <Rating
                                                style={{ maxWidth: 180 }}
                                                value={review?.rating}
                                                readOnly
                                            >

                                            </Rating>
                                        </div>
                                        <div className='flex gap-1 justify-center mb-7'>
                                            <img className='w-8' src="https://i.ibb.co.com/54JP8P7/image.png" alt="" />
                                            <img className='w-8' src="https://i.ibb.co.com/54JP8P7/image.png" alt="" />
                                        </div>
                                        <p className='text-center mb-5 text-[#444444]'>{review?.details}</p>
                                        <h3 className='text-center text-3xl uppercase text-[#CD9003] font-medium'>{review?.name}</h3>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;