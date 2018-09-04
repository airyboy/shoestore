import React from 'react';

export default function QuantitySelector(props) {
    return (
    <div className="basket-item__quantity">
        <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick={() => props.onChangeQuantity(-1)}>-</div>
            {props.quantity}
        <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick={() => props.onChangeQuantity(1)}>+</div>
    </div>        
    )
}