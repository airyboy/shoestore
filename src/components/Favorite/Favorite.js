import React from 'react';
import "../../css/style-order.css";
import "../../css/style-catalogue.css";
import "../../css/style-favorite.css";
import { NavLink } from 'react-router-dom';
import Storage from "../../storage";
import ItemCard from '../Shared/ItemCard';
import Pager from '../Shared/Pager';

import { title } from '../../title'

import { declensionOfNumber } from '../../utils'

export default class Favorite extends React.Component {
    constructor(props) {
        super(props)

        const favoriteIds = Storage.getFavoriteIds()

        this.state = {
            favoriteIds: favoriteIds,
            shownGoods: [],
            goods: [],
            currentPage: +(this.props.match.params.page || 1),
            totalPages: Math.ceil(favoriteIds.length / 12),
            sortBy: 'price'
        }

        this.removeFromFavorite = this.removeFromFavorite.bind(this)
        this.handleSorting = this.handleSorting.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.page !== prevProps.match.params.page) {
            const newPage = +(this.props.match.params.page || 1)
            this.setState(prevState => ({
                currentPage: newPage,
                shownGoods: this.getShownGoods(prevState.goods, newPage)
            }))
        }
    }

    componentDidMount() {
        document.title = title + ' - Избранное'

        const tasks = this.state.favoriteIds
            .map(id => fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${id}`)
            .then(resp => resp.json()));

        Promise.all(tasks)
        .then(jsons => {
            const favs = [];

            favs.push(...jsons.map(json => json.data))

            favs.sort((a, b) => a.price - b.price)

            this.setState({ 
                goods: favs,
                shownGoods: this.getShownGoods(favs, this.state.currentPage)
            })
        })
    }

    getShownGoods(allGoods, page) {
        const shownGoods = allGoods.slice((page - 1) * 12, page * 12 - 1);

        console.log('shown goods', shownGoods)

        //enumerate items, 'cause css uses it
        shownGoods.forEach((g, i) => g.num = i + 1);

        return shownGoods;
    }

    removeFromFavorite(id) {
        Storage.removeFromFavorites(id)

        this.setState(prevState => 
        {
            const modified = prevState.goods.filter(a => a.id !== id)

            return {
                goods: modified,
                shownGoods: this.getShownGoods(modified, this.state.currentPage)
        }})
    }

    handleSorting(e) {
        const sortBy = e.target.value;

        this.setState(prevState => {
            const favs = [...prevState.goods];

            if (sortBy === 'price') {
                favs.sort((a, b) => a.price - b.price)
            } else if (sortBy === 'popularity') {
                favs.sort((a, b) => a.popularity - b.popularity)
            }

            this.props.history.push('/favourite')

            return {
                goods: favs,
                shownGoods: this.getShownGoods(favs, 1),
                sortBy: sortBy
            }
        })
    }

    render() {
        return (
            <div className="wrapper wrapper_favorite">
                <div className="site-path">
                    <ul className="site-path__items">
                        <li className="site-path__item"><NavLink to='/'>Главная</NavLink></li>
                        <li className="site-path__item"><NavLink to='/favourite'>Избранное</NavLink></li>
                    </ul>
                </div>
                <main className="product-catalogue product-catalogue_favorite">
                    <section className="product-catalogue__head product-catalogue__head_favorite">
                        <div className="product-catalogue__section-title">
                            <h2 className="section-name">В вашем избранном</h2>
                            <span className="amount amount_favorite">{this.state.goods.length} {declensionOfNumber(this.state.goods.length, ['товар', 'товара', 'товаров'])}</span>
                        </div>
                        <div className="product-catalogue__sort-by">
                            <p className="sort-by">Сортировать</p>
                            <select id="sorting" value={this.state.sortBy} onChange={this.handleSorting}>
                                <option value="price">по цене</option>
                                <option value="popularity">по популярности</option>
                            </select>
                        </div>
                    </section>
                    <section className="product-catalogue__item-list product-catalogue__item-list_favorite">
                        {this.state.shownGoods.map(prod => 
                            <ItemCard product={prod} key={prod.id} onToggleFavorite={this.removeFromFavorite} />)}
                    </section>
                    <Pager totalPages={this.state.totalPages} currentPage={this.state.currentPage} to='/favourite/' />
                </main>
            </div>);
    }
}