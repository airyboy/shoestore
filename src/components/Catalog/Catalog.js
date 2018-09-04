import React from 'react';
import "../../css/style-order.css";
import "../../css/style-catalogue.css";
import "../../css/style-favorite.css";
import { NavLink } from 'react-router-dom';
import Storage from "../../storage";
import { width } from 'window-size';
import Sidebar from './Sidebar';
import Pager from "../Shared/Pager"
import ItemCard from "../Shared/ItemCard"

export default class Catalog extends React.Component {
    constructor(props) {
        super(props)
        
        const favoriteIds = Storage.getFavoriteIds()

        this.state = {
            favoriteIds: favoriteIds,
            categories: [],
            numOfGoodsInCategory: 10,
            currentCategory: null,
            products: [],
            totalPages: 1,
            filters: {
                categoryId: +this.props.match.params.categoryId,
                page: +this.props.match.params.page,
                type: null,
                color: null,
                size: null,
                heelSize: null,
                reason: null,
                season: null,
                minPrice: 100,
                maxPrice: 100000,
                discounted: null,
                sortBy: 'price'
            }
        }
    }

    componentDidMount() {
        fetch('https://neto-api.herokuapp.com/bosa-noga/categories')        
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            this.setState(prevState => ({
                categories: json.data, 
                currentCategory: json.data.find(c => c.id === prevState.filters.categoryId)
            }))
        })

        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.page !== prevProps.match.params.page) {
            const newPage = +(this.props.match.params.page || 1)
            this.setState(prevState => {
                const newFilters = Object.assign({}, prevState.filters)
                newFilters.page = newPage

                return { filters: newFilters}
            }, () => this.fetchData())
        }

        if (this.props.match.params.categoryId !== prevProps.match.params.categoryId) {
            const newPage = 1
            this.setState(prevState => {
                const newFilters = Object.assign({}, prevState.filters)
                newFilters.page = newPage
                newFilters.categoryId = this.props.match.params.categoryId

                return { filters: newFilters, currentCategory: prevState.categories.find(c => c.id === +this.props.match.params.categoryId)}
            }, () => this.fetchData())
        }
    }

    onFilterChange = (key, val) => {
        this.setState(prevState => {
            const prevValue = prevState.filters[key]

            let newFilters = Object.assign({}, prevState.filters)
            if (prevValue !== val) {
                newFilters[key] = val
            } else {
                newFilters[key] = null
            }

            return { filters: newFilters}
        }, this.fetchData)
    }

    fetchData = () => {
        const searchStringArr = []
        for (let key of Object.keys(this.state.filters)) {
            const val = this.state.filters[key]
            if (val !== null) {
                searchStringArr.push([key, val])
            }
        }

        const searchStr = searchStringArr.map(a => `${a[0]}=${encodeURIComponent(a[1])}`).join('&')
        const url = `https://neto-api.herokuapp.com/bosa-noga/products?${searchStr}`

        fetch(url)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            const products = json.data

            products.forEach((p, i) => {p.num = i + 1})

            this.setState({
                products: json.data, 
                numOfGoodsInCategory: json.goods,
                totalPages: json.pages
            })
        })

        console.log(url)

    }

    handleSorting = (e) => {
        const sortBy = e.target.value

        this.setState(prevState => {
            let newFilters = Object.assign({}, prevState.filters)
            newFilters.sortBy = sortBy
            newFilters.page = 1

            return {filters: newFilters}
        }, () => this.fetchData())
    }

    handleFavoriteToggle = (id) => {
        console.log(this.state.favoriteIds)
        let newFavs

        if (this.state.favoriteIds.find(f => f === id)) {
            console.log('unfav', id)
            newFavs = Storage.removeFromFavorites(id)
        } else {
            console.log('fav', id)
            newFavs = Storage.addToFavorites(id)
        }

        this.setState({favoriteIds: newFavs}, () => console.log(this.state.favoriteIds))
    }

    render() {
        return (
            <div>
                {this.state.currentCategory &&
                <div className="site-path">
                    <ul className="site-path__items">
                        <li className="site-path__item"><NavLink to="/">Главная</NavLink></li>
                        <li className="site-path__item"><NavLink to={`/catalog/${this.state.currentCategory.id}/page/1`}>{this.state.currentCategory.title}</NavLink></li>
                    </ul>
                </div>}
                <main className="product-catalogue">
                    <Sidebar filters={this.state.filters} onFilterChange={this.onFilterChange}/>
                    <section className="product-catalogue-content">
                        {/* <!-- Голова каталога с названием раздела и сортировкой --> */}
                        <section className="product-catalogue__head">
                            <div className="product-catalogue__section-title">
                                <h2 className="section-name">{this.state.currentCategory && this.state.currentCategory.title}</h2><span className="amount"> {this.state.numOfGoodsInCategory} товара</span>
                            </div>
                            <div className="product-catalogue__sort-by">
                                <p className="sort-by">Сортировать</p>
                                <select name="" id="sorting" value={this.state.filters.sortBy} onChange={this.handleSorting}>
                                    <option value="popularity">по популярности</option>
                                    <option value="price">по цене</option>
                                </select>
                            </div>
                        </section>
                        {/* <!-- Список товаров каталога --> */}
                        <section className="product-catalogue__item-list">
                        {/* <!-- Товары --> */}
                            {this.state.products.map(product => 
                                <ItemCard 
                                    key={`${product.id}`} 
                                    product={product} 
                                    onToggleFavorite={id => this.handleFavoriteToggle(id)} 
                                    inFavorites={this.state.favoriteIds.findIndex(a => a === product.id) > -1} />) }
                        </section>
                        {/* <!-- Пагинация под каталогом --> */}
                        <Pager to={`/catalog/${this.state.filters.categoryId}/page/`} currentPage={this.state.filters.page} totalPages={this.state.totalPages} />
                    </section>
                </main>
            </div>)
    }
}