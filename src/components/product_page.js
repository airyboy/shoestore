import React from 'react';
//import ReactDOM from 'react-dom';
import '../css/style-order.css';
import '../css/style-product-card.css';
import Storage from "../storage.js";
import { NavLink } from 'react-router-dom';
import { shiftBy } from "../utils"

class ProductPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            productId: this.props.match.params.id,
            product: null,
            categories: null,
            categoryName: '',
            visited: Storage.getVisited(),
            shownVisited: Storage.getVisited().slice(0, 5),
            similar: [],
            shownSimilar: [],
            favoriteIds: Storage.getFavoriteIds(),
            chosenSize: null,
            quantity: 1
        }

        this.handleSimilarsShifting = this.handleSimilarsShifting.bind(this)
        this.handleVisitedShifting = this.handleVisitedShifting.bind(this)
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
    }

    componentDidMount() {
        fetch(`https://neto-api.herokuapp.com/bosa-noga/categories`)
        .then(resp => resp.json())
        .then(json => {
            this.setState({ categories: json.data })
        });

        fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${this.state.productId}`)
        .then(resp => resp.json())
        .then(json => {
            this.setState({ product: json.data })
            return json.data
        })
        .then(prod => this.loadSimilar(prod));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const copy = Object.assign({}, prevState.product)
            const modifiedVisited = Storage.addProductToVisited(copy)

            this.setState(prevState => {
                return {
                    visited: modifiedVisited,
                    shownVisited: modifiedVisited.slice(0, 5),
                    productId: this.props.match.params.id,
                    quantity: 1
                } 
            })

            fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(json => {
                this.setState({ product: json.data });

                return json.data;
            })
            .then(prod => this.loadSimilar(prod));
        }
    }

    componentWillUnmount() {
        const copy = Object.assign({}, this.state.product)
        Storage.addProductToVisited(copy)
    }

    loadSimilar(product) {
        return fetch(`https://neto-api.herokuapp.com/bosa-noga/products?type=${encodeURIComponent(product.type)}&color=${encodeURIComponent(product.color)}`)
        .then(resp => resp.json())
        .then(json => {
            this.setState(prevState => { 
                //exclude current product
                const similar = json.data.filter(a => a.id !== prevState.product.id)
                return {
                    similar: similar,
                    shownSimilar: similar.slice(0, 3)
                }
            })
        });
    }

    handleSimilarsShifting(step) {
        this.setState(prevState => {
            const shifted = shiftBy(prevState.similar, step)
            
            const shown = shifted.slice(0, 3)

            return { shownSimilar: shown, similar: shifted }
        })
    }

    handleVisitedShifting(step) {
        this.setState(prevState => {
            const shifted = shiftBy(prevState.visited, step)
            
            const shown = shifted.slice(0, 5)

            return { shownVisited: shown, visited: shifted }
        })
    }

    handleQuantityChange(val) {
        this.setState(prevState => {
            if ((prevState.quantity >= 1 && val > 0) || (prevState.quantity > 1 && val < 0)) {
                return {quantity: prevState.quantity + val}
            }
        })
    }

    render() {
	return (
        <div>

           <BreadCrumbs 
                product={this.state.product} 
                categories={this.state.categories} />

        {this.state.product !== null &&
        <main className="product-card">
            <section className="product-card-content">
                    <h2 className="section-name">{this.state.product.title}</h2>
                    <section className="product-card-content__main-screen">	
                        <PicsSlider images={this.state.product.images} />
                        <MainPic image={this.state.product.images[0]} />
        
                        <div className="main-screen__product-info">
                            <div className="product-info-title"><h2>{this.state.product.title}</h2><div className="in-stock">В наличии</div></div>
                            
                            <ProductFeatures product={this.state.product} />
                            
                            <p className="size">Размер</p>

                            <Sizes sizes={this.state.product.sizes} chosenSize={this.state.chosenSize} onSizeChange={size => this.setState({chosenSize: size})} />
                            <div className="size-wrapper">
                                <a href="#"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
                            </div>
                            <a href="#" className="in-favourites-wrapper">
                                <div className="favourite" href="#"></div>
                                <p className="in-favourites">В избранное</p>
                            </a>
                            <QuantitySelector quantity={this.state.quantity} onChangeQuantity={this.handleQuantityChange} />
                            <div className="price">{this.state.product.price} ₽</div>
                            <button className="in-basket in-basket-click">В корзину</button>
                        </div>
                    </section>

                    <Visited products={this.state.shownVisited} onMoveVisited={this.handleVisitedShifting} />

                    <SimilarGoods products={this.state.shownSimilar} onMoveSimilar={this.handleSimilarsShifting} />
            </section>
        </main>}
    </div>
    );
}
}

