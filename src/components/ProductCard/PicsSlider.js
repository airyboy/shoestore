import React from 'react';

export default function PicsSlider(props) {
    return (
        <section className="main-screen__favourite-product-slider">
            <div className="favourite-product-slider">
                <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>
                {props.images.map((image, i) => 
                    <div key={i} 
                        className={`favourite-product-slider__item favourite-product-slider__item-${i + 1}`} 
                        style={{backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundPosition: 'center, center'}}>
                    </div>
                )}
                <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>
            </div>
        </section>
    )
}