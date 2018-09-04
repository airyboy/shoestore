export default function NewProductInfo(props) {
    return (
        <div className="new-deals__product-info">
            <a href="product-card-desktop.html" className="h3">{props.product.title}</a>
            <p>Производитель:
                <span>{props.product.brand}</span>
            </p>
            <h3 className="h3">{props.product.price} ₽</h3>
        </div>        
    )
}