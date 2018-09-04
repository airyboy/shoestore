import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SimilarGoods(props) {
    if (props.products.length < 1) return null;

    const shiftLeft = e => {
        e.preventDefault()
        props.onMoveSimilar(-1)
    }

    const shiftRight = e => {
        e.preventDefault()
        props.onMoveSimilar(1)
    }

    return (
        <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow" onClick={shiftLeft}></div>
            {props.products.map((prod, i) =>
                <div key={prod.id} className="similar-products-slider__item-list__item-card item">
                    <div className="similar-products-slider__item">
                        <NavLink to={`/productcard/${prod.id}`}>
                            <img src={prod.images[0]} className={`similar-products-slider__item-pic-${i + 1}`} alt={prod.title}
                                style={{maxWidth: '300px', maxHeight: '200px'}} />
                        </NavLink>
                    </div>
                    <div className="similar-products-slider__item-desc">
                        <h4 className="similar-products-slider__item-name">{prod.title}</h4>
                        <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{prod.brand}</span></p>
                        <p className="similar-products-slider__item-price">{prod.price}</p>
                    </div>    
                </div>
            )}
          <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"  onClick={shiftRight}></div>
        </div>
      </section>
    )
}