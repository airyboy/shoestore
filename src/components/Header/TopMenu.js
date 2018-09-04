import React from 'react';

export default function TopMenu(props) {
    return (
        <div className="top-menu">
            <div className="wrapper">
                <ul className="top-menu__items">
                    <li className="top-menu__item"><a href="#">Возврат</a></li>
                    <li className="top-menu__item"><a href="#">Доставка и оплата</a></li>
                    <li className="top-menu__item"><a href="#">О магазине</a></li>
                    <li className="top-menu__item"><a href="#">Контакты</a></li>
                    <li className="top-menu__item"><a href="#">Новости</a></li>
                </ul>
            </div>
        </div>
    )
}