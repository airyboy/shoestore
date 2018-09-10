import React from 'react'

export default function MenuList(props) {
    return (
        <div className="dropped-menu__lists" style={{flex: props.columns || 1}}>
            <h3 className="dropped-menu__list-title">{props.title}</h3>
            <ul className="dropped-menu__list">
                {props.children}
            </ul>
        </div>
    )
}