import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import TopMenu from './TopMenu';
import ProfilePanel from './ProfilePanel';
import BasketPanel from './BasketPanel';

import logo from "../../img/header-logo.png"

import { encodeObject } from '../../utils'
import { resetFilter } from "../../reset_filter"
import QuickFiltersMenu from './QuickFiltersMenu';

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            basketPanelVisible: false,
            profilePanelVisible: false,
            searchFormVisible: false,
            searchString: '',
            categories: [],
            currentCategoryId: null,
            quickFiltersShown: false
        }

        this.showProfile = this.showProfile.bind(this)
        this.showBasket = this.showBasket.bind(this)
    }

    componentDidMount() {
        fetch('https://neto-api.herokuapp.com/bosa-noga/categories')        
        .then(resp => resp.json())
        .then(json => {
            this.setState(prevState => ({
                categories: json.data
            }))
        })
    }

    showProfile() {
        this.setState(prevState => {
            const shown = prevState.profilePanelVisible

            return {
                basketPanelVisible: false,
                profilePanelVisible: !shown }
        })
    }

    showBasket() {
        this.setState(prevState => {
            const shown = prevState.basketPanelVisible

            return {
                basketPanelVisible: !shown,
                profilePanelVisible: false }
        })
    }

    toggleSearch = () => {
        this.setState(prevState => {
            return {
                searchFormVisible: !prevState.searchFormVisible
            }
        })
    }

    
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const searchFilter = Object.assign({}, resetFilter)
            searchFilter.search = this.state.searchString
            this.props.history.push(`/catalog/filter/${encodeObject(searchFilter)}/page/1`)
        }
    }

    handleCategoryMenuClick = (categoryId) => {
        this.setState(prevState => {
            const shown = prevState.currentCategoryId !== categoryId ? true : !prevState.quickFiltersShown;
            console.log(prevState.currentCategoryId, categoryId, shown)

            return {
                quickFiltersShown: shown,
                currentCategoryId: categoryId
            }
        });

    }

    render() {
        return (
            <header className="header">
                <TopMenu />
                <div className="header-main">
                    <div className="header-main__wrapper wrapper">
                        <div className="header-main__phone">
                            <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                            <p>Ежедневно: с 09-00 до 21-00</p>
                        </div>
                        <div className="header-main__logo">
                            <NavLink to="/">
                                <h1>
                                    <img src={logo} alt="logotype" />
                                </h1>
                            </NavLink>
                            <p>Обувь и аксессуары для всей семьи</p>
                        </div>
                        <div className="header-main__profile">
                            <div className="header-main__pics">
                                {/* Search */}
                                <div 
                                    className={'header-main__pic header-main__pic_search' + (this.state.searchFormVisible ? ' header-main__pic_search_is-hidden' : '')}
                                    onClick={this.toggleSearch}>
                                </div>
                                <div className="header-main__pic_border"></div>

                                {/* Profile */}
                                <div className="header-main__pic header-main__pic_profile" onClick={this.showProfile}>
                                    <div className={'header-main__pic_profile_menu' + (this.state.profilePanelVisible ? ' header-main__pic_profile_menu_is-active' : '')}></div>
                                </div>
                                <div className="header-main__pic_border"></div>

                                {/* Basket */}
                                <div className="header-main__pic header-main__pic_basket" onClick={this.showBasket}>
                                    <div className="header-main__pic_basket_full">1</div>
                                    <div className={'header-main__pic_basket_menu'  + (this.state.basketPanelVisible ? ' header-main__pic_basket_menu_is-active' : '')}></div>
                                </div>
                            </div>
                            <form className={'header-main__search' + (this.state.searchFormVisible ?  ' header-main__search_active' : '')} action="#">
                                <input placeholder="Поиск" onKeyPress={this.handleKeyPress} onChange={e => this.setState({searchString: e.target.value})} />
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </form>
                        </div>

                    </div>
                    <div className={'header-main__hidden-panel hidden-panel' 
                        + (this.state.basketPanelVisible || this.state.profilePanelVisible ? ' header-main__hidden-panel_visible' : '')}>
                        <ProfilePanel visible={this.state.profilePanelVisible} />
                        <BasketPanel visible={this.state.basketPanelVisible} 
                            items={this.props.basketItems} 
                            onProceedOrder={this.showBasket} 
                            onRemoveItem={this.props.onRemoveFromBasket}/>
                    </div>
                </div>
                <nav className="main-menu">
                    <div className="wrapper">
                        <ul className="main-menu__items">
                            {this.state.categories && this.state.categories.map(category => 
                                <li key={category.id} 
                                    onClick={() => this.handleCategoryMenuClick(category.id)}
                                    className={'main-menu__item' + (category.id === this.state.currentCategoryId ? ' main-menu__item_active' : '')}>
                                    <a>{category.title}</a>
                                    {/* <NavLink to={`/catalog/${category.id}/page/1`}></NavLink> */}
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
                <QuickFiltersMenu 
                    categoryId={this.state.currentCategoryId} 
                    visible={this.state.quickFiltersShown} 
                    onHidePanel={() => this.setState({quickFiltersShown: false})}/>
            </header>

        )
    }
}

export default withRouter(Header);