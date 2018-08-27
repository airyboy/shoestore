import React from 'react';
import "../css/style-catalogue.css";
import {
    HashRouter as Router,
    Route, Link, NavLink, Switch
} from 'react-router-dom';

let category, productsList, showGoods, 
    image = 0,
    pagination = [];

const sections = ['каталог', 'категории', 'сезон', 'бренды'];
const categories = ['reason', 'type', 'season', 'brand'];

class Catalogue extends React.Component {
  constructor(props) {
    super(props);
   //console.log(this.props.products.category.id, this.props.products.category.type, this.props.products.category.filt, this.props.products.category.filterValue);
    this.state = {
      products: [],
      pages: '',
      goods: '',
      category: this.props.products.category.id,
      type: this.props.products.category.type,
      filter: [this.props.products.category.filt],
      filterValue: [this.props.products.category.filterValue],
      showGoods: ''
    }
  }

  chooseCategory(event) {
    let tempFilter = this.state.filter, 
        tempValue = this.state.filterValue;
    Array.from(event.currentTarget.querySelectorAll('li')).forEach((item) => {
      if(item.classList.contains('active')) {
        item.classList.remove('active');
      }
      if((event.target === item) || (event.target === item.firstElementChild)) {
        item.classList.add('active');
        let cat;
        switch(event.currentTarget.querySelector('h3').innerText.toLowerCase()) {
          case 'каталог':
            cat = 'type';
          break;
          case 'повод':
            cat = 'reason';
          break;
          case 'сезон':
           cat = 'season';
          break;
          case 'бренд':
            cat = 'brand';
          break;
        }
        let flag = false;
        for (let i = 0; i < this.state.filter.length; i++) {
          if(cat === this.state.filter[i]) {
      //      tempFilter[i] = this.state.filter[i];
            tempValue[i] = this.state.filterValue[i];
            flag = true;
            this.setState({
      //        filter: tempFilter,
              filterValue: tempValue
            });
          }
        }
        if (!(flag)) {
          this.setState({
            filter: tempFilter.push(cat),
            filterValue: tempValue.push(item.firstElementChild.innerText)
          });
        }
      }
    });
      let requestString = `https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${this.state.category}`;
      for (let i = 0; i < this.state.filter.length; i++) { 
           requestString += `&${this.state.filter[i]}=${this.state.filterValue[i]}`;
      }

  alert(this.state);

  fetch(requestString)
    .then((res) => {
      if (200 > res.status || res.status > 300) {
        console.log(`Ответ ${res.error}`);
      } else {
        return res;
        }
      })
      .then((res) => res.json())
      .then((info) => {
        let cl;
        pagination = [];
        for (let i = 0; i < info.pages; i++) {
          if(info.page === i + 1) {
            cl = 'active';
          } 
          else { 
            cl = '';
          }
          pagination.push(
            <li className={cl} key={i}><a onClick={(e) => this.roamer(e, this.state.category, this.state.filter, this.state.filterValue)}>{i + 1}</a></li>
          );
        }

      if((String(info.goods).slice(-1) === '1')&&(String(info.goods).slice(-2) !== '11')) {
        showGoods = `${info.goods} товар`;
      }
      else if (((String(info.goods).slice(-1) === '2')&&(String(info.goods).slice(-2) !== '12'))||(((String(info.goods).slice(-1) === '3'))&&(String(info.goods).slice(-2) !== '13'))||((String(info.goods).slice(-1) === '4')&&(String(info.goods).slice(-2) !== '14'))) {
          showGoods = `${info.goods} товара`;
      }
      else {
        showGoods = `${info.goods} товаров`;
      }

   //     console.log(info);
        this.setState({
          products: info.data,
          pages: info.pages,
          currentPage: info.page,
          pagination: pagination,
          goods: info.goods
     //     filter: [filter],
     //     filterValue: [value],
     //     type: this.props.products.category.type
        });
 
//        console.log(pagination);   
      })  
      .catch((error) => {
         console.log(`${error.message}`);
      });


}

