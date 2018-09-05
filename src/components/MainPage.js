
import React from 'react';
import {
    HashRouter as Router,
    Route, Switch
} from 'react-router-dom';

import "../css/normalize.css";
import "../css/style.css";

import Header from './Header/Header';
import Footer from './Footer/Footer';
import Catalog from './Catalog/Catalog';
import Sections from './Sections/Sections';
import ProductPage from './ProductCard/ProductCard';
import Favorite from './Favorite/Favorite';
import Order from './Order/Order';
import OrderDone from './OrderDone/OrderDone';

import Storage from "../storage"
import { paymentMethods } from "../payment_methods"

import { getOrderTotal } from "../utils"

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            basketItems: [],
            customerData: {
                phoneNumber: '',
                customerName: '',
                customerAddress: '',
                paymentMethod: 'cash'
            },
            orderTotal: 0
        }
    }

    componentDidMount() {
        //restore the basket contents if there is an active basket
        let products

        if (Storage.getBasketId()) {
            fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${Storage.getBasketId()}`)
            .then(resp => resp.json())
            .then(json => {
                products = json.data.products

                return json.data.products
            })
            .then(products => {
                const tasks = products.map(product => 
                    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${product.id}`)
                    .then(r => r.json())
                    .then(json => json.data)
                )

                return Promise.all(tasks)
            })
            .then(jsons => {
                products.forEach(product => {
                    const found = jsons.find(a => a.id === product.id)

                    product.title = found.title
                    product.image = found.images[0]
                    product.price = found.price
                    product.brand = found.brand
                    product.color = found.color
                    product.quantity = product.amount
                })

                this.setState({basketItems: products})
            })
        }
    }

    getPostParams = (payload) => {
        return { 
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    }

    modifyBasketItemOnServer = (id, size, amount) => {
        const basketId = Storage.getBasketId()

        const payload = {
            id: id,
            size: size,
            amount: amount
        }

        const requestParams = this.getPostParams(payload)

        if (basketId) {
            fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/${basketId}`, requestParams)
            .then(resp => resp.json())
            .then(json => {
                console.log('item added', json)
            })
            
        } else {
            fetch(`https://neto-api.herokuapp.com/bosa-noga/cart/`, requestParams)
            .then(resp => resp.json())
            .then(json => {
                console.log('card created', json)
                if (json.status === 'ok') {
                    Storage.setBasketId(json.data.id)
                }
            })
            
        }
    }

    onAddToBasket = (item) => {
        console.log('add basket item', item)

        let updatedItem

        this.setState(prevState => {
            const items = [...prevState.basketItems]

            const found = items.find(a => a.id === item.id & a.size == item.size)

            if (found) {
                found.quantity += item.quantity
                updatedItem = found
            } else {
                items.push(item)
                updatedItem = item
            }

            return { basketItems: items }
        }, () => {
            this.modifyBasketItemOnServer(item.id, item.size, updatedItem.quantity)
        })

    }

    onRemoveFromBasket = (id, size) => {
        this.setState(prevState => {
            const items = [...prevState.basketItems]

            const i = items.findIndex(item => item.id === id & item.size === size)
            items.splice(i, 1)

            return { basketItems: items }
        }, () => {
            this.modifyBasketItemOnServer(id, size, 0)

            if (this.state.basketItems.length < 1) {
                Storage.setBasketId(null)
            }
        })
    }

    onQuantityChange = (item, val) => {
        console.log(item, val);

        let newQuantity

        this.setState(prevState => {
            let items = [...prevState.basketItems]

            const index = items.findIndex(a => a.id === item.id & a.size == item.size)
            items[index].quantity += val
            newQuantity = items[index].quantity

            if (items[index].quantity == 0) {
                items.splice(index, 1)
                newQuantity = 0
            } 

            return { basketItems: items }
        }, () => {
            this.modifyBasketItemOnServer(item.id, item.size, newQuantity)

            if (this.state.basketItems.length < 1) {
                Storage.setBasketId(null)
            }
        })
    }

    onSubmitOrder = (details) => {
        console.log(details)
        const paymentTypeKey = paymentMethods.find(a => a.val === details.paymentMethod).key

        const payload = {
            name: details.customerName,
            phone: details.phoneNumber,
            address: details.customerAddress,
            cart: Storage.getBasketId(),
            paymentType: paymentTypeKey
        }

        const requestParams = this.getPostParams(payload)

        fetch(`https://neto-api.herokuapp.com/bosa-noga/order`, requestParams)
        .then(resp => resp.json())
        .then(json => {
            console.log('order created', json)
            if (json.status === 'ok') {
                Storage.setBasketId(null)
            }
        })

        this.setState({
            customerData: details, 
            orderTotal: getOrderTotal(this.state.basketItems), 
            basketItems: []})
    }
 
    render() {
        const ProductCard = (props) => {
            return (
                <ProductPage {...props} onAddToBasket={this.onAddToBasket} />
            )
        }

        const OrderPage = (props) => (
            <Order {...props} 
                onQuantityChange={this.onQuantityChange} 
                onSubmitOrder={this.onSubmitOrder}
                items={this.state.basketItems}  />
        )

        const OrderDonePage = (props) => (
            <OrderDone {...props} 
                customerData={this.state.customerData} total={this.state.orderTotal} />
        )

        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div className="container">
                    <div>
                        <Header basketItems={this.state.basketItems} onRemoveFromBasket={this.onRemoveFromBasket} />
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Sections} />
                            <Route path="/catalog/:categoryId(\d+)/page/:page(\d+)" component={Catalog} />
                            <Route path="/catalog/:categoryId(\d+)" component={Catalog} />
                            <Route path="/catalog/filter/:filter/page/:page" component={Catalog} />
                            <Route path="/catalog/filter/:filter" component={Catalog} />
                            <Route path="/catalog" exact component={Catalog} />
                            <Route path="/catalog/search/:search" component={Catalog} />
                            <Route path="/productcard/:id" render={ProductCard} />
                            <Route path="/favourite/:page?" component={Favorite} />
                            <Route path="/order" render={OrderPage} />
                            <Route path="/orderdone" render={OrderDonePage} />
                        </Switch>
                    </div>
                    <div>
                        <Footer />
                    </div>
                    <div>
                    </div>
                </div>
            </Router>
    )
    }
}