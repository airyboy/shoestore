import React from 'react';
import { NavLink } from 'react-router-dom';
import { getOrderTotal } from "../../utils"
import { paymentMethods } from "../../payment_methods"
import { withRouter } from 'react-router-dom';

export default function OrderDone(props) {
    const paymentMethod = paymentMethods.find(m => m.val == props.customerData.paymentMethod)

    const ContinueButton = withRouter(({  history }) =>  <button className="order-done__continue" onClick={() => history.push('/')}>продолжить покупки</button>)

    return (
        <div className="wrapper order-wrapper">
            <div className="site-path">
                <ul className="site-path__items">
                    <li className="site-path__item"><a href="index.html">Главная</a></li>
                    <li className="site-path__item"><a href="#">Корзина</a></li>
                    <li className="site-path__item"><a href="order.html">Оформление заказа</a></li>
                    <li className="site-path__item"><a href="#">Заказ принят</a></li>
                </ul>
            </div>
            <section className="order-done">
                <h2 className="order-done__title order-process__title">Заказ принят, спасибо!</h2>
                <div className="order-done__information order-info">
                    <div className="order-info__item order-info__item_summ">
                        <h3>Сумма заказа:</h3>
                        <p>{props.total} &nbsp;<i className="fa fa-rub" aria-hidden="true"></i></p>
                    </div>
                    <div className="order-info__item order-info__item_pay-form">
                        <h3>Способ оплаты:</h3>
                        <p>{paymentMethod.title}</p>
                    </div>
                    <div className="order-info__item order-info__item_customer-name">
                        <h3>Имя клиента:</h3>
                        <p>{props.customerData.customerName}</p>
                    </div>
                    <div className="order-info__item order-info__item_adress">
                        <h3>Адрес доставки:</h3>
                        <p>{props.customerData.customerAddress}</p>
                    </div>
                    <div className="order-info__item order-info__item_phone">
                        <h3>Телефон:</h3>
                        <p>{props.customerData.phoneNumber}</p>
                    </div>
                </div>
                <p className="order-done__notice">Данные о заказе отправлены на адрес <span>notbosaanymore@gmail.com.  </span></p>
                <ContinueButton />
            </section>
        </div>        
    )
}

