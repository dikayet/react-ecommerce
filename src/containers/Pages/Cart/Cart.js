import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from './Cart.css';

import CategoryMenu from '../../CategoryMenu/CategoryMenu';
import Legend from '../../../components/UI/Legend/Legend';
import Button from '../../../components/UI/Button/Button';
import CartItem from './CartItem/CartItem';


import { addToCart, removeFromCart, changeProductQuant } from '../../../store/actions/cart';

class Cart extends Component {

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
				<CartItem key={el.id} el={el} index={index} remove={this.removeFromCart} change={this.changeQuant}/>
			));	
		}
		console.log('Length:', this.props.cart.length);
		return (
				<CategoryMenu>
					<Legend elements={[
						{ path: '/', text: 'Home', link: true },
						{ text: 'Cart', link: false },
					]}/>

				{this.props.cart.length < 1 ? <h4 style={{textAlign: 'center', marginTop: '15%'}}>Cart Is Empty</h4> : (
					<Fragment>
					<table className={styles.table}>
						<thead>
							<tr><th style={{ textAlign: 'left' }}>Product</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr></thead>
						<tbody>
							{products}
						</tbody>
					</table>

					<div className={styles.summaryFlex}>
							<div className={styles.cartSummery}>
								<h2 id="totalSum">Total: ${this.props.cart.reduce((sum, el) => sum + (el.price * el.quant), 0).toFixed(2)}</h2>
								<p>Shipping &amp; taxes calculated at checkout</p>
								<div id="cartButtons">
									<Button look="solid" onClick={() => this.props.history.push('/checkout')}>checkout</Button>
									<Button style={{ marginLeft: '1rem' }} onClick={() => this.props.history.push('/all')}>continue shopping</Button>
								</div>
							</div>
							<br />
							<div className={styles.formGroup}>
								<label htmlFor="instruct">Special instructions for seller (Optional)</label>
								<textarea name="instruct" id="instruct" cols="70" rows="6"></textarea>
							</div>
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