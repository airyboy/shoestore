import React from 'react';
//import ReactDOM from 'react-dom';
import "../css/style-order.css";
import "../css/style-catalogue.css";
import "../css/style-favorite.css";
//import ProductCard from './ProductCard.js';
import { NavLink } from 'react-router-dom';

const Favourite = () => {
  return (
  <div className="wrapper wrapper_favorite">
    <div className="site-path">
      <ul className="site-path__items">
        <li className="site-path__item"><a href="index.html">Главная</a></li>
        <li className="site-path__item"><a href="favorite.html">Избранное</a></li>
      </ul>
    </div>
    <main className="product-catalogue product-catalogue_favorite">
      <section className="product-catalogue__head product-catalogue__head_favorite">
        <div className="product-catalogue__section-title">
          <h2 className="section-name">В вашем избранном</h2><span className="amount amount_favorite">99 товаров</span>
        </div>
        <div className="product-catalogue__sort-by">
          <p className="sort-by">Сортировать</p>
          <select id="sorting" name="">
            <option value="">по дате добавления</option>
            <option value="">по размеру</option>
            <option value="">по производителю</option>
          </select>
        </div>
      </section>
      <section className="product-catalogue__item-list product-catalogue__item-list_favorite"><NavLink className="item-list__item-card item" to="/ProductCard.js">
          <div className="item-pic"><img className="item-pic-1" src="./img/catalogue-pics/product-catalogue__item-1.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Босоножки женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Damlax</span></p>
            <p className="item-price">18 520</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-2" src="img/catalogue-pics/product-catalogue__item-2.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Ботинки женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
            <p className="item-price">23 150</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-3" src="img/catalogue-pics/product-catalogue__item-3.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Босоножки женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Damlax</span></p>
            <p className="item-price">5 390</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-4" src="img/catalogue-pics/product-catalogue__item-4.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Кроссовки женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Damlax</span></p>
            <p className="item-price">6 520</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-5" src="img/catalogue-pics/product-catalogue__item-5.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Резиновые полусапоги женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Menghi Shoes</span></p>
            <p className="item-price">10 030</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-6" src="img/catalogue-pics/product-catalogue__item-6.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Полусапоги женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Pegia</span></p>
            <p className="item-price">10 140</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-7" src="img/catalogue-pics/product-catalogue__item-7.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Босоножки женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Baldinini</span></p>
            <p className="item-price">25 020</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-8" src="img/catalogue-pics/product-catalogue__item-8.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Туфли женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Baldini</span></p>
            <p className="item-price">18 520</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-9" src="img/catalogue-pics/product-catalogue__item-9.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Полуботинки женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
            <p className="item-price">21 830</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-10" src="img/catalogue-pics/product-catalogue__item-10.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Туфли женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
            <p className="item-price">20 830</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-11" src="img/catalogue-pics/product-catalogue__item-11.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Ботинки женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
            <p className="item-price">26 240</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink><NavLink className="item-list__item-card item" to="/productcard">
          <div className="item-pic"><img className="item-pic-12" src="img/catalogue-pics/product-catalogue__item-12.png" alt=""/>
            <div className="product-catalogue__product_favorite">
              <p></p>
            </div>
            <div className="arrow arrow_left"></div>
            <div className="arrow arrow_right"></div>
          </div>
          <div className="item-desc">
            <h4 className="item-name">Туфли женские</h4>
            <p className="item-producer">Производитель: <span className="producer">Vittorio Virgili</span></p>
            <p className="item-price">17 750</p>
            <div className="sizes">
              <p className="sizes__title">Размеры в наличии:</p>
              <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
            </div>
          </div></NavLink></section>
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">
          <div className="angle-back"><a href="#"></a></div>
          <ul>
            <li className="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="">...</a></li>
            <li><a href="#">99</a></li>
          </ul>
          <div className="angle-forward"><a href="#"></a></div>
        </div>
      </div>
    </main>
  </div>
  );
}
      
export default Favourite;