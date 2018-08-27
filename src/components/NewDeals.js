import React from 'react';
import { NavLink } from 'react-router-dom';

let previousImage, nextImage, currentImage, title, brand, price;

class NewDeals extends React.Component {
	constructor(props) {
		super(props);
		/*
		this.state = {
			
			products: [{
				title: "Босоножки женские",
				brand: "Damlax",
				price: 5950
			}],
			
			product_active_img: "../img/new-deals__product_active.jpg",
			product_first_img: "../img/new-deals__product_1.jpg",
			product_last_img: "../img/new-deals__product_2.jpg",
			current_active: 0,
			product_first: -1,
			product_last: 1
		}
		*/
	}

	Clicker(event) {
		if (event.target.classList.contains('new-deals__arrow_right')) {

			if (this.state.current_active < this.state.products.length - 1) {
		
				title = this.state.products[this.state.current_active + 1].title;
				brand = this.state.products[this.state.current_active + 1].brand;
				price = this.state.products[this.state.current_active + 1].price;
					
				this.setState({
					product_last_img: this.state.current_active + 2 <= this.state.products.length - 1 ? this.state.products[this.state.current_active + 2].images[0] : this.state.products[0].images[0],
					product_first_img: this.state.products[this.state.current_active].images[0],
					product_active_img: this.state.products[this.state.current_active + 1].images[0],
					product_last: this.state.current_active + 2 <= this.state.products.length - 1 ? this.state.current_active + 2 : 0,
					product_first: this.state.current_active,
					current_active: this.state.current_active + 1,
				});
			}
			else {
				
				title = this.state.products[0].title;
				brand = this.state.products[0].brand;
				price = this.state.products[0].price;
					
				this.setState({
					product_last_img: this.state.products[1].images[0],
					product_first_img: this.state.products[this.state.products.length - 1].images[0],
					product_active_img: this.state.products[0].images[0],
					product_last: 1,
					product_first: this.state.products.length - 1,
					current_active: 0 
				});
			}

		} 

		else {

			if ((this.state.current_active > 0)&&(this.state.current_active < this.state.products.length)) {
				
				title = this.state.products[this.state.current_active - 1].title;
				brand = this.state.products[this.state.current_active - 1].brand;
				price = this.state.products[this.state.current_active - 1].price;
				
				this.setState({
					product_last_img: this.state.products[this.state.current_active].images[0],
					product_first_img: this.state.current_active > 1 ? this.state.products[this.state.current_active - 2].images[0] : this.state.products[this.state.products.length - 1].images[0],
					product_active_img: this.state.products[this.state.current_active - 1].images[0],
					product_last: this.state.current_active,
					product_first: this.state.current_active > 1 ? this.state.current_active - 2 : this.state.products.length - 1,
					current_active: this.state.current_active - 1
				});
			}

			else {
				
				title = this.state.products[this.state.products.length - 1].title;
				brand = this.state.products[this.state.products.length - 1].brand;
				price = this.state.products[this.state.products.length - 1].price;
				
				this.setState({
					product_last_img: this.state.products[0].images[0],
					product_first_img: this.state.products[this.state.products.length - 2].images[0],
					product_active_img: this.state.products[this.state.products.length - 1].images[0], 
					product_last: 0,
					product_first: this.state.products.length - 2,
					current_active: this.state.products.length - 1
				});

			}
		
		}	
	}

	componentDidUpdate() {
		this.backgroundImage();
//		console.log(this.state.current_active);
	}

	showChosen(event) {
		event.preventDefault();
		event.stopPropagation();
		Array.from(event.currentTarget.querySelectorAll('.new-deals__menu-item')).forEach(el => {
			el.classList.remove('new-deals__menu-item_active');
				if ((el === event.target)||(el.firstElementChild === event.target)) {
					el.classList.add('new-deals__menu-item_active');
					if ((el.innerText.toLowerCase() === "женская обувь")||(el.firstElementChild.innerText.toLowerCase() === "женская обувь")) {
						this.setState({
							products: this.state.women_products,
							product_active_img: this.state.women_products[1].images[0],
							product_first_img: this.state.women_products[0].images[0],
							product_last_img: this.state.women_products[2].images[0]
						});	
						title = this.state.women_products[1].title;
						brand = this.state.women_products[1].brand;
						price = this.state.women_products[1].price;
					}
					else if ((el.innerText.toLowerCase() === "мужская обувь")||(el.firstElementChild.innerText.toLowerCase() === "мужская обувь")) {
						this.setState({
							products: this.state.men_products,
							product_active_img: this.state.men_products[1].images[0],
							product_first_img: this.state.men_products[0].images[0],
							product_last_img: this.state.men_products[2].images[0]
						});
						title = this.state.men_products[1].title;
						brand = this.state.men_products[1].brand;
						price = this.state.men_products[1].price;
					}
					else if ((el.innerText.toLowerCase() === "детская обувь")||(el.firstElementChild.innerText.toLowerCase() === "детская обувь")) {
						this.setState({
							products: this.state.children_products,
							product_active_img: this.state.children_products[1].images[0],
							product_first_img: this.state.children_products[0].images[0],
							product_last_img: this.state.children_products[2].images[0],
						});
						title = this.state.children_products[1].title;
						brand = this.state.children_products[1].brand;
						price = this.state.children_products[1].price;
					}
					else {
						this.setState({
							products: this.state.all_products,
							product_active_img: this.state.all_products[1].images[0],
							product_first_img: this.state.all_products[0].images[0],
							product_last_img: this.state.all_products[2].images[0]
						});
						title = this.state.all_products[1].title;
						brand = this.state.all_products[1].brand;
						price = this.state.all_products[1].price;
					}
				}
		});
	}

