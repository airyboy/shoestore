import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Visited(props) {
    if (!props.products || props.products.length < 1) return null;

    const shiftLeft = e => {
        e.preventDefault()
        props.onMoveVisited(-1)
    }

    const shiftRight = e => {
        e.preventDefault()
        props.onMoveVisited(1)
    }

    return (
        <section className="product-card__overlooked-slider">
            <h3>Вы смотрели:</h3>
            <div className="overlooked-slider">
                <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" onClick={shiftLeft}></div>

                {props.products.map((product, i) => 
                    <div key={product.id} 
                        className={`overlooked-slider__item overlooked-slider__item-${i + 1}`} 
                        style={{ backgroundImage: `url(${product.images[0]})`}}>
                        <NavLink to={`/productcard/${product.id}`}/>
                    </div>            
                )}
                <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow" onClick={shiftRight}></div>
            </div>
        </section>
    )    
}