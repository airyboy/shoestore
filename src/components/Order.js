import React from 'react';
//import ReactDOM from 'react-dom';
import '../css/style-order.css';
import OrderDone from './OrderDone.js';
import { NavLink } from 'react-router-dom';

import image from '../img/catalogue-pics/product-catalogue__item-1.png';

const Order = () => {
  return (
    <div className="wrapper order-wrapper">                  
        <div className="site-path">
          <ul className="site-path__items">
            <li className="site-path__item"><a href="index.html">Главная</a></li>
            <li className="site-path__item"><a href="#">Корзина</a></li>
            <li className="site-path__item"><a href="#">Оформление заказа</a></li>
          </ul>
        </div>
        <section className="order-process">
          <h2 className="order-process__title">Оформление заказа</h2>
          <div className="order-process__basket order-basket">
            <div className="order-basket__title">в вашей корзине:</div>
            <div className="order-basket__item-list">
              <div className="basket-item">
                <NavLink to="/productcard">
                <div className="basket-item__pic"><img src={image} alt="product_1"/></div>
                </NavLink>
                <div className="basket-item__product">
                  <div className="basket-item__product-name"><NavLink to="/productcard">Босоножки женские</NavLink></div>
                  <div className="basket-item__product-features">
                    <div className="basket-item__size">Размер: <span>37</span></div>
                    <div className="basket-item__producer">Производитель: <span>Albano</span></div>
                    <div className="basket-item__color">Цвет: <span>Черный</span></div>
                  </div>
                </div>
                <div className="basket-item__quantity">
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>1
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
                </div>
                <div className="basket-item__price">5 950 <i className="fa fa-rub" aria-hidden="true"></i></div>
              </div>
              <div className="basket-item">
              <NavLink to="/productcard">
                <div className="basket-item__pic"><img src={image} alt="product_1"/></div>
              </NavLink>
                <div className="basket-item__product">
                  <div className="basket-item__product-name"><NavLink to="/productcard">Босоножки женские</NavLink></div>
                  <div className="basket-item__product-features">
                    <div className="basket-item__size">Размер: <span>37</span></div>
                    <div className="basket-item__producer">Производитель: <span>Albano</span></div>
                    <div className="basket-item__color">Цвет: <span>Черный</span></div>
                  </div>
                </div>
                <div className="basket-item__quantity">
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>1
                  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
                </div>
                <div className="basket-item__price">5 950 <i className="fa fa-rub" aria-hidden="true"></i></div>
              </div>
            </div>
            <div className="order-basket__summ">Итого:&nbsp;<span>12 050 <i className="fa fa-rub" aria-hidden="true"></i></span></div>
          </div>
          <div className="order-process__confirmed">
            <form action="#">
              <div className="order-process__delivery">
                <h3 className="h3">кому и куда доставить?</h3>
                <div className="order-process__delivery-form">
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Имя</div>
                    <input className="order-process__delivery-input" type="text" name="delivery" placeholder="Представьтесь, пожалуйста"/>
                  </label>
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Телефон</div>
                    <input className="order-process__delivery-input" type="tel" name="delivery" placeholder="Номер в любом формате"/>
                  </label>
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Адрес</div>
                    <input className="order-process__delivery-input order-process__delivery-input_adress" type="text" name="delivery" placeholder="Ваша покупка будет доставлена по этому адресу"/>
                  </label>
                </div>
                <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
              </div>
              <div className="order-process__paid">
                <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
                <div className="order-process__paid-form">
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="card-online"/><span className="order-process__paid-text">Картой онлайн</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="card-courier" defaultChecked=""/><span className="order-process__paid-text">Картой курьеру</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="cash"/><span className="order-process__paid-text">Наличными курьеру</span>
                  </label>
                </div>
              </div>
              <NavLink to="/orderdone">
              <button className="order-process__form-submit order-process__form-submit_click">Подтвердить заказ</button>
              </NavLink>
            </form>
          </div>
        </section>
      </div>
  );

}

      
export default Order;