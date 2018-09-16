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
import { resetFilter } from "../../reset_filter"
import { title } from '../../title'

import { declensionOfNumber } from '../../utils'



export default class Catalog extends React.Component {
    constructor(props) {
        super(props)
        
        const favoriteIds = Storage.getFavoriteIds()

        const categoryId = this.props.match.params.categoryId ? +this.props.match.params.categoryId : null
        const page = this.props.match.params.page ? +this.props.match.params.page : 1

        console.log(this.props.match)

        this.state = {
            favoriteIds: favoriteIds,
            categories: [],
            numOfGoodsInCategory: null,
            currentCategory: null,
            products: [],
            totalPages: 1,
            filters: {
                categoryId: categoryId,
                page: page,
                search: null,
                type: null,
                color: null,
                size: null,
                heelSize: null,
                reason: null,
                season: null,
                minPrice: 0,
                maxPrice: 50000,
                discounted: null,
                sortBy: 'price'
            }
        }

        if (this.props.match.params.filter) {
            const filterFromUrl = this.decodeFilter(this.props.match.params.filter)

            for(let key of Object.keys(filterFromUrl)) {
                this.state.filters[key] = filterFromUrl[key]
            }
        }
    }

    componentDidMount() {
        document.title = title + ' - Каталог'

        fetch('https://neto-api.herokuapp.com/bosa-noga/categories')        
        .then(resp => resp.json())
        .then(json => {
            this.setState({
                categories: json.data, 
                currentCategory: json.data.find(c => c.id === parseInt(this.state.filters.categoryId))
            });
        });

        this.fetchData();
    }

    scrollCurrentFiltersIntoView = () => {
        ['.sidebar__color', '.sidebar__brand ul', '.sidebar__catalogue-list'].forEach(selector => {
            const element = document.querySelector(`${selector} .active`);
            if (element && element.offsetParent === null) {
                const offsetTop = element.offsetTop;
                const parentTop = element.parentElement.getBoundingClientRect().top;
                element.parentElement.scrollTop = offsetTop - parentTop - 5;
            }
        })
    }

    componentDidUpdate(prevProps) {
        console.log(this.props.match)
        if (this.props.match.params.filter !== undefined && this.props.match.params.filter !== prevProps.match.params.filter) {
            this.setState(prevState => {
                const newFilters = this.decodeFilter(this.props.match.params.filter)
                console.log('catalog', 'filter in url changed', 'filters', newFilters)
                newFilters.page = parseInt(this.props.match.params.page)
                

                return { 
                    filters: newFilters, 
                    currentCategory: prevState.categories.find(c => c.id === parseInt(newFilters.categoryId))}
            }, () => { 
                this.fetchData();
                
                setTimeout(() => this.scrollCurrentFiltersIntoView(), 500);

            })
            return
        }

        if (this.props.match.params.page !== prevProps.match.params.page) {
            console.log('catalog', 'page in url changed')
            const newPage = +(this.props.match.params.page || 1)
            this.setState(prevState => {
                const newFilters = Object.assign({}, prevState.filters)
                newFilters.page = newPage

                return { filters: newFilters}
            }, () => this.fetchData())
        }

        if (this.props.match.params.categoryId !== prevProps.match.params.categoryId) {
            console.log('catalog', 'categoryId in url changed')
            this.setState(prevState => {
                const newFilters = Object.assign({}, prevState.filters)
                newFilters.page = 1
                newFilters.categoryId = this.props.match.params.categoryId
                newFilters.search = null

                return { filters: newFilters, currentCategory: prevState.categories.find(c => c.id === +this.props.match.params.categoryId)}
            }, () => this.fetchData())
        }
    }

    onResetFilter = () => {
        this.props.history.push(`/catalog/filter/${this.encodeFilter(resetFilter)}/page/1`)
    }

