import React from 'react';
import { NavLink } from 'react-router-dom';
import { encodeObject } from "../../utils"

export default function BreadCrumbs(props) {
    if (!props.product | !props.categories) return null;

    const category = props.categories.find(c => c.id === props.product.categoryId)

    const typeFilter = encodeObject({ type: props.product.type })

    return (
        <div className="site-path">
        <ul className="site-path__items">
            <li className="site-path__item"><NavLink to="/">Главная</NavLink></li>
            <li className="site-path__item"><NavLink to={`/catalog/${category.id}/page/1`}>{category.title}</NavLink></li>
            <li className="site-path__item"><NavLink to={`/catalog/filter/${typeFilter}/page/1`}>{props.product.type}</NavLink></li>
            <li className="site-path__item"><NavLink to={`/productcard/${props.product.id}`}>{props.product.title}</NavLink></li>
        </ul>
    </div>
    )
}