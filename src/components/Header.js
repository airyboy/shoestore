import React from 'react';
import ReactDOM from 'react-dom';
import logo from "../img/header-logo.png";
import "../css/style-product-card.css";
import lady_shoes_1 from '../img/product-list__pic_1.jpg';
import MainPage from './MainPage';
import ProductCard from './ProductCard.js';
import Sections from './Sections.js';
import Catalogue from './Catalogue.js';
import {headerHiddenPanelProfileVisibility, headerHiddenPanelBasketVisibility, headerMainSearchVisibility, mainSubmenuVisibility} from '../js/script.js';

import {
    HashRouter as Router,
    Route, Link, NavLink, Switch
} from 'react-router-dom';

let category = {id: '', type: '', filt: '', filterValue: ''};
// let pass;

class Header extends React.Component {

  chooseCategory(event) {
    event.stopPropagation();
    switch(event.currentTarget.firstElementChild.innerText.toLowerCase()) {
      case 'женская обувь': 
      category['id'] = 13;
      category['type'] = 'женская обувь';
      break;
      case 'мужская обувь':
      category['id'] = 12;
      category['type'] = 'мужская обувь';
      break;
      case 'детская обувь': 
      category['id'] = 15;
      category['type']  = 'детская обувь';
      break;
      case 'обувь унисекс':
      category['id'] = 14;
      category['type'] = 'обувь унисекс' 
      break;
    }
    category['filt'] = '';
    category['filterValue'] = '';
  }

  chooseFilters(event) {
    switch(event.currentTarget.querySelector('.dropped-menu__list-title').innerText.toLowerCase()) {
      case 'повод:':
      category['filt'] = 'reason';
      break;
      case 'категории:':
      category['filt'] = 'type';
      break;
      case 'сезон:':
      category['filt'] = 'season';
      break;
      case 'бренды:':
      category['filt'] = 'brand';
      break;
    }
  }

  chooseFilterValue(event) {
    category['filterValue'] = event.currentTarget.firstElementChild.innerText;
  }

  componentDidMount() {
    let mainMenuItems = document.querySelectorAll('.main-menu__item');
    for (let item of mainMenuItems) {
        item.addEventListener('click', mainSubmenuVisibility);
        item.addEventListener('click', this.chooseCategory);
    }
    let secondaryItems = document.querySelectorAll('.dropped-menu__lists');
        for (let item of secondaryItems) {
        item.addEventListener('click', this.chooseFilters);
    }
    let dropMenuItems = document.querySelectorAll('.dropped-menu__item');
    for (let item of dropMenuItems) {
      item.addEventListener('click', this.chooseFilterValue);
    }
  }

  componentWillUnmount() {
    let mainMenuItems = document.querySelectorAll('.main-menu__item');
    for (let item of mainMenuItems) {
        item.removeEventListener('click', mainSubmenuVisibility);
        item.removeEventListener('click', this.chooseCategory);
    }
    let secondaryItems = document.querySelectorAll('.dropped-menu__lists');
    for (let item of secondaryItems) {
    item.removeEventListener('click', this.chooseFilters);
    }
    let dropMenuItems = document.querySelectorAll('.dropped-menu__item');
    for (let item of dropMenuItems) {
      item.removeEventListener('click', this.chooseFilterValue);
    }
  }
  
