import React from 'react';

import '../../css/style-order.css';
import '../../css/style-product-card.css';
import Storage from "../../storage";
import { NavLink } from 'react-router-dom';
import { shiftBy } from "../../utils"
import MainPic from "./MainPic"
import PicsSlider from "./PicsSlider"
import Sizes from "./Sizes"
import BreadCrumbs from "./BreadCrumbs"
import QuantitySelector from "../Shared/QuantitySelector"
import ProductFeatures from "./ProductFeatures"
import Visited from "./Visited"
import SimilarGoods from "./SimilarGoods"


export default class ProductCard extends React.Component {
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

    handleAddToBasketClick = () => {
        if (this.state.chosenSize) {
            const basketItem = {
                id: this.state.product.id,
                title: this.state.product.title,
                image: this.state.product.images[0],
                price: this.state.product.price,
                brand: this.state.product.brand,
                color: this.state.product.color,
                quantity: this.state.quantity,
                size: this.state.chosenSize
            }

            this.props.onAddToBasket(basketItem)
        }
    }

    render() {
	return (
        <div>
           <BreadCrumbs product={this.state.product} categories={this.state.categories} />

            {this.state.product !== null &&
            <main className="product-card">
                <section className="product-card-content">
                    <h2 className="section-name">{this.state.product.title}</h2>
                    <section className="product-card-content__main-screen">	
                        <PicsSlider images={this.state.product.images} />
                        <MainPic image={this.state.product.images[0]} />
        
                        <div className="main-screen__product-info">
                            <div className="product-info-title">
                                <h2>{this.state.product.title}</h2>

                                {this.state.product.sizes.some(size => size.available) &&
                                    <div className="in-stock">В наличии</div>}
                            </div>
                            
                            <ProductFeatures product={this.state.product} />
                            
                            <p className="size">Размер</p>

                            <Sizes sizes={this.state.product.sizes} chosenSize={this.state.chosenSize} onSizeChange={size => this.setState({chosenSize: size})} />
                            <div className="size-wrapper">
                                <a href="#">
                                    <span className="size-rule"></span>
                                    <p className="size-table">Таблица размеров</p>
                                </a>
                            </div>
                            <a href="#" className="in-favourites-wrapper">
                                <div className="favourite" href="#"></div>
                                <p className="in-favourites">В избранное</p>
                            </a>
                            <QuantitySelector quantity={this.state.quantity} onChangeQuantity={this.handleQuantityChange} />
                            <div className="price">{this.state.product.price} ₽</div>
                            <button className="in-basket in-basket-click" onClick={this.handleAddToBasketClick}>В корзину</button>
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