function QuantitySelector(props) {
    return (
    <div className="basket-item__quantity">
        <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick={() => props.onChangeQuantity(-1)}>-</div>
            {props.quantity}
        <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick={() => props.onChangeQuantity(1)}>+</div>
    </div>        
    )
}

function Sizes(props) {
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

function PicsSlider(props) {
    return (
        <section className="main-screen__favourite-product-slider">
            <div className="favourite-product-slider">
                <div className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>
                {props.images.map((image, i) => 
                    <div key={i} 
                        className={`favourite-product-slider__item favourite-product-slider__item-${i + 1}`} 
                        style={{backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundPosition: 'center, center'}}>
                    </div>
                )}
                <div className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>
            </div>
        </section>
    )
}

function MainPic(props) {
    return (
        <div className="main-screen__favourite-product-pic">
            <a href="#">
                <img src={props.image} alt="" style={{maxWidth: '500px', maxHeight: '440px', minWidth: '400px', minHeight: '400px'}}/>
            </a>
            <a href="#" className="main-screen__favourite-product-pic__zoom"></a>
        </div>
    )
}

function BreadCrumbs(props) {
    if (!props.product | !props.categories) return null;

    const categoryName = props.categories.find(c => c.id == props.product.categoryId).title

    return (
        <div className="site-path">
        <ul className="site-path__items">
            <li className="site-path__item"><NavLink to="/">Главная</NavLink></li>
            <li className="site-path__item"><a href="#">{categoryName}</a></li>
            <li className="site-path__item"><a href="#">{props.product.type}</a></li>
            <li className="site-path__item">{props.product.title}</li>
        </ul>
    </div>
    )
}

function ProductFeatures(props) {
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
                <td className="right-col"><a href="#"><span className="producer">{props.product.brand}</span></a></td>
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

function Visited(props) {
    if (!props.products || props.products.length < 1) return null;

    const shiftLeft = e => {
        e.preventDefault()
        props.onMoveVisited(-1)
    }

    const shiftRight = e => {
        e.preventDefault()
        props.onMoveVisited(1)
    }

    return (
        <section className="product-card__overlooked-slider">
            <h3>Вы смотрели:</h3>
            <div className="overlooked-slider">
                <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" onClick={shiftLeft}></div>

                {props.products.map((product, i) => 
                    <div key={product.id} 
                        className={`overlooked-slider__item overlooked-slider__item-${i + 1}`} 
                        style={{ backgroundImage: `url(${product.images[0]})`}}>
                        <NavLink to={`/productcard/${product.id}`}/>
                    </div>            
                )}
                <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow" onClick={shiftRight}></div>
            </div>
        </section>
    )    
} 

function SimilarGoods(props) {
    if (props.products.length < 1) return null;

    const shiftLeft = e => {
        e.preventDefault()
        props.onMoveSimilar(-1)
    }

    const shiftRight = e => {
        e.preventDefault()
        props.onMoveSimilar(1)
    }

    return (
        <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow" onClick={shiftLeft}></div>
            {props.products.map((prod, i) =>
                <div key={prod.id} className="similar-products-slider__item-list__item-card item">
                    <div className="similar-products-slider__item">
                        <NavLink to={`/productcard/${prod.id}`}>
                            <img src={prod.images[0]} className={`similar-products-slider__item-pic-${i + 1}`} alt={prod.title}
                                style={{maxWidth: '300px', maxHeight: '200px'}} />
                        </NavLink>
                    </div>
                    <div className="similar-products-slider__item-desc">
                        <h4 className="similar-products-slider__item-name">{prod.title}</h4>
                        <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{prod.brand}</span></p>
                        <p className="similar-products-slider__item-price">{prod.price}</p>
                    </div>    
                </div>
            )}
          <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"  onClick={shiftRight}></div>
        </div>
      </section>
    )
} 

export default ProductPage;  