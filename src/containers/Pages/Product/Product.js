import React, { Component, Fragment } from 'react';
import firebase from '../../../firebase-init';

import { Link } from 'react-router-dom';

import './Product.css';

import CategoryMenu from '../../CategoryMenu/CategoryMenu';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AsyncImage from '../../../components/AsyncImage/AsyncImage';
import Lightbox from '../../../components/Lightbox/Lightbox';
import { throws } from 'assert';

const db = firebase.database();
class Product extends Component {

	state = {
		product: null,
		loading: true,
		lightbox: false,
		currentImage: 0,
		purchaseValues: {
			size: '',
			quant: 1
		}
	}

	getProduct = (id, color) => {
		db.ref('items/' + id).once('value').then(snapshot => {
			const option = snapshot.val().options.find(el => el.color === color);
			const product = {
				...snapshot.val(),
				id: snapshot.key,
				color,
				sizes: option.sizes,
				images: option.images
			};
			let initSize;
			for(let size of option.sizes){
				if (size.quant > 0) {
					initSize = size.size
				}
			}
			this.setState({
				product,
				loading: false,
				purchaseValues: {
					...this.state.purchaseValues,
					size: initSize
				}
			});
		});
	}

	componentDidMount(){
		this.getProduct(this.props.match.params.id, this.props.match.params.color);
	}
	componentWillReceiveProps(nextProps){
		if (this.props.match.params.color !== nextProps.match.params.color) {
			this.getProduct(nextProps.match.params.id, nextProps.match.params.color);
		}
	}

	openLightbox = () => {
		this.setState({
			lightbox: true
		});
	}
	closeLightbox = (index) => {
		this.setState({
			lightbox: false,
			currentImage: index
		});
	}

	setCurrentImage = index => {
		this.setState({ currentImage: index });
	}

	updateValue = e => {
		this.setState({
			purchaseValues: {
				...this.state.purchaseValues,
				[e.target.name]: e.target.value
			}
		});
	}

	onQuantBlur = e => {
		if (e.target.value === '') {
			this.setState({
				purchaseValues: {
					...this.state.purchaseValues,
					quant: 1
				}
			});
		}
	}

	onColorChange = e => {
		const id = this.props.match.params.id;
		const category = this.props.match.params.category;
		const color = e.target.value;
		console.log('/' + category + '/' + id + '/' + color);
		this.props.history.push('/' + category + '/' + id + '/' + color);
	}

	addToCart = () => {
		const data = {
			id: this.state.product.id,
			color: this.state.product.color,
			size: this.state.purchaseValues.size,
			quant: this.state.purchaseValues.quant,
		}
		console.log(data);
	}

	render() {
		let content = <Spinner />
		if (this.state.lightbox) {
			return (
				<Lightbox images={this.state.product.images} close={this.closeLightbox} current={this.state.currentImage}/>
			);
		}
		if (!this.state.loading) {
			content = (
				<Fragment>
				<div className="legend">
					<Link to="/">Home</Link>
					<span> &gt; </span>
					<Link to={'/' + this.props.match.params.category}>{this.props.match.params.category}</Link>
					<span> &gt; </span>
						<Link to={this.props.history.location.pathname}>{this.state.product.name}</Link>
				</div>

				{/*  */ }

			<div className="flex-container product-container">
				<div className="product-gallery">
							<AsyncImage path={'products/' + this.state.product.images[this.state.currentImage] + '.jpg'} onClick={this.openLightbox}/>
						<div className="sub-gallery" id="subGallery">
						{this.state.product.images.map((img, index) => (
									<AsyncImage key={img} path={'products/' + img + '.jpg'} onClick={this.setCurrentImage.bind(this, index)}/>
						))}
						</div>
				</div>
				<div className="product-content">
					<h2>{this.state.product.name}</h2>
					<span>${this.state.product.price}</span>
					<div className="details">
						<div className="select-group">
									<label htmlFor="color">Color</label>
									<select className="input" name="color" id="color" onChange={this.onColorChange} defaultValue={this.state.product.color}>
								{this.state.product.options.map(option => (
											<option key={option.color} value={option.color}>{option.color}</option>
								))}
							</select>
						</div>
						<div className="select-group">
							<label htmlFor="size">Size</label>
									<select className="input" name="size" onChange={this.updateValue} defaultValue={this.state.purchaseValues.size} id="size">
										{this.state.product.sizes.map(size => (
											<option disabled={size.quant === 0} key={size.size} value={size.size}>{size.size}{size.quant < 1 ? ' (out of stock)' : size.quant === 1 ? ' (last item)' : ''}</option>
										))}
							</select>
						</div>
						<div className="select-group">
							<label htmlFor="size">Quantity</label>
								<input className="input" onBlur={this.onQuantBlur} name="quant" type="number" id="productId" onChange={this.updateValue} value={this.state.purchaseValues.quant} />
						</div>
					</div>
					<div id="containerButtons">
						<button className="btn" onClick={this.addToCart}>Add to cart</button>
					</div>


					<p className="demonstration">This is a demonstration store. You can purchase products like this from <a href="https://www.spccstore.com" target="_blank">Sergeant Pepper Clothing Co.</a></p>

					<p className="descProduct">{this.state.product.desc}</p>
				</div>
			</div>
			</Fragment>
			);
		}
		return (
			<CategoryMenu>
				{content}
			</CategoryMenu>
		)
	}
}

export default Product;