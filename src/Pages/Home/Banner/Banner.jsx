import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className=""> {/* Limit carousel width */}
            <Carousel className="rounded-lg" autoPlay={true} interval={2000} infiniteLoop={true}>
                <div>
                    <img src="https://i.ibb.co.com/HTGkYKQ/01.jpg" alt="Image 1" />
                </div>
                <div>
                    <img src="https://i.ibb.co.com/L6FWdQn/02.jpg" alt="Image 2" />
                </div>
                <div>
                    <img src="https://i.ibb.co.com/hC7KTDD/03.png" alt="Image 3" />
                </div>
                <div>
                    <img src="https://i.ibb.co.com/yygR2Pc/04.jpg" alt="Image 4" />
                </div>
                <div>
                    <img src="https://i.ibb.co.com/Z8yksGb/05.png" alt="Image 5" />
                </div>
                <div>
                    <img src="https://i.ibb.co.com/kDGzvXB/06.png" alt="Image 6" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
