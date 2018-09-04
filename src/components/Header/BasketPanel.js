import React from 'react';
import { withRouter } from 'react-router-dom';
import BasketPanelItem from "./BasketPanelItem"

export default function BasketPanel(props) {
    if (!props.visible) return null;

    const handleProceedClick = (e, history) => {
        e.preventDefault()
        props.onProceedOrder()
        history.push('/order')
    }

    const ProceedOrderButton = withRouter(({ history }) => 
        <a className="basket-dropped__order-button" href="/order" onClick={e => handleProceedClick(e, history)}>Оформить заказ</a>)

    const EmptyBasket = () => (
        <div className="hidden-panel__basket basket-dropped hidden-panel__basket_visible">
            <div className="product-list__product">
                <div className="product-list__item">
                    В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!
                </div>
            </div>
        </div>);

    const BasketWithItems = () => (
        <div className="hidden-panel__basket basket-dropped hidden-panel__basket_visible">
            <div className="basket-dropped__title">В вашей корзине:</div>
            <div className="basket-dropped__product-list product-list">
                {props.items.map(item => <BasketPanelItem item={item} key={`${item.id} ${item.size}`} onRemoveItem={props.onRemoveItem} />)}
            </div>
            <ProceedOrderButton />
        </div>
    );

    return (props.items.length < 1 ? <EmptyBasket /> : <BasketWithItems />)
}

