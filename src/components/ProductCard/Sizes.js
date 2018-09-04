import React from 'react';

export default function Sizes(props) {
    const handleSizeClick = (e, size) => {
        e.preventDefault()
        props.onSizeChange(size)
    }

    return (
        <ul className="sizes">
            {props.sizes.map(size =>
                <li key={size.size} className={size.size === props.chosenSize ? 'active' : ''}>
                    {size.available ? <a href="#" onClick={e => handleSizeClick(e, size.size)}>{size.size}</a> : <span style={{color: '#ccc'}}>{size.size}</span> }
                </li>)}
        </ul>        
    )
}