  reset() {
      fetch(`https://api-neto.herokuapp.com/bosa-noga/products`)
    .then((res) => {
      if (200 > res.status || res.status > 300) {
        console.log(`Ответ ${res.error}`);
      } else {
        return res;
        }
      })
      .then((res) => res.json())
      .then((info) => {
        
        let cl;
        pagination = [];
        for (let i = 0; i < info.pages; i++) {
          if(info.page === i + 1) {
            cl = 'active';
          } 
          else { 
            cl = '';
          }
          pagination.push(
            <li className={cl} key={i}><a onClick={(e) => this.roamer(e)}>{i + 1}</a></li>
          );
        }

      if((String(info.goods).slice(-1) === '1')&&(String(info.goods).slice(-2) !== '11')) {
        showGoods = `${info.goods} товар`;
      }
      else if (((String(info.goods).slice(-1) === '2')&&(String(info.goods).slice(-2) !== '12'))||(((String(info.goods).slice(-1) === '3'))&&(String(info.goods).slice(-2) !== '13'))||((String(info.goods).slice(-1) === '4')&&(String(info.goods).slice(-2) !== '14'))) {
          showGoods = `${info.goods} товара`;
      }
      else {
        showGoods = `${info.goods} товаров`;
      }
        
      console.log(info);
        this.setState({
          products: info.data,
          pages: info.pages,
          currentPage: info.page,
          pagination: pagination,
          goods: info.goods,
          filter: [''],
          filterValue: [''],
          type: 'Все'
        });

        console.log(pagination);   
      })  
      .catch((error) => {
         console.log(`${error.message}`);
      });

  }

  slidePictures(event) {
    //event.stopPropagation();
    event.preventDefault();
    if(event.currentTarget.classList.contains('arrow_left')) {
      if(image > 0) {
        event.currentTarget.parentElement.querySelector('.img-prod').src = this.state.products[event.currentTarget.parentElement.id].images[image - 1];
        image -= 1;
      }
      else {
        event.currentTarget.parentElement.querySelector('.img-prod').src = this.state.products[event.currentTarget.parentElement.id].images[this.state.products[event.currentTarget.parentElement.id].images.length - 1];
        image = this.state.products[event.currentTarget.parentElement.id].images.length - 1;
      }
    }
    else if (event.currentTarget.classList.contains('arrow_right')) {
      if (image < this.state.products[event.currentTarget.parentElement.id].images.length - 1) {
        event.currentTarget.parentElement.querySelector('.img-prod').src = this.state.products[event.currentTarget.parentElement.id].images[image + 1];
        image += 1;
      }
      else {
        event.currentTarget.parentElement.querySelector('.img-prod').src = this.state.products[event.currentTarget.parentElement.id].images[0];
        image = 0;
      }
    }
  }


  roamer(event, cat, filter, value) {
    let page = event.target.innerText;
    event.target.classList.add('active');
    let requestString ;
    if(cat) {
      requestString = `https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${cat}&page=${page}`;
      if(filter !== '') {
        for (let i = 0; i < filter.length; i++) {
        requestString += `&${filter[i]}=${value[i]}`;
        }
      }
    }
    else {
      requestString = `https://api-neto.herokuapp.com/bosa-noga/products?page=${page}`;
    }
      //requestString = 'https://api-neto.herokuapp.com/bosa-noga/products?categoryId=13&page=2&type=Туфли';
      console.log(filter);
      fetch(requestString)
    .then((res) => {
      if (200 > res.status || res.status > 300) {
        console.log(`Ответ ${res.error}`);
      } else {
        return res;
        }
      })
      .then((res) => res.json())
      .then((info) => {
        
        let cl;
        pagination = [];
        for (let i = 0; i < info.pages; i++) {
          if(parseInt(page) === i + 1) {
            cl = 'active';
          } 
          else { 
            cl = '';
          }
          pagination.push(
            <li className={cl} key={i}><a onClick={(e) => this.roamer(e, this.state.category, this.state.filter, this.state.filterValue)}>{i + 1}</a></li>
          );
        }

      if((String(info.goods).slice(-1) === '1')&&(String(info.goods).slice(-2) !== '11')) {
        showGoods = `${info.goods} товар`;
      }
      else if (((String(info.goods).slice(-1) === '2')&&(String(info.goods).slice(-2) !== '12'))||(((String(info.goods).slice(-1) === '3'))&&(String(info.goods).slice(-2) !== '13'))||((String(info.goods).slice(-1) === '4')&&(String(info.goods).slice(-2) !== '14'))) {
          showGoods = `${info.goods} товара`;
      }
      else {
        showGoods = `${info.goods} товаров`;
      }
        
  //      console.log(info);
        this.setState({
          products: info.data,
          pages: info.pages,
          currentPage: info.page,
          pagination: pagination,
          goods: info.goods,
          type: this.props.products.category.type
        });

        console.log(pagination);   
      })  
      .catch((error) => {
         console.log(`${error.message}`);
      });

//    }

  }

