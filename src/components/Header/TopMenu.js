import React from 'react';


export default function TopMenu(props) {
    const items = ['Возврат', 'Доставка и оплата', 'О магазине', 'Контакты', 'Новости',]
    return (
        <div className="top-menu">
            <div className="wrapper">
                <ul className="top-menu__items">
                    {items.map(item => (
                        <li key={item} className="top-menu__item"><a href="#" onClick={e => {e.preventDefault()}}>{item}</a></li>)
                    )}
                </ul>
            </div>
        </div>
    )
}