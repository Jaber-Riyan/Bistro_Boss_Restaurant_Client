import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Featured = () => {
    return (
        // <>
        //     {/* Parallax Container */}
        //     <div className="h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://i.ibb.co.com/4dZ7mbc/featured.jpg')" }}>
        //         <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
        //             <h1 className="text-white text-5xl font-bold">Welcome to Parallax World</h1>
        //         </div>
        //     </div>

        // </>
        <div className="relative bg-fixed bg-[url('https://i.ibb.co.com/4dZ7mbc/featured.jpg')] bg-black/40 bg-cover bg-center w-full md:py-32 md:px-40 p-4">
            <div className="absolute inset-0 bg-black/70">
            </div>
            <div className='relative z-10 '>
                <div className='text-center mb-6'>
                    <h2 className='text-[#D99904] text-xl italic mb-5'>---Check It Out---</h2>
                    <h2 className='font-semibold text-3xl uppercase text-white border-y-2 md:w-[30%] mx-auto p-2'>FROM OUR MENU</h2>
                </div>
                <div className='text-white md:flex justify-center gap-10 items-center font-semibold'>
                    <img className='md:w-96 w-full' src="https://i.ibb.co.com/4dZ7mbc/featured.jpg" alt="" />
                    <div>
                        <h2>
                            March 20, 2023
                        </h2>
                        <h3>
                            WHERE CAN I GET SOME?
                        </h3>
                        <p className='mb-6'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                        </p>
                        <button className='px-4 py-2 rounded-lg hover:bg-white font-bold hover:border-b-4 hover:border-slate-600 hover:text-black transition-all duration-500 bg-transparent border-b-4 text-white'>READ MORE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;