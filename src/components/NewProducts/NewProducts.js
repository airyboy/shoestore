import React from 'react';
import { NavLink } from 'react-router-dom';
import Storage from "../../storage.js";

import NewProductCard from "./NewProductCard"
import NewProductInfo from "./NewProductInfo"
import NewProductsMenu from "./NewProductsMenu"


export default class NewProducts extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            featured: [],
            categories: [],
            availableCategories: [],
            activeCategoryId: null,
            filteredProducts: [],
            favoriteProductIds: [],
            isLoaded: false
        }

        this.moveRight = this.moveRight.bind(this)
        this.moveLeft = this.moveLeft.bind(this)
        this.changeCategory = this.changeCategory.bind(this)
        this.handleFavorite = this.handleFavorite.bind(this)
    }

    componentDidMount() {
        const getFeatured = fetch(`https://neto-api.herokuapp.com/bosa-noga/featured`).then(res => res.json())
        const getCategories = fetch(`https://neto-api.herokuapp.com/bosa-noga/categories`).then(res => res.json())

        Promise.all([getCategories, getFeatured])
        .then((jsons) => {
            const categories = jsons[0].data
            const featured = jsons[1].data

            const availableCategories = featured.reduce((acc, cur) => {
                if (!acc.find(a => a.id === cur.categoryId)) {
                    acc.push({ id: cur.categoryId, name: categories.find(c => c.id === cur.categoryId).title })
                }
                return acc;
            }, [])

            const activeCategoryId = availableCategories[0].id

            this.setState({
                featured: featured,
                categories: categories,
                availableCategories: availableCategories,
                activeCategoryId: availableCategories[0].id,
                filteredProducts: featured.filter(a => a.categoryId === activeCategoryId),
                favoriteProductIds: Storage.getFavoriteIds(),
                isLoaded: true
            })       
        })
    }

    categoryLink(category, isActive) {
        return (
        <li class="new-deals__menu-item" key={category.id}>
            <a href="#">{category.name}</a>
        </li>)
    }

    moveLeft() {
        this.setState(prevState => {
            const copy = [...prevState.filteredProducts]
            const first = copy.shift();
            copy.push(first);

            return { filteredProducts: copy }
        });
    }

    moveRight() {
        this.setState(prevState => {
            const copy = [...prevState.filteredProducts]
            const last = copy.pop();
            copy.unshift(last);

            return { filteredProducts: copy }
        });
    }

    changeCategory(id) {
        this.setState(prevState => ({
            activeCategoryId: id,
            filteredProducts: prevState.featured.filter(a => a.categoryId == id)
        }))
    }

    handleFavorite(id) {
        if (this.state.favoriteProductIds.find(a => a == id)) {
            const updated = Storage.removeFromFavorites(id)

            this.setState({
                favoriteProductIds: updated
            })
        } else {
            const updated = Storage.addToFavorites(id)

            this.setState({
                favoriteProductIds: updated
            })
        }
    }

    render() {
        return (
        this.state.isLoaded && 
        <section className="new-deals wave-bottom">
            <h2 className="h2">Новинки</h2>
            <NewProductsMenu 
                categories={this.state.availableCategories} 
                onChangeActiveCategory={id => this.changeCategory(id)}
                aciveCategoryId={this.state.activeCategoryId} />

            <div className="new-deals__slider">
                <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={() => this.moveLeft()}></div>
                
                <NewProductCard imageUrl={this.state.filteredProducts[0].images[0]} type={'first'} id={this.state.filteredProducts[0].id} />

                <NewProductCard 
                    imageUrl={this.state.filteredProducts[1].images[0]} 
                    type={'active'} 
                    id={this.state.filteredProducts[1].id}
                    isFavorite={!!(this.state.favoriteProductIds.find(a => a == this.state.filteredProducts[1].id))}
                    onFavorite={this.handleFavorite} />

                <NewProductCard imageUrl={this.state.filteredProducts[2].images[0]} type={'last'} id={this.state.filteredProducts[2].id} />

                <div className="new-deals__arrow new-deals__arrow_right arrow"  onClick={() => this.moveRight()}></div>
            </div>

            <NewProductInfo product={this.state.filteredProducts[1]} />
        </section>
        )
    }
}