    onFilterChange = (key, val) => {
        this.setState(prevState => {
            const prevValue = prevState.filters[key]

            let newFilters = Object.assign({}, prevState.filters)

            if (key === 'size' || key === 'heelSize') {
                const sizeFilter = prevValue || ''
                const splitted = sizeFilter.split(',').filter(a => a!== '').map(a => parseInt(a))
                if (splitted.findIndex(a => a === val) > -1) {
                    newFilters[key] = splitted.filter(a => a !== val).join(',')
                } else {
                    splitted.push(val)
                    newFilters[key] = splitted.join(',')
                }

            } else {
                if (prevValue !== val) {
                    newFilters[key] = val
                } else {
                    newFilters[key] = null
                }
            }

            newFilters.page = 1 

            return { filters: newFilters}
        }, () => {
            this.props.history.push(`/catalog/filter/${this.encodeFilter()}/page/${this.state.filters.page}`);
        })
    }

    encodeFilter = (filter) => {
        const filterToHandle = filter === undefined ? this.state.filters : filter;

        const copy = Object.assign({}, filterToHandle)
        delete copy.page
        const str = JSON.stringify(copy)
        const base64 = btoa(encodeURIComponent(str))

        return base64
    }

    decodeFilter = () => {
        const str = atob(this.props.match.params.filter)
        const filterFromUrl = JSON.parse( decodeURIComponent(str))

        return filterFromUrl
    }

    fetchData = () => {
        const searchStringArr = []
        for (let key of Object.keys(this.state.filters)) {
            const val = this.state.filters[key]
            if (val !== null & val !== '') {
                if (key === 'size' | key === 'heelSize') {
                    const vals = val.split(',')
                                    .filter(a => a !== '')
                                    .forEach(a => {
                                        searchStringArr.push([`${key}[]`, a])
                    })
                } else {
                    searchStringArr.push([key, val])
                }
                
            }
        }

        const searchStr = searchStringArr.map(a => `${a[0]}=${encodeURIComponent(a[1])}`).join('&')
        const url = `https://neto-api.herokuapp.com/bosa-noga/products?${searchStr}`

        fetch(url)
        .then(resp => resp.json())
        .then(json => {
            const products = json.data

            products.forEach((p, i) => {p.num = i + 1})

            this.setState({
                products: json.data, 
                numOfGoodsInCategory: json.goods,
                totalPages: json.pages
            }, () => setTimeout(() => this.scrollCurrentFiltersIntoView(), 500))
        })

    }

    handleSorting = (e) => {
        const sortBy = e.target.value

        this.setState(prevState => {
            let newFilters = Object.assign({}, prevState.filters)
            newFilters.sortBy = sortBy
            newFilters.page = 1

            return {filters: newFilters}
        }, () => { this.props.history.push(`/catalog/filter/${this.encodeFilter()}/page/${this.state.filters.page}`)})
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

    getHeader = () => {
        if (this.state.filters.search) {
            return 'результаты поиска';
        }

        if (this.state.currentCategory) {
            return this.state.currentCategory.title;
        } else {
            return 'все товары';
        }
    }

    getCurrentBreadCrumb = () => {
        if (this.state.filters.search) {
            return {title: 'Результаты поиска', url: this.props.location};
        }

        if (this.state.currentCategory) {
            return {title: this.state.currentCategory.title, url: `/catalog/${this.state.currentCategory.id}/page/1`};
        } else {
            return {title: 'Все товары', url: this.props.location};
        }
    }

    render() {
        return (
            <div>
                <div className="site-path">
                    <ul className="site-path__items">
                        <li className="site-path__item">
                            <NavLink to="/">Главная</NavLink>
                        </li>
                        <li className="site-path__item">
                            <NavLink to={this.getCurrentBreadCrumb().url}>{this.getCurrentBreadCrumb().title}</NavLink>
                        </li>
                    </ul>
                </div>
                <main className="product-catalogue">
                    <Sidebar filters={this.state.filters} onFilterChange={this.onFilterChange} onResetFilter={this.onResetFilter} />
                    <section className="product-catalogue-content">
                        {/* <!-- Голова каталога с названием раздела и сортировкой --> */}
                        <section className="product-catalogue__head">
                            <div className="product-catalogue__section-title">
                                <h2 className="section-name">{this.getHeader()}</h2>
                                <span className="amount"> {this.state.numOfGoodsInCategory} {declensionOfNumber(this.state.numOfGoodsInCategory, ['товар', 'товара', 'товаров'])}</span>
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
                        <Pager to={`/catalog/filter/${this.encodeFilter()}/page/`} currentPage={this.state.filters.page} totalPages={this.state.totalPages} />
                    </section>
                </main>
            </div>)
    }
}