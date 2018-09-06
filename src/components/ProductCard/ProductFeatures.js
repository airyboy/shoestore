import React from 'react';

export default function ProductFeatures(props) {
    return (
        <div className="product-features">
        <table className="features-table">
        <tbody>
            <tr>
                <td className="left-col">Артикул:</td>
                <td className="right-col">{props.product.sku}</td>
            </tr>
                <tr>
                <td className="left-col">Производитель:</td>
                <td className="right-col"><span className="producer">{props.product.brand}</span></td>
            </tr>
                <tr>
                <td className="left-col">Цвет:</td>
                <td className="right-col">{props.product.color}</td>
            </tr>
                <tr>
                <td className="left-col">Материалы:</td>
                <td className="right-col">{props.product.material}</td>
            </tr>
                <tr>
                <td className="left-col">Сезон:</td>
                <td className="right-col">{props.product.season}</td>
            </tr>
                <tr>
                <td className="left-col">Повод:</td>
                <td className="right-col">{props.product.reason}</td>
            </tr>
        </tbody>
        </table>
    </div>
    )
}