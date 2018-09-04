import React from 'react';
import { paymentMethods as options } from "../../payment_methods"

export default function OrderPaymentOptions(props) {
    // const options = [
    //     {val: 'card-online', title: 'Картой онлайн'},
    //     {val: 'card-courier', title: 'Картой курьеру'},
    //     {val: 'cash', title: 'Наличными курьеру'}]

    return (
        <div className="order-process__paid">
            <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
            <div className="order-process__paid-form">
                {options.map(opt =>
                    <label key={opt.val} className="order-process__paid-label">
                        <input className="order-process__paid-radio" type="radio" name="paid"
                            checked={opt.val === props.paymentMethod} value={opt.val} onChange={() => props.onChangePaymentMethod(opt.val)} />
                        <span className="order-process__paid-text">{opt.title}</span>
                    </label>)}
            </div>
        </div>
    )
}