  loadGoods(cat, filter, value) {
    let correctFilters, fetchstring, fetchstringAll, filterstring, filters, categoryFiltered;
    //console.log(filter, value);
      /*
      filters = `https://api-neto.herokuapp.com/bosa-noga/filters`;
      filterstring = `https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${cat}&brand=Chanel`;
      fetchstring = `https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${cat}&page=2`;
      fetchstringAll = `https://api-neto.herokuapp.com/bosa-noga/products`;
      */
      if(filter) {
        categoryFiltered = `https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${cat}&${filter}=${value}`;
      }
      else {
        categoryFiltered = `https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${cat}`;
      }
      
      //correctFilters = `https://api-neto.herokuapp.com/bosa-noga/products?categoryId=${cat}&${filter}=${value}`;
          fetch(categoryFiltered)
    .then((res) => {
      if (200 > res.status || res.status > 300) {
        console.log(`Ответ ${res.error}`);
      } else {
        return res;
        }
      })
      .then((res) => res.json())
      .then((info) => {
        let cl;
        pagination = [];
        for (let i = 0; i < info.pages; i++) {
          if(info.page === i + 1) {
            cl = 'active';
          } 
          else { 
            cl = '';
          }
          pagination.push(
            <li className={cl} key={i}><a onClick={(e) => this.roamer(e, this.state.category, this.state.filter, this.state.filterValue)}>{i + 1}</a></li>
          );
        }

      if((String(info.goods).slice(-1) === '1')&&(String(info.goods).slice(-2) !== '11')) {
        showGoods = `${info.goods} товар`;
      }
      else if (((String(info.goods).slice(-1) === '2')&&(String(info.goods).slice(-2) !== '12'))||(((String(info.goods).slice(-1) === '3'))&&(String(info.goods).slice(-2) !== '13'))||((String(info.goods).slice(-1) === '4')&&(String(info.goods).slice(-2) !== '14'))) {
          showGoods = `${info.goods} товара`;
      }
      else {
        showGoods = `${info.goods} товаров`;
      }

        console.log(info);
        this.setState({
          products: info.data,
          pages: info.pages,
          currentPage: info.page,
          pagination: pagination,
          goods: info.goods,
          filter: [filter],
          filterValue: [value],
          type: this.props.products.category.type
        });

      switch(filter) {
        case 'reason':
          Array.from(document.querySelector('.sidebar__occasion').querySelectorAll('li')).forEach((item) => {
            item.classList.remove('active');
            if(item.firstElementChild.innerText === value) {
              item.classList.add('active');
            }
          });
        case 'type':
          Array.from(document.querySelector('.sidebar__catalogue-list').querySelectorAll('li')).forEach((item) => {
            item.classList.remove('active');
            if(item.firstElementChild.innerText === value) {
              item.classList.add('active');
            }
          });
        case 'season':
          Array.from(document.querySelectorAll('.sidebar__season')[0].querySelectorAll('li')).forEach((item) => {
            item.classList.remove('active');
            if(item.firstElementChild.innerText === value) {
              item.classList.add('active');
            }
          });
        case 'brand':
          Array.from(document.querySelectorAll('.sidebar__season')[1].querySelectorAll('li')).forEach((item) => {
            item.classList.remove('active');
            if(item.firstElementChild.innerText === value) {
              item.classList.add('active');
            }
          });
      }
 
//        console.log(pagination);   
      })  
      .catch((error) => {
         console.log(`${error.message}`);
      });
  }

