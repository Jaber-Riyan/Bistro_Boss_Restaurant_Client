import React from 'react';

const Cover = ({ bgImage, header, title }) => {
    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} className="relative bg-fixed bg-black/40 bg-cover bg-center  h-screen w-full md:py-32 md:px-40 p-4">
            <div className="absolute inset-0 bg-black/40">
            </div>
            <div className='relative z-10 bg-[#15151599] py-36 px-20 '>
                <h2 className='text-center text-7xl cinzel-font text-white font-bold mb-2'>{header}</h2>
                <p className='text-center text-white cinzel-font font-semibold'>{title}</p>
            </div>
        </div>
    );
};

export default Cover;