	favourite(event) {
		if(event.target.classList.contains('new-deals__product_favorite'))
			{
				event.target.classList.remove('new-deals__product_favorite');
				event.target.classList.add('new-deals__product_favorite_chosen');
			}
		else {
			event.target.classList.remove('new-deals__product_favorite_chosen');
			event.target.classList.add('new-deals__product_favorite');
		}
	}

	backgroundImage() {
		previousImage.style.backgroundSize = `contain`;
		currentImage.style.backgroundSize = `contain`;
		nextImage.style.backgroundSize = `contain`;
		previousImage.style.backgroundImage = `url(${this.state.product_first_img})`;
		currentImage.style.backgroundImage = `url(${this.state.product_active_img})`;
		nextImage.style.backgroundImage = `url(${this.state.product_last_img})`;
	}

	loadFilters() {
		fetch(`https://neto-api.herokuapp.com/bosa-noga/filters`)
.then((res) => {
	if (200 > res.status || res.status > 300) {
		console.log(`Ответ ${res.error}`);
	} else {
		return res;
		}
})
.then((res) => res.json())
.then((info) => {
	console.log(info);
})	
.catch((error) => {
	 console.log(`${error.message}`);
});
	}

	loadFeatured() {
		fetch(`https://neto-api.herokuapp.com/bosa-noga/featured`)
		.then((res) => {
			if (200 > res.status || res.status > 300) {
				console.log(`Ответ ${res.error}`);
			} else {
				return res;
				}
		})
		.then((res) => res.json())
		.then((info) => {
				title = info.data[1].title;
				brand = info.data[1].brand;
				price = info.data[1].price;
			this.setState({
				products: info.data,
				product_active_img: info.data[1].images[0],
				product_first_img: info.data[0].images[0],
				product_last_img: info.data[2].images[0],
				current_active: 1,
				product_first: 0,
				product_last: 2,
				women_products: info.data.filter(el => el.categoryId === 13 || el.categoryId === 14),
				men_products: info.data.filter(el => el.categoryId === 12 || el.categoryId === 14),
				children_products: info.data.filter(el => el.categoryId === 15),
				all_products: info.data
			})
				this.backgroundImage();
		})	
		.catch((error) => {
			 console.log(`${error.message}`);
		});
	}

	componentDidMount() {
		this.loadFeatured();
		this.loadFilters();
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.showChosen);
		window.removeEventListener('click', this.Clicker);
	}

	render () {
		return (
			<div>
				<section className="new-deals wave-bottom">
		      <h2 className="h2">Новинки</h2>
		      <div className="new-deals__menu">
		        <ul className="new-deals__menu-items" onClick={(e) => this.showChosen(e)}>
		          <li className="new-deals__menu-item">
		            <a href="#">Женская обувь</a>
		          </li>
		          <li className="new-deals__menu-item">
		            <a href="#">Мужская обувь</a>
		          </li>
		          <li className="new-deals__menu-item">
		            <a href="#">Детская обувь</a>
		          </li>
		        </ul>
		      </div>

		      <div className="new-deals__slider">
		        
		        <div className="new-deals__arrow new-deals__arrow_left arrow" onClick={(e) => this.Clicker(e)}></div>

		        <div className="new-deals__product new-deals__product_first" ref={el => previousImage = el}>
		          <a href="#"></a>
		        </div>

	        <div className="new-deals__product new-deals__product_active" ref={el => currentImage = el}>
	          <NavLink to="/productcard"></NavLink>
	          <div className="new-deals__product_favorite" onClick={this.favourite}></div>
	        </div>

	        <div className="new-deals__product new-deals__product_last" ref={el => nextImage = el}>
	          <a href="#"></a>
	        </div>

	        <div className="new-deals__arrow new-deals__arrow_right arrow" onClick={(e) => this.Clicker(e)}></div>
	      	
	      	</div>

	      	<div className="new-deals__product-info">
		        <NavLink to="/productcard" className="h3">{title}</NavLink>
			        <p>Производитель:
			          <span>{brand}</span>
			        </p>
		        <h3 className="h3">{price} ₽</h3>
		      </div>

	    	</section>
			</div>
		);
	}
}

export default NewDeals;