  /*
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.products.category.type, prevProps.products.category.type);
    if(this.props.products.category.flagNew === false) {
      this.loadGoods(this.props.products.category.id);
    }
  }
  */

  componentWillReceiveProps(newProps) {
    //console.log(newProps.props.products.category.id, this.props.products.category.id);
      this.loadGoods(this.props.products.category.id, this.props.products.category.filt, this.props.products.category.filterValue);
  }

  componentWillMount() {
   this.loadGoods(this.props.products.category.id, this.props.products.category.filt, this.props.products.category.filterValue);
  }

  render() {

    return (
        <div>
            <div className="site-path">
                <ul className="site-path__items">
                    <li className="site-path__item"><a href="index.html">Главная</a></li>
                    <li className="site-path__item"><a href="#">{this.state.type}</a></li>
                </ul>
            </div>

            <main className="product-catalogue">

                <section className="sidebar">
                    <section className="sidebar__division" onClick = {(e) => this.chooseCategory(e)}>
                        <div className="sidebar__catalogue-list">
                            <div className="sidebar__division-title">
                                <h3>Каталог</h3>

                                <div className="opener-down"></div>
                            </div>
                            <ul>
                                <li><a>Кроссовки</a></li>
                                <li><a>Туфли</a></li>
                                <li><a>Кеды</a></li>
                                <li><a>Сапоги</a></li>
                                <li><a>Ботинки</a></li>
                                <li><a>Шлёпанцы</a></li>
                                <li><a>Ботильоны</a></li>
                                <li><a>Босоножки</a></li>
                            </ul>
                        </div>
                    </section>
                    <div className="separator-150 separator-150-1"></div>
                    <section className="sidebar__division">
                        <div className="sidebar__price">
                            <div className="sidebar__division-title">
                                <h3>Цена</h3>

                                <div className="opener-down"></div>
                            </div>
                            <div className="price-slider">
                                <div className="circle-container">
                                    <div className="circle-1"></div>
                                    <div className="line-white"></div>
                                    <div className="line-colored"></div>
                                    <div className="circle-2"></div>
                                </div>
                                <div className="counter">
                                    <input type="text" className="input-1" defaultValue="1000"/>

                                    <div className="input-separator"></div>
                                    <input type="text" className="input-2" defaultValue="30 000"/>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="separator-150 separator-150-2"></div>
                    <section className="sidebar__division">
                        <div className="sidebar__color">
                            <div className="sidebar__division-title">
                                <h3>Цвет</h3>

                                <div className="opener-down"></div>
                            </div>
                            <ul>
                                <li><a href="#">
                                    <div className="color beige"></div>
                                    <span className="color-name">Бежевый</span></a></li>
                                <li><a href="#">
                                    <div className="color whitesnake"></div>
                                    <span className="color-name">Белый</span></a></li>
                                <li><a href="#">
                                    <div className="color shocking-blue"></div>
                                    <span className="color-name">Голубой</span></a></li>
                                <li><a href="#">
                                    <div className="color yellow"></div>
                                    <span className="color-name">Жёлтый</span></a></li>
                                <li><a href="#">
                                    <div className="color king-crimson"></div>
                                    <span className="color-name">Алый</span></a></li>
                                <li><a href="#">
                                    <div className="color deep-purple"></div>
                                    <span className="color-name">Фиолетовый</span></a></li>
                                <li><a href="#">
                                    <div className="color black-sabbath"></div>
                                    <span className="color-name">Чёрный</span></a></li>
                            </ul>
                        </div>
                    </section>
                    <div className="separator-150 separator-150-3"></div>
                    <section className="sidebar__division">
                        <div className="sidebar__size">
                            <div className="sidebar__division-title">
                                <h3>Размер</h3>

                                <div className="opener-down"></div>
                            </div>
                            <ul>
                                <div className="list-1">
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-31"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">8</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-33"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">10</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-35"/><span
                                        className="checkbox-custom"></span> <span
                                        className="label">12</span></label></li>
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-37"/><span
                                        className="checkbox-custom"></span> <span
                                        className="label">14</span></label></li>
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-39"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">15</span>
                                    </label>
                                    </li>
                                </div>
                                <div className="list-2">
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-32"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">16</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox"
                                                      className="checkbox"
                                                      name="checkbox-34"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">18</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox"
                                                      className="checkbox"
                                                      name="checkbox-36"
                                                      defaultChecked/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">20</span>
                                    </label>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </section>
                    <div className="separator-150 separator-150-4"></div>
                    <section className="sidebar__division">
                        <div className="sidebar__size">
                            <div className="sidebar__division-title">
                                <h3>Размер каблука</h3>

                                <div className="opener-up"></div>
                            </div>
                            <ul>
                                <div className="list-1">
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-37"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">1</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-39"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">2</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-41"/><span
                                        className="checkbox-custom"></span> <span
                                        className="label">3</span></label></li>
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-43"/><span
                                        className="checkbox-custom"></span> <span
                                        className="label">4</span></label></li>
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-45"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">5</span>
                                    </label>
                                    </li>
                                </div>
                                <div className="list-2">
                                    <li><label><input type="checkbox" className="checkbox"
                                                      name="checkbox-38"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">6</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox"
                                                      className="checkbox"
                                                      name="checkbox-40"/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">7</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox"
                                                      className="checkbox"
                                                      name="checkbox-42"
                                                      defaultChecked/>
                                        <span className="checkbox-custom"></span>
                                        <span className="label">8</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox"
                                              className="checkbox"
                                              name="checkbox-44"
                                              />
                                        <span className="checkbox-custom"></span>
                                        <span className="label">9</span>
                                    </label>
                                    </li>
                                    <li><label><input type="checkbox"
                                              className="checkbox"
                                              name="checkbox-46"
                                              />
                                        <span className="checkbox-custom"></span>
                                        <span className="label">10</span>
                                    </label>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </section>
                    <div className="separator-150 separator-150-5"></div>
                    <section className="sidebar__division" onClick = {(e) => this.chooseCategory(e)}>
                        <div className="sidebar__occasion">
                            <div className="sidebar__division-title">
                                <h3>Повод</h3>

                                <div className="opener-down"></div>
                            </div>
                            <ul>
                                <li><a>Прогулка</a></li>
                                <li><a>Высокая мода</a></li>
                                <li><a>Спорт</a></li>
                            </ul>
                        </div>
                    </section>
                    <div className="separator-150 separator-150-6"></div>
                    <section className="sidebar__division" onClick = {(e) => this.chooseCategory(e)}>
                        <div className="sidebar__season">
                            <div className="sidebar__division-title">
                                <h3>Сезон</h3>

                                <div className="opener-up"></div>
                            </div>
                            <ul>
                              <li><a>Лето</a></li>
                              <li><a>Осень</a></li>
                            </ul>
                        </div>
                    </section>
                    <div className="separator-150 separator-150-7"></div>
                    <section className="sidebar__division" onClick = {(e) => this.chooseCategory(e)}>
                      <div className="sidebar__occasion">
                        <div className="sidebar__division-title">
                          <h3>Бренд</h3>
                          <div className="opener-down"></div>
                        </div>
                            <ul>
                              <li><a>ALBUM DI FAMIGLIA</a></li>
                              <li><a>ALCHIMIA DI BALLIN</a></li>
                              <li><a>ALDO</a></li>
                              <li><a>ALEXANDER MCQUEEN</a></li>
                              <li><a>ASOS</a></li>
                              <li><a>BALENCIAGA</a></li>
                              <li><a>Chanel</a></li>
                              <li><a>Christian Louboutin</a></li>
                              <li><a>DOLCE & GABBANA</a></li>
                              <li><a>Dior</a></li>
                              <li><a>Estro</a></li>
                              <li><a>GIANVITO ROSSI</a></li>
                              <li><a>GIVENCHY</a></li>
                              <li><a>GUCCI</a></li>
                              <li><a>GUIDI</a></li>
                              <li><a>Hunter</a></li>
                              <li><a>JACQUEMUS</a></li>
                              <li><a>JIMMY CHOO</a></li>
                              <li><a>KAT MACONIE</a></li>
                              <li><a>Manolo Blahnik</a></li>
                              <li><a>MANSUR GAVRIEL</a></li>
                              <li><a>MARC ELLIS</a></li>
                              <li><a>MARNI</a></li>
                              <li><a>MICHEL VIVIEN</a></li>
                              <li><a>NIKE</a></li>
                              <li><a>New Balance</a></li>
                              <li><a>Nº21</a></li>
                              <li><a>OFF-WHITE</a></li>
                              <li><a>PAUL ANDREW</a></li>
                              <li><a>REIKE NEN</a></li>
                              <li><a>Reebok</a></li>
                              <li><a>SERGIO ROSSI</a></li>
                              <li><a>SWEAR</a></li>
                              <li><a>TORY BURCH</a></li>
                              <li><a>Timberland</a></li>
                              <li><a>Vans</a></li>
                              <li><a>Zanotti</a></li>
                          </ul>
                        </div>
                        <label><input type="checkbox"
                                      className="checkbox"
                                      name="checkbox-disc"/>
                            <span className="checkbox-discount"></span>
                            <span className="text-discount">Со скидкой</span>
                        </label>

                        <div className="separator-240"></div>
                    </section>

                    <section className="sidebar__division">
                        <div className="drop-down">
                            <a onClick={(e) => this.reset(e)}><span className="drop-down-icon"></span>Сбросить</a>
                        </div>
                    </section>
                </section>

                <section className="product-catalogue-content">

                    <section className="product-catalogue__head">
                        <div className="product-catalogue__section-title">
                            <h2 className="section-name">{this.state.type}</h2>
                            <span className="amount">
                            {showGoods} 
                            </span>
                        </div>
                        <div className="product-catalogue__sort-by">
                            <p className="sort-by">Сортировать</p>
                            <select name="" id="sorting">
                                <option value="">по популярности
                                </option>
                                <option value="">по размеру</option>
                                <option value="">по производителю</option>
                            </select>
                        </div>
                    </section>

                    <section className="product-catalogue__item-list">
                    
                    {
                      this.state.products.map((item, index) => {
                        return (
                         // console.log(item);
                        <NavLink key={index} className="item-list__item-card item" to="/productcard" id={this.state.products.id}>
                          <div className="item-pic"  id={index}>
                              <img className="item-pic-1"
                                className="img-prod"
                                src={item.images[0]}
                                alt={item.title}/>
                              <div className="product-catalogue__product_favorite">
                                  <p></p>
                              </div>
                              <div className="arrow arrow_left" onClick={(e) => this.slidePictures(e)}></div>
                              <div className="arrow arrow_right" onClick={(e) => this.slidePictures(e)}></div>
                          </div>
                          <div className="item-desc">
                              <h4 className="item-name">{item.title}</h4>

                              <p className="item-producer">Производитель: <span className="producer">{item.brand}</span>
                              </p>

                              <p className="item-price">{item.price}</p>
                          </div>
                        </NavLink>
                        )}
                      )
                    }
                    
                    </section>

                    <div className="product-catalogue__pagination">
                        <div className="page-nav-wrapper">
                            <div className="angle-back"><a href="#"></a></div>
                            <ul>
                            { this.state.pagination }
                            </ul>
                            <div className="angle-forward"><a href="#"></a></div>
                        </div>
                    </div>
                </section>
            </main>

            <section className="product-catalogue__overlooked-slider">
                <h3>Вы смотрели:</h3>

                <div className="overlooked-slider">
                    <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow"></div>
                    <div className="overlooked-slider__item overlooked-slider__item-1">
                        <NavLink to="/productcard"></NavLink>
                    </div>
                    <div className="overlooked-slider__item overlooked-slider__item-2">
                        <NavLink to="/productcard"></NavLink>
                    </div>
                    <div className="overlooked-slider__item overlooked-slider__item-3">
                        <NavLink to="/productcard"></NavLink>
                    </div>
                    <div className="overlooked-slider__item overlooked-slider__item-4">
                        <NavLink to="/productcard"></NavLink>
                    </div>
                    <div className="overlooked-slider__item overlooked-slider__item-5">
                        <NavLink to="/productcard"></NavLink>
                    </div>
                    <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>
                </div>
            </section>
        </div>
    )
  }
}
export default Catalogue;



