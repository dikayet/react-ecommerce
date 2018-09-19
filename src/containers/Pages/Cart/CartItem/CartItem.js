import React from 'react';
import { Link } from 'react-router-dom';

import styles from './CartItem.css';

import deleteIcon from '../../../../assets/icons/delete.png';

import { categories } from '../../../../shared/exports';
import AsyncImage from '../../../../components/AsyncImage/AsyncImage';
import Input from '../../../../components/UI/Input/Input';

const CartItem = props => {
	return (
		<tr>
			<td className={styles.productTDtitle}>
				<Link to={'/' + categories[props.el.category].link + '/' + props.el.id + '/' + props.el.color}><AsyncImage path={'products/' + props.el.image + '.jpg'} /></Link>
				<div className={styles.container}>
					<Link to={'/' + categories[props.el.category].link + '/' + props.el.id + '/' + props.el.color}>
						<h4>{props.el.name}</h4>
						<span>{props.el.color}/{props.el.size}</span>
					</Link>
					<span style={{display: 'flex'}} className={styles.removeCartItem} onClick={props.remove.bind(this, props.index)}><img src={deleteIcon} alt="remove_product" style={{height: '1rem', marginRight: '.3rem'}}/>Remove</span>
				</div>
			</td>
			<td className={styles.price}>${props.el.price}</td>
			<td style={{ position: 'relative' }}><Input min="1" onChange={props.change.bind(this, props.index)} element="input" style={{ width: '5rem', margin: '0 auto' }} value={props.el.quant} type="number" /></td>
			<td><h3 className={styles.subTotal}>${(props.el.price * props.el.quant).toFixed(2)}</h3></td>
		</tr>
	)
}

export default CartItem;
