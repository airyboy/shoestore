import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BreadCrumbs(props) {
    if (!props.product | !props.categories) return null;

    const category = props.categories.find(c => c.id == props.product.categoryId)

    return (
        <div className="site-path">
        <ul className="site-path__items">
            <li className="site-path__item"><NavLink to="/">Главная</NavLink></li>
            <li className="site-path__item"><NavLink to={`/catalog/${category.id}/page/1`}>{category.title}</NavLink></li>
            <li className="site-path__item"><a href="#">{props.product.type}</a></li>
            <li className="site-path__item"><NavLink to={`/productcard/${props.product.id}`}>{props.product.title}</NavLink></li>
        </ul>
    </div>
    )
}