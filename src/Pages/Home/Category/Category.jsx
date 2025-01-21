import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div>
            <SectionTitle subHeading={"From 11:00am to 10:00pm"} heading={"ORDER ONLINE"}></SectionTitle>
            <div>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        600: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper cinzel-font"
                >
                    <SwiperSlide>
                        <img src="https://i.ibb.co.com/wsnCg16/slide1.jpg" alt="" />
                        <p className='text-3xl uppercase text-center text-white font-bold -mt-20'>salads</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co.com/55yqyjL/slide2.jpg" alt="" />
                        <p className='text-3xl uppercase text-center text-white font-bold -mt-20'>pizzas</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co.com/ryGZQLV/slide3.jpg" alt="" />
                        <p className='text-3xl uppercase text-center text-white font-bold -mt-20'>soups</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://i.ibb.co.com/RvDpFn3/slide4.jpg" alt="" />
                        <p className='text-3xl uppercase text-center text-white font-bold -mt-20'>desserts</p>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Category;