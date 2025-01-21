import React from 'react';

const MenuCard = ({ popularMenu }) => {
    const { image, name, recipe, price } = popularMenu;
    return (
        <div>
            <div className='flex gap-3'>
                <img style={{ borderRadius: '0px 200px 200px 200px ' }} className='shadow-2xl w-28 h-24 ' src={popularMenu?.image} alt="" />
                <div>
                    <h2 className='cinzel-font text-[#151515] text-xl mb-2'>{popularMenu?.name} ---------</h2>
                    <p>{recipe}</p>
                </div>
                <h3 className='text-[#BB8506] text-xl'>${price}</h3>
            </div>
        </div>
    );
};

export default MenuCard;