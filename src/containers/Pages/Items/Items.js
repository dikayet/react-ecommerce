import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "../../../firebase-init";

import styles from './Items.css';
import { categories } from '../../../shared/exports';

import CategoryMenu from '../../CategoryMenu/CategoryMenu';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AsyncImage from '../../../components/AsyncImage/AsyncImage';
import Legend from '../../../components/UI/Legend/Legend';
import Input from '../../../components/UI/Input/Input';

const db = firebase.database();

class Items extends Component {
	state = {
		items: [],
		loading: true,
		category: categories[0],
		filter: 'bestselling'
	}
	componentDidMount(){
		if (localStorage.getItem('filter')) {
			this.setState({ filter: localStorage.getItem('filter') });
			console.log('filter set');
		}
		const category = this.getCategory(this.props.match.params.category);
		this.setState({ category });
		this.setItems();
	}

	getCategory(link){
		let category;
		for (let categ of categories) {
			if (categ.link === link) {
				category = categ;
				break;
			}
		}
		return category;
	}

	setItems(){
		this.setState({
			loading: true,
		});
		const productItems = db.ref('items').limitToFirst(20);
		switch (this.state.filter) {
			case 'lowtohigh':
				productItems.orderByChild('price');
				console.log('case');
				break;
		
			default:
				break;
		}
		productItems.once('value', snapshot => {
			const products = [];
			snapshot.forEach(child => {
				if (this.props.match.params.category === categories[child.val().category].link || this.props.match.params.category === 'all') {
					child.val().options.forEach(option => {
						products.push({
							id: child.key + '/' + option.color,
							name: child.val().name,
							price: child.val().price,
							category: child.val().category,
							color: option.color,
							image: option.images[0]
						});
					});
				}
			});
			this.setState({
				items: products,
				loading: false
			});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.location !== prevProps.location || this.state.filter !== prevState.filter) {
			this.setItems();
			const category = this.getCategory(this.props.match.params.category);
			this.setState({ category });
		}
	}

	getImage = (image) => {
		return import('../../../assets/products/' + image + '.jpg');
	}

	changeFilter = e => {
		this.setState({
			filter: e.target.value
		});
		localStorage.setItem('filter', e.target.value);
	}


	

	render() {
		let content = <Spinner />;
		if (!this.state.loading) {
			const test = Array.from(this.state.items);
			content = test.map(el => (
				<div key={el.id} className={styles.product}>
					<Link to={'/' + categories[el.category].link + '/' + el.id}><AsyncImage path={'products/' + el.image + '.jpg'}/></Link>
					<h5><Link to={'/' + this.state.category.link + '/' + el.id}>{el.name} - {el.color}</Link></h5>
					<span>${el.price}</span>
				</div>
			));
		}
		return (
				<CategoryMenu>
				<Legend elements={[
					{ path: '/', text: 'Home', link: true },
					{ text: this.state.category.name, link: false },
				]} />
				<div className={styles.filter}>
					<h2>{this.state.category.name}</h2>
					<Input element="select" value={this.state.filter} onChange={this.changeFilter}>
						<option value="featured">Featured</option>
						<option value="bestselling">Best Selling</option>
						<option value="lowtohigh">Price: low to high</option>
						<option value="hightolow">Price: high to low</option>
					</Input>
				</div>
						{content}
				</CategoryMenu>
		)
	}
}

export default Items;