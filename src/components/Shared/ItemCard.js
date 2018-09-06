import React from 'react';
import { NavLink } from 'react-router-dom';

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentImageIndex: 0
        }
    }

    onToggleFavorite = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onToggleFavorite(id);
    }

    onNextImage = (e, shift) => {
        e.preventDefault()
        const totalImages = this.props.product.images.length

        this.setState(prevState => {
            let i = prevState.currentImageIndex + shift
            if (i < 0) { i = totalImages - 1}
            else if (i > totalImages - 1) { i = 0 }

            return {
                currentImageIndex: i
            }
        })
    }

    render() {
        const HeartIcon = (props) => {
            if (props.inFavorites !== undefined) {
                // rendering for /catalog page
                return (
                    <div 
                        className={props.inFavorites ? 'product-catalogue__product_favorite-chosen' : 'product-catalogue__product_favorite'} 
                        onClick={e => this.onToggleFavorite(e, props.id)}>
                        <p></p>
                    </div>
                )
            } else {
                // rendering for /favourite page
                return (
                    <div className="product-catalogue__product_favorite" onClick={e => this.onToggleFavorite(e, props.id)}>
                        <p></p>
                    </div>                
                )
            }
        }

        return (
            <NavLink className="item-list__item-card item" to={`/productcard/${this.props.product.id}`}>
                <div className="item-pic">
                    <img className={`item-pic-${this.props.product.num}`} src={this.props.product.images[this.state.currentImageIndex]} style={{ maxWidth: '283px', maxHeight: '247px'}} alt=""/>
                    <HeartIcon id={this.props.product.id} inFavorites={this.props.inFavorites} />
                    <div className="arrow arrow_left" onClick={e => this.onNextImage(e, -1)}></div>
                    <div className="arrow arrow_right" onClick={e => this.onNextImage(e, 1)}></div>
                </div>
                <div className="item-desc">
                    <h4 className="item-name">{this.props.product.title}</h4>
                    <p className="item-producer">Производитель: <span className="producer">{this.props.product.brand}</span></p>
                    <p className="item-price">{this.props.product.price}</p>
                    {/* <div className="sizes">
                        <p className="sizes__title">Размеры в наличии:</p>
                        {this.props.product.sizes && 
                        <p className="sizes__avalible">{this.props.product.sizes.filter(size => size.available).map(size => size.size).join(', ')}</p>}
                    </div> */}
                </div>
            </NavLink>
        )
    }
}