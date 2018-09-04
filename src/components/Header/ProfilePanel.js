import React from 'react';
import { NavLink } from 'react-router-dom';

import "../../css/font-awesome.min.css"

export default function ProfilePanel(props) {
    if (!props.visible) return null;

    return (
        <div className="hidden-panel__profile hidden-panel__profile_visible">
            <a href="#">Личный кабинет</a>
            <NavLink to="/favourite">
                <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное
            </NavLink>
            <a href="#">Выйти</a>
        </div>
    )
}

