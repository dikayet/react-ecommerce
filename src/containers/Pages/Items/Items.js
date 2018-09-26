import React, { Component } from 'react';
import firebase from "../../../firebase-init";

import styles from './Items.css';
import { categories, filters } from '../../../shared/exports';

import CategoryMenu from '../../CategoryMenu/CategoryMenu';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Legend from '../../../components/UI/Legend/Legend';
import Input from '../../../components/UI/Input/Input';
import Item from './Item/Item';

const db = firebase.database();

class Items extends Component {
	state = {
		items: [],
		loading: true,
		category: categories[0],
		filter: 0,
		search: false
	}
	componentDidMount(){
		if (localStorage.getItem('filter')) {
			this.setState({ filter: localStorage.getItem('filter') });
		}
		if (this.props.match.params.category === 'search') {
			document.title = 'Search';
			this.setState({ search: true, category: {name: 'Search'} });
			this.setItems(true);
			return;
		}
		const category = this.getCategory(this.props.match.params.category);
		if(!category){
			this.props.history.replace('/');
			return;
		}
		document.title = category.name;
		this.setState({ category });
		this.setItems();
	}

	sortFunction = (a,b) => {
		switch (+localStorage.getItem('filter')) {
			case 0: return a.sold - b.sold;
			case 1: return a.sold - b.sold;
			case 2: return a.price - b.price;
			case 3: return b.price - a.price;

			default: break;
		}
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

	setItems(search){
		this.setState({
			loading: true,
		});
		const productItems = db.ref('items').limitToFirst(20);
		productItems.once('value', snapshot => {
			const products = [];
			if (search) {
				snapshot.forEach(child => {
					let match = false;
					const name = child.val().name.toLowerCase();
					const query = this.props.match.params.query.toLowerCase().split(' ');
					query.forEach(word => {
						if (name.search(word) >= 0) {
							match = true;
						}
					});
					(this.props.match.params.query.toLowerCase());
					child.val().options.forEach(option => {
						if (match) {
							products.push({
								id: child.key + '/' + option.color,
								name: child.val().name,
								price: +child.val().price,
								category: +child.val().category,
								color: option.color,
								image: option.images[0],
								sold: +option.sold
							});
						 } else if (query.length === 1){
							if (query[0] === option.color.toLowerCase()) {
								products.push({
									id: child.key + '/' + option.color,
									name: child.val().name,
									price: +child.val().price,
									category: +child.val().category,
									color: option.color,
									image: option.images[0],
									sold: +option.sold
								});
							}
						}
					});
				});
			} else {
				snapshot.forEach(child => {
					if (this.props.match.params.category === categories[child.val().category].link || this.props.match.params.category === 'all') {
						child.val().options.forEach(option => {
							products.push({
								id: child.key + '/' + option.color,
								name: child.val().name,
								price: child.val().price,
								category: child.val().category,
								color: option.color,
								image: option.images[0],
								sold: option.sold
							});
						});
					}
				});
			}
			this.setState({
				items: products.sort(this.sortFunction),
				loading: false
			});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.location !== prevProps.location || this.state.filter !== prevState.filter) {
			if (this.props.match.params.category === 'search') {
				document.title = 'Search';
				this.setState({ search: true, category: { name: 'Search' } });
				this.setItems(true);
				return;
			}
			this.setItems();
			const category = this.getCategory(this.props.match.params.category);
			document.title = category.name;
			this.setState({ category });
		}
	}

	getImage = (image) => {
		return import('../../../assets/products/' + image + '.jpg');
	}

	changeFilter = e => {
		this.setState({
			filter: +e.target.value
		});
		localStorage.setItem('filter', +e.target.value);
	}

	render() {
		let content = <Spinner />;
		if (!this.state.loading) {
			if (this.state.items.length < 1) {
				content = <p style={{ marginTop: '15%', textAlign: 'center'}}>No Products</p>
			} else {
				let test = Array.from(this.state.items);
				content = test.map((el, index) => (
						<Item key={el.id} el={el} index={index}/>
				));
			}
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
						{filters.map((filter, index) => <option key={index} value={index}>{filter}</option>)}
					</Input>
				</div>
						{content}
				</CategoryMenu>
		)
	}
}

export default Items;