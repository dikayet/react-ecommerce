import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from './CartItem.css';

import deleteIcon from '../../../../assets/icons/delete.png';

import { categories } from '../../../../shared/exports';
import AsyncImage from '../../../../components/AsyncImage/AsyncImage';
import Input from '../../../../components/UI/Input/Input';


class CartItem extends Component {

	state = {
		alert: false,
		value: 1,
		price: 0,
		preRemove: false
	}

	componentDidMount(){
		this.setState({
			value: this.props.el.quant,
			price: this.props.el.price*this.props.el.quant
		})
	}

	componentDidUpdate(){
		if(this.state.alert){
			setTimeout(() => this.setState({ alert: false }), 400);
		}
	}

	changeQuant = (index, e) => {
		if (e.target.value > this.props.el.size.quant) {
			this.setState({
				alert: true,
				value: this.props.el.size.quant,
				price: this.props.el.size.quant*this.props.el.price
			});
			return;
		}
		this.setState({
			alert: false,
			value: e.target.value,
			price: e.target.value*this.props.el.price
		});
		this.props.change(index, e);
	}

	onBlur = e => {
		let value = e.target.value;
		if(e.target.value === '' || +e.target.value === 0){
			value = 1
		}
		this.setState({
			alert: false,
			value,
			price: value*this.props.el.price
		})
	}

	remove = () => {
		this.setState({
			preRemove: true
		});
		setTimeout(() => {
			this.props.remove(this.props.index);
		}, 150);
	}

	render(){
		let removeClass = null;
		if(this.state.preRemove){
			removeClass = styles.removeAnim;
		}
		return (
			<Fragment>
			<tr className={removeClass}>
				<td className={styles.productTDtitle}>
					<Link to={'/' + categories[this.props.el.category].link + '/' + this.props.el.id + '/' + this.props.el.color}><AsyncImage path={'products/' + this.props.el.image + '.jpg'} /></Link>
					<div className={styles.container}>
						<Link to={'/' + categories[this.props.el.category].link + '/' + this.props.el.id + '/' + this.props.el.color}>
							<h4>{this.props.el.name}</h4>
						</Link>
						<span>{this.props.el.color}/{this.props.el.size.size}</span>
						<span style={{display: 'flex'}} className={styles.removeCartItem} onClick={this.remove}><img src={deleteIcon} alt="remove_product" style={{height: '1rem', marginRight: '.3rem', width: 'auto'}}/>Remove</span>
					</div>
				</td>
				<td className={styles.price}><span>Price</span>${this.props.el.price}</td>
					<td className={styles.tdInput} style={{ position: 'relative' }}><span>Quantity</span><Input onBlur={this.onBlur} min="1" onChange={this.changeQuant.bind(this, this.props.index)} element="input" style={{ width: '5rem', margin: '0 auto', border: this.state.alert ? '1px solid red' : 'none' }} value={this.state.value} type="number" /></td>
				<td><div className={styles.subTotal}><span>Total</span>${(this.state.price).toFixed(2)}</div></td>
			</tr>
			</Fragment>
		)
	}
}

export default CartItem;
