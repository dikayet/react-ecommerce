import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import styles from './Item.css';
import { categories } from '../../../../shared/exports';

import AsyncImage from '../../../../components/AsyncImage/AsyncImage';

class Item extends Component {

	state = {
		show: false
	}

	componentDidMount(){
		setTimeout(() => {
			this.setState({ show: true });
		}, 100*this.props.index);
	}

	render(){
		const { el } = this.props;
		let classes = [styles.product];
		if (this.state.show) {
			classes.push(styles.show);
		}

		return (
			<div key={el.id} className={classes.join(' ')}>
				<Link to={'/' + categories[el.category].link + '/' + el.id}><AsyncImage path={'products/' + el.image + '.jpg'} /></Link>
				<h5><Link to={'/' + categories[el.category].link + '/' + el.id}>{el.name} - {el.color}</Link></h5>
				<span>${el.price}</span>
			</div>
		)
	}
}

export default Item;