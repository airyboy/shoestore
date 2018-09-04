import React from 'react';

export default function MainPic(props) {
    return (
        <div className="main-screen__favourite-product-pic">
            <a href="#">
                <img src={props.image} alt="" style={{maxWidth: '500px', maxHeight: '440px', minWidth: '400px', minHeight: '400px'}}/>
            </a>
            <a href="#" className="main-screen__favourite-product-pic__zoom"></a>
        </div>
    )
}