import React from 'react';
import { NavLink } from 'react-router-dom';

import QuantitySelector from '../Shared/QuantitySelector';

export default function BasketItem(props) {
    return (
        <div className="basket-item">
            <div className="basket-item__pic"><img src={props.item.image} alt="product_1" /></div>
            <div className="basket-item__product">
                <div className="basket-item__product-name"><NavLink to={`/productcard/${props.item.id}`}>{props.item.title}</NavLink></div>
                <div className="basket-item__product-features">
                    <div className="basket-item__size">Размер: <span>{props.item.size}</span></div>
                    <div className="basket-item__producer">Производитель: <span>{props.item.brand}</span></div>
                    <div className="basket-item__color">Цвет: <span>{props.item.color}</span></div>
                </div>
            </div>
            <QuantitySelector quantity={props.item.quantity} onChangeQuantity={quantity => props.onChangeQuantity(quantity)} />
            <div className="basket-item__price">{props.item.price} <i className="fa fa-rub" aria-hidden="true"></i></div>
        </div>)
}