import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from './Cart.css';

import CategoryMenu from '../../CategoryMenu/CategoryMenu';
import Legend from '../../../components/UI/Legend/Legend';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import CartItem from './CartItem/CartItem';


import { addToCart, removeFromCart, changeProductQuant } from '../../../store/actions/cart';

// import firebase from 'firebase';
// const db = firebase.database();

class Cart extends Component {

	state = {
		products: [],
		// loading: true,
	}

	componentDidMount(){
		document.title = 'Cart';
	}

	componentDidUpdate(){
	// 	console.log('updating', this.state);
	// 	if (this.state.products.length < 1) {
	// 		let index = 0;
	// 		console.log('inside')
	// 		for (let el of this.props.cart) {
	// 			db.ref('items/' + el.id).once('value').then(snapshot => {
	// 				let product = snapshot.val();
	// 				let option = product.options.find(op => op.color === el.color);
	// 				let size = option.sizes.find(sz => sz.size === el.size)
	// 					let newProduct = {
	// 						id: el.id,
	// 						color: el.color,
	// 						price: el.price,
	// 						size: size,
	// 						image: option.images[0]
	// 					};
	// 					console.log(newProduct);
	// 					let loading = index !== this.props.cart.length - 1;
	// 					this.setState({
	// 						products: [
	// 							...this.state.products,
	// 							newProduct
	// 						]
	// 					});	
	// 			})
	// 			index++;
	// 		}
	// 	}
	// 	// console.log('updating');
	}

	changeQuant = (index, e) => {
		this.props.changeProductQuant(+e.target.value, index);
	}


	removeFromCart = index => {
		// setTimeout(() => {
		// }, 200);
		this.props.removeFromCart(index);
	}
	
	render(){
		let products = null;
		if (this.props.cart.length > 0) {
			products = this.props.cart.map((el, index) => (
				<CartItem key={el.id + el.color} el={el} index={index} remove={this.removeFromCart} change={this.changeQuant}/>
			));	
		}
		return (
				<CategoryMenu>
					<Legend elements={[
						{ path: '/', text: 'Home', link: true },
						{ text: 'Cart', link: false },
					]}/>

				{this.props.cart.length < 1 ? <p style={{textAlign: 'center', marginTop: '15%'}}>Cart Is Empty</p> : (
					<Fragment>
						<table className={styles.headings}>
							<thead>
								<tr>
									<th style={{ marginRight: 'auto' }}>Product</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Total</th>
								</tr>
						</thead>
						<tbody>
							{products}
						</tbody>
					</table>
					<div className="mobile">

					</div>

					<div className={styles.summaryFlex}>
							<div className={styles.formGroup} style={{marginTop: '2rem'}}>
								<label htmlFor="instruct">Special instructions for seller (Optional)</label>
								<Input element="textarea" cols="70" rows="6"></Input>
							</div>
							<div className={styles.cartSummery}>
								<h2 id="totalSum">Total: ${this.props.cart.reduce((sum, el) => sum + (el.price * el.quant), 0).toFixed(2)}</h2>
								<p>Shipping &amp; taxes calculated at checkout</p>
								<div>
									<Button onClick={() => this.props.history.push('/all')}>continue shopping</Button>
									<Button look="solid" onClick={() => this.props.history.push('/checkout')}>checkout</Button>
								</div>
							</div>
							<br />
					</div>
					</Fragment>
				)}
				
				</CategoryMenu>
			)
		}
}

const mapStateToProps = state => ({
	cart: state.cart.products
});

const mapDispatchToProps = dispatch => ({
	addToCart: product => dispatch(addToCart(product)),
	removeFromCart: index => dispatch(removeFromCart(index)),
	changeProductQuant: (quant, index) => dispatch(changeProductQuant(quant, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);