  render () {
  	return (
      <Router>
      <div>
    		<header className="header">
          <div className="top-menu">
            <div className="wrapper">
              <ul className="top-menu__items">
                <li className="top-menu__item">
                  <a href="#">Возврат</a>
                </li>
                <li className="top-menu__item">
                  <a href="#">Доставка и оплата</a>
                </li>
                <li className="top-menu__item">
                  <a href="#">О магазине</a>
                </li>
                <li className="top-menu__item">
                  <a href="#">Контакты</a>
                </li>
                <li className="top-menu__item">
                  <a href="#">Новости</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-main">
            <div className="header-main__wrapper wrapper">
              <div className="header-main__phone">
                <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                <p>Ежедневно: с 09-00 до 21-00</p>
              </div>
              <div className="header-main__logo">
                <NavLink to='/'>
                  <h1>
                    <img src={logo} alt="logotype"/>
                  </h1>
                </NavLink>
                <p>Обувь и аксессуары для всей семьи</p>
              </div>
              <div className="header-main__profile">
                <div className="header-main__pics">
                  <div className="header-main__pic header-main__pic_search" onClick = {headerMainSearchVisibility}>

                  </div>
                  <div className="header-main__pic_border"></div>
                  <div className="header-main__pic header-main__pic_profile" onClick = {headerHiddenPanelProfileVisibility}>
                    <div className="header-main__pic_profile_menu"></div>
                  </div>

                  <div className="header-main__pic_border"></div>
                        <div className="header-main__pic header-main__pic_basket" onClick = {headerHiddenPanelBasketVisibility}> 
                              <div className="header-main__pic_basket_full">1</div>
                              <div className="header-main__pic_basket_menu"></div>
                        </div>       
                  </div>

                <form className="header-main__search" action="#">
                  <input placeholder="Поиск"/>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </form>
              </div>

            </div>
            <div className="header-main__hidden-panel hidden-panel">
              <div className="hidden-panel__profile">
                <a href="#">Личный кабинет</a>
                <NavLink to="/favourite">
                  <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное</NavLink>
                <a href="#">Выйти</a>
              </div>
              
              <div className="hidden-panel__basket basket-dropped">
                <div className="product-list__item">
                  <div className="product-list__product">
                  «В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!»
                  </div>
                </div>
                  </div>
              </div>
            </div>
          <nav className="main-menu">
            <div className="wrapper">
              <ul className="main-menu__items">
                <li className="main-menu__item main-menu__item_women">
                  <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}`}}>Женская обувь</NavLink>
                </li>
                <li className="main-menu__item main-menu__item_men">
                  <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}`}}>Мужская обувь</NavLink>
                </li>
                <li className="main-menu__item main-menu__item_kids">
                  <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}`}}>Детская обувь</NavLink>
                </li>
                <li className="main-menu__item main-menu__item_new">
                  <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}`}}>Обувь унисекс</NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <div className="dropped-menu">
            <div className="wrapper">
              <div className="dropped-menu__lists dropped-menu__lists_women">
                <h3 className="dropped-menu__list-title">Повод:</h3>
                <ul className="dropped-menu__list">
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&reason=Прогулка`}}>Прогулка</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&reason=Высокая мода`}}>Высокая мода</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&reason=Спорт`}}>Спорт</NavLink>
                  </li>
                </ul>
              </div>
              <div className="dropped-menu__lists">
                <h3 className="dropped-menu__list-title">Категории:</h3>
                <ul className="dropped-menu__list">
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&type=Кроссовки`}}>Кроссовки</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&type=Туфли`}}>Туфли</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&type=Кеды`}}>Кеды</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&type=Сапоги`}}>Сапоги</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&type=Ботинки`}}>Ботинки</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&type=Шлёпанцы`}}>Шлёпанцы</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&type=Ботильоны`}}>Ботильоны</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&type=Босоножки`}}>Босоножки</NavLink>
                  </li>
                </ul>
              </div>
              <div className="dropped-menu__lists">
                <h3 className="dropped-menu__list-title">Сезон:</h3>
                <ul className="dropped-menu__list">
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&season=Лето`}}>Лето</NavLink>
                  </li>
                  <li className="dropped-menu__item">
                    <NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&season=Осень`}}>Осень</NavLink>
                  </li>
                </ul>
              </div>
              <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
                <h3 className="dropped-menu__list-title">Бренды:</h3>
                <ul className="dropped-menu__list">
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=ALBUM DI FAMIGLIA`}}>ALBUM DI FAMIGLIA</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=ALCHIMIA DI BALLIN`}}>ALCHIMIA DI BALLIN</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=ALDO`}}>ALDO</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=ALEXANDER MCQUEEN`}}>ALEXANDER MCQUEEN</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=ASOS`}}>ASOS</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=BALENCIAGA`}}>BALENCIAGA</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Chanel`}}>Chanel</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Christian Louboutin`}}>Christian Louboutin</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=DOLCE & GABBANA`}}>DOLCE & GABBANA</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Dior`}}>Dior</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Estro`}}>Estro</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=GIANVITO ROSSI`}}>GIANVITO ROSSI</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=GIVENCHY`}}>GIVENCHY</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=GUCCI`}}>GUCCI</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=GUIDI`}}>GUIDI</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Hunter`}}>Hunter</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=JACQUEMUS`}}>JACQUEMUS</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=JIMMY CHOO`}}>JIMMY CHOO</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=KAT MACONIE`}}>KAT MACONIE</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Manolo Blahnik`}}>Manolo Blahnik</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=MANSUR GAVRIEL`}}>MANSUR GAVRIEL</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=MARC ELLIS`}}>MARC ELLIS</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=MARNI`}}>MARNI</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=MICHEL VIVIEN`}}>MICHEL VIVIEN</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=NIKE`}}>NIKE</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=New Balance`}}>New Balance</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Nº21`}}>Nº21</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=OFF-WHITE`}}>OFF-WHITE</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=PAUL ANDREW`}}>PAUL ANDREW</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=REIKE NEN`}}>REIKE NEN</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Reebok`}}>Reebok</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=SERGIO ROSSI`}}>SERGIO ROSSI</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=SWEAR`}}>SWEAR</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=TORY BURCH`}}>TORY BURCH</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Timberland`}}>Timberland</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Vans`}}>Vans</NavLink></li>
                  <li className="dropped-menu__item"><NavLink to={{pathname: '/catalogue', search: `categoryId=${category['id']}&brand=Zanotti`}}>Zanotti</NavLink></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
          <Route path="/catalogue" render={()=><Catalogue products={{category}}/>}/>
         </div>
      </Router>
  	);
  }
}

class BasketPanel extends React.Component {
  render() {
    return (
      <div class="hidden-panel__basket basket-dropped hidden-panel__basket_visible">
        <div class="basket-dropped__title">В вашей корзине:</div>
        <div class="basket-dropped__product-list product-list">
          <div class="product-list__item">
            <a class="product-list__pic">
              <img src="img/product-list__pic_1.jpg" alt="product" /> 
            </a>
            <a href="#" class="product-list__product">Ботинки женские, Baldinini</a>
            <div class="product-list__fill"></div>
            <div class="product-list__price">12 360
              <i class="fa fa-rub" aria-hidden="true"></i>
            </div>
            <div class="product-list__delete">
              <i class="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <a class="basket-dropped__order-button" href="order.html">Оформить заказ</a>
      </div>
    )
  }
}

export default Header;

