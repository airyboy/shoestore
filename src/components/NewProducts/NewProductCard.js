import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NewProductCard(props) {
    const backgroundImageValue = `url(${props.imageUrl})`

    let productCardClass = ''
    switch(props.type) {
        case 'first':
            productCardClass = 'new-deals__product_first'
            break;
        case 'last':
            productCardClass = 'new-deals__product_last'
            break;
        case 'active':
            productCardClass = 'new-deals__product_active'
            break;
    }

    const handleFavoriteClick = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        props.onFavorite(props.id);
    }

    return (
        <NavLink to={'/productcard/' + props.id}>
            <div className={'new-deals__product ' + productCardClass} style={{backgroundImage: backgroundImageValue, backgroundSize: 'contain' }}>
                
                {props.type === 'active' && 
                    <div className={props.isFavorite ? 'new-deals__product_favorite_chosen' : 'new-deals__product_favorite'} 
                    onClick={handleFavoriteClick}></div>}
            </div>        
        </NavLink>
    )
}