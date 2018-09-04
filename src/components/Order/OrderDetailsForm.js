import React from 'react';
import { withRouter } from 'react-router-dom';

import OrderPaymentOptions from './OrderPaymentOptions';

export default class OrderDetailsForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: '',
            customerName: '',
            customerAddress: '',
            paymentMethod: 'cash'
        }
    }

    onSubmitOrder = (history) => {
        const details = Object.assign({}, this.state)
        this.props.onSubmitOrder(details)
        history.push('/orderdone')
    }

    render() {
        const SubmitOrderButton = withRouter(({ history }) => 
            <button className="order-process__form-submit order-process__form-submit_click" onClick={() => this.onSubmitOrder(history)}>Подтвердить заказ</button>)

        return (
            <div className="order-process__confirmed">
                <form action="#">
                    <div className="order-process__delivery">
                        <h3 className="h3">кому и куда доставить?</h3>
                        <div className="order-process__delivery-form">
                            <label className="order-process__delivery-label">
                                <div className="order-process__delivery-text">Имя</div>
                                <input className="order-process__delivery-input" type="text" 
                                    value={this.state.customerName} onChange={e => this.setState({customerName: e.target.value})} name="delivery" placeholder="Представьтесь, пожалуйста" />
                            </label>
                            <label className="order-process__delivery-label">
                                <div className="order-process__delivery-text">Телефон</div>
                                <input className="order-process__delivery-input" type="tel" 
                                    value={this.state.phoneNumber} onChange={e => this.setState({phoneNumber: e.target.value})} name="delivery" placeholder="Номер в любом формате" />
                            </label>
                            <label className="order-process__delivery-label">
                                <div className="order-process__delivery-text">Адрес</div>
                                <input className="order-process__delivery-input order-process__delivery-input_adress" type="text" 
                                    value={this.state.customerAddress} onChange={e => this.setState({customerAddress: e.target.value})} name="delivery" placeholder="Ваша покупка будет доставлена по этому адресу" />
                            </label>
                        </div>
                        <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
                    </div>
                    <OrderPaymentOptions paymentMethod={this.state.paymentMethod} onChangePaymentMethod={method => this.setState({paymentMethod: method})} />
                    <SubmitOrderButton />
                </form>
            </div>
        )
    }
}