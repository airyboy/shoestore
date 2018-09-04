import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FavoriteItemCard(props) {

    const onToggleFavorite = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        props.onToggleFavorite(id);
    }

    const HeartIcon = (props) => {
        if (props.inFavorites !== undefined) {
            // rendering for /catalog page
            return (
                <div 
                    className={props.inFavorites ? 'product-catalogue__product_favorite-chosen' : 'product-catalogue__product_favorite'} 
                    onClick={e => onToggleFavorite(e, props.id)}>
                    <p></p>
                </div>
            )
        } else {
            // rendering for /favourite page
            return (
                <div className="product-catalogue__product_favorite" onClick={e => onToggleFavorite(e, props.id)}>
                    <p></p>
                </div>                
            )
        }
    }

    return (
        <NavLink className="item-list__item-card item" to={`/productcard/${props.product.id}`}>
            <div className="item-pic">
                <img className={`item-pic-${props.product.num}`} src={props.product.images[0]} style={{ maxWidth: '283px', maxHeight: '247px'}} alt=""/>
                <HeartIcon id={props.product.id} inFavorites={props.inFavorites} />
                <div className="arrow arrow_left"></div>
                <div className="arrow arrow_right"></div>
            </div>
            <div className="item-desc">
                <h4 className="item-name">{props.product.title}</h4>
                <p className="item-producer">Производитель: <span className="producer">{props.product.brand}</span></p>
                <p className="item-price">{props.product.price}</p>
                <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    {props.product.sizes && 
                    <p className="sizes__avalible">{props.product.sizes.filter(size => size.available).map(size => size.size).join(', ')}</p>}
                </div>
            </div>
        </NavLink>
    )
}