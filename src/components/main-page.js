
import React from 'react';
import "../css/normalize.css";
import "../css/style.css";
import Header from './Header.js';
import Footer from './Footer.js';
import Catalogue from './Catalogue.js';
import Sections from './Sections.js';
import ProductCard from './ProductCard.js';
import Favourite from './Favourite.js';
import Order from './Order.js';
import OrderDone from './OrderDone.js';
import {
    HashRouter as Router,
    Route, Switch
} from 'react-router-dom';

const MainPage = () => {
  return (
    <Router  basename={process.env.PUBLIC_URL}>
      <div className="container">
        <div>
          <Header/>
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={Sections}/> 
            <Route path="/productcard" component={ProductCard}/>
            <Route path="/favourite" component={Favourite}/>
            <Route path="/order" component={Order}/>
            <Route path="/orderdone" component={OrderDone}/>
          </Switch>
        </div>
        <div>
          <Footer/>
        </div>
        <div>
        </div>
      </div>
    </Router>
  )
}

export default MainPage;