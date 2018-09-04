import React from 'react';

import BasketItem from "./BasketItem"
import OrderDetailsForm from "./OrderDetailsForm"

import { getOrderTotal } from "../../utils"

export default function Order(props) {
    return (
        <div className="wrapper order-wrapper">
            <section className="order-process">
                <h2 className="order-process__title">Оформление заказа</h2>
                <div className="order-process__basket order-basket">
                    <div className="order-basket__title">в вашей корзине:</div>
                    <div className="order-basket__item-list">
                        {props.items.map(item => <BasketItem key={`${item.id} ${item.size}`} item={item} onChangeQuantity={val => props.onQuantityChange(item, val)} />)}
                        <div className="order-basket__summ">Итого:&nbsp;<span>{getOrderTotal(props.items)} <i className="fa fa-rub" aria-hidden="true"></i></span></div>
                    </div>
                </div>

                <OrderDetailsForm customerData={props.customerData} onSubmitOrder={props.onSubmitOrder} />
            </section>
        </div>
    )
}