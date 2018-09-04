import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BasketPanelItem(props) {
    return (
        <div className="product-list__item">
            <a className="product-list__pic">
                <img src={props.item.image} style={{ maxWidth: 36, maxHeight: 36}} /> </a>
            <NavLink to={`/productcard/${props.item.id}`} className="product-list__product">{props.item.title} (размер {props.item.size})</NavLink>
            <div className="product-list__fill"></div>
            <div className="product-list__price">{props.item.price * props.item.quantity} &nbsp;<i className="fa fa-rub" aria-hidden="true"></i>
            </div>
            <div className="product-list__delete" onClick={() => props.onRemoveItem(props.item.id, props.item.size)}>
                <i className="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
    )
}