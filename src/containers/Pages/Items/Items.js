import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "../../../firebase-init";
import axios from 'axios';

import './Items.css';

import CategoryMenu from '../../CategoryMenu/CategoryMenu';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AsyncImage from '../../../components/AsyncImage/AsyncImage';

const db = firebase.database();

class Items extends Component {
	state = {
		items: [],
		loading: true
	}
	componentDidMount(){
		// let data = {
		// 	name: 'Suede Combat Boots',
		// 	category: 3,
		// 	price: 799.95,
		// 	desc: 'Featuring the COMBAT lace-up ankle boots. These shoes are made from 100% cow suede with soft leather lining for comfort. Construction details include an ankle high rise, waxed laces, tonal top stitching and a durable sole. An SPCC metal ingot is attached to the collar.',
		// 	options: [
		// 		{
		// 			color: 'Stone',
		// 			images: [
		// 				'jacket1',
		// 				'jacket2',
		// 				'jacket3',
		// 				'jacket4',
		// 				'jacket5',
		// 				'jacket6'
		// 			],
		// 			sizes: [
		// 				{
		// 					size: '6',
		// 					quant: 18
		// 				},
		// 				{
		// 					size: '8',
		// 					quant: 3
		// 				},
		// 				{
		// 					size: '10',
		// 					quant: 3
		// 				}
		// 			]
		// 		},
		// 		{
		// 			color: 'Grey',
		// 			images: [
		// 				'jacket1',
		// 				'jacket2',
		// 				'jacket3',
		// 				'jacket4',
		// 				'jacket5',
		// 				'jacket6'
		// 			],
		// 			sizes: [
		// 				{
		// 					size: '6',
		// 					quant: 18
		// 				},
		// 				{
		// 					size: '12',
		// 					quant: 3
		// 				},
		// 			]
		// 		}
		// 	]
		// }
		// axios.post('https://simple-14d89.firebaseio.com/items.json', data);
		this.setItems();
	}

	setItems(){
		this.setState({
			loading: true
		});
		const testItems = db.ref('items').limitToFirst(20);
		testItems.once('value', snapshot => {
			const products = [];
			snapshot.forEach(child => {
				if (this.props.match.params.category === 'outwear' || this.props.match.params.category === 'all') {
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
		if (this.props.location !== prevProps.location) {
			this.setItems();
		}
	}

	getImage = (image) => {
		return import('../../../assets/products/' + image + '.jpg');
	}


	

	render() {
		let content = <Spinner />;
		if (!this.state.loading) {
			const test = Array.from(this.state.items);
			content = test.map(el => (
				<div key={el.id} className="product">
					<Link to={'/' + this.props.match.params.category + '/' + el.id}><AsyncImage path={'products/' + el.image + '.jpg'}/></Link>
					<h5><Link to={'/' + this.props.match.params.category + '/' + el.id}>{el.name} - {el.color}</Link></h5>
					<span>${el.price}</span>
				</div>
			));
		}
		return (
				<CategoryMenu>
						<div className="legend">
							<Link to="/">Home</Link>
							<span> &gt; </span>
							<Link to={this.props.match.params.category}>{this.props.match.params.category}</Link>
						</div>
				<div className="filter">
					<h2>{this.props.match.params.category}</h2>
					<select defaultValue="lowtohigh_3" id="productsFilter">
						<option value="featured_3">Featured</option>
						<option value="bestselling_3">Best Selling</option>
						<option value="lowtohigh_3">Price: low to high</option>
						<option value="hightolow_3">Price: high to low</option>
					</select>
				</div>
						{content}
				</CategoryMenu>
		)
	}
}

export default Items;