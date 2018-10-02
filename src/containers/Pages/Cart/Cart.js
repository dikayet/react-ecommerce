import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from './Cart.css';

import CategoryMenu from '../../CategoryMenu/CategoryMenu';
import Legend from '../../../components/UI/Legend/Legend';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import CartItem from './CartItem/CartItem';


import { addToCart, removeFromCart, changeProductQuant } from '../../../store/actions/cart';

import firebase from 'firebase';
const db = firebase.database();

class Cart extends Component {

	state = {
		products: [],
		loading: true,
	}

	componentDidMount(){
		document.title = 'Cart';
		this.setProducts();
	}

	setProducts = () => {
		db.ref('items').once('value', snapshot => {
			let productArr = [];
			snapshot.forEach(child => {
				let product = child.val();
				for (let el of this.props.cart) {
					if (child.key === el.id) {
						let option = product.options.find(op => op.color === el.color);
						let size = option.sizes.find(sz => sz.size === el.size);
						let newProduct = {
							id: el.id,
							name: product.name,
							color: el.color,
							category: product.category,
							price: product.price,
							size,
							quant: el.quant,
							image: option.images[0]
						};
						productArr.push(newProduct);
					}
				}
			});
			this.setState({
				loading: false,
				products: productArr
			});
		});
	}

	changeQuant = (index, e) => {
		this.props.changeProductQuant(+e.target.value, index);
	}


	removeFromCart = index => {
		// setTimeout(() => {
		// }, 200);
		let newProducts = this.state.products.filter((el, i) => index !== i);
		this.setState({
			products: newProducts
		});
		this.props.removeFromCart(index);
	}
	
	render(){
		console.log('render');
		let content = <Spinner />;
		if (!this.state.loading) {
			if (this.state.products.length > 0) {
				let products = null;
				products = this.state.products.map((el, index) => (
					<CartItem key={el.id + el.color + el.size.size} el={el} index={index} remove={this.removeFromCart} change={this.changeQuant} />
				));
				content = (
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
							<div className={styles.formGroup} style={{ marginTop: '2rem' }}>
								<label htmlFor="instruct">Special instructions for seller (Optional)</label>
								<Input element="textarea" cols="70" rows="6"></Input>
							</div>
							<div className={styles.cartSummery}>
								<h2 id="totalSum">Total: ${this.state.products.reduce((sum, el, index) => sum + (el.price * this.props.cart[index].quant), 0).toFixed(2)}</h2>
								<p>Shipping &amp; taxes calculated at checkout</p>
								<div>
									<Button onClick={() => this.props.history.push('/all')}>continue shopping</Button>
									<Button look="solid" onClick={() => this.props.history.push('/msg/checkout')}>checkout</Button>
								</div>
							</div>
							<br />
						</div>
					</Fragment>
				);
			} else {
				content = (
					<div style={{ textAlign: 'center', marginTop: '10%' }}>
						<p>Cart Is Empty</p>
						<Button style={{ margin: '0 auto' }} onClick={() => this.props.history.push('/all')}>Start Shopping</Button>
					</div>
				);
			}
		}
		return (
				<CategoryMenu>
					<Legend elements={[
						{ path: '/', text: 'Home', link: true },
						{ text: 'Cart', link: false },
					]}/>

				{content}
				
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