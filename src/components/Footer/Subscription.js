import React from 'react';

export default class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            subscribed: false
        }
    }

    render() {
        const Form = (props) => {
            const handleSubscribe = (e) => {
                e.preventDefault()
                props.onSubscribe()
            }

            return (
                <form className="subscribe__radios">
                    <label className="subscribe__radio_label">
                        <input className="subscribe__radio" defaultChecked="true" type="radio" name="subscribe" value="women" />
                        <div className="subscribe__radio_text">Женское</div>
                    </label>
                    <label className="subscribe__radio_label">
                        <input className="subscribe__radio" type="radio" name="subscribe" value="men" />
                        <div className="subscribe__radio_text">Мужское</div>
                    </label>
                    <label className="subscribe__radio_label">
                        <input className="subscribe__radio" type="radio" name="subscribe" value="both" />
                        <div className="subscribe__radio_text">Всё</div>
                    </label>
                    <input className="subscribe__email" type="email" placeholder="Ваш e-mail" />
                    <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ" onClick={handleSubscribe} />
                </form>            
            )
        }
    
        const Success = () => {
            return (
                <h4>Подписка оформлена! Спасибо!</h4>
            )
        }

        return (
            <section className="subscribe">
                <div className="subscribe__wrapper">
                    <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
                    {this.state.subscribed ? <Success /> : <Form onSubscribe={() => this.setState({subscribed: true})} />}
                </div>
            </section>        
        )
    }
}