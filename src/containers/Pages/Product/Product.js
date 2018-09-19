import React, { Component, Fragment } from 'react';
import firebase from '../../../firebase-init';
import { connect } from 'react-redux';

import styles from './Product.css';
import { categories } from '../../../shared/exports';

import { addToCart } from '../../../store/actions/cart';

import CategoryMenu from '../../CategoryMenu/CategoryMenu';
import Spinner from '../../../components/UI/Spinner/Spinner';
import AsyncImage from '../../../components/AsyncImage/AsyncImage';
import Lightbox from '../../../components/Lightbox/Lightbox';
import Legend from '../../../components/UI/Legend/Legend';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

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
		},
		category: null,
		addedToCart: false
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
		let category = this.getCategory(this.props.match.params.category);
		this.setState({ category });
		this.getProduct(this.props.match.params.id, this.props.match.params.color);
	}
	componentWillReceiveProps(nextProps){
		let category = this.getCategory(nextProps.match.params.category);
		this.setState({ category });
		if (
			this.props.match.params.color !== nextProps.match.params.color 
			|| 
			this.props.match.params.id !== nextProps.match.params.id
			) {
			this.getProduct(nextProps.match.params.id, nextProps.match.params.color);
			this.setState({ addedToCart: false });
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
			},
			addedToCart: false
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

	getCategory(link) {
		let category;
		for (let categ of categories) {
			if (categ.link === link) {
				category = categ;
				break;
			}
		}
		return category;
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
			name: this.state.product.name,
			color: this.state.product.color,
			size: this.state.purchaseValues.size,
			image: this.state.product.images[0],
			category: this.state.product.category,
			quant: 1,
			price: this.state.product.price
		}
		this.props.addToCart(data);
		this.setState({ addedToCart: true });
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
					<Legend elements={[
						{ path: '/', text: 'Home', link: true },
						{ path: '/' + this.state.category.link, text: this.state.category.name, link: true },
						{ text: this.state.product.name, link: false },
					]} />

				{/*  */ }

			<div className={styles.container}>
				<div className={styles.gallery}>
							<AsyncImage path={'products/' + this.state.product.images[this.state.currentImage] + '.jpg'} onClick={this.openLightbox}/>
						<div className={styles.subGallery}>
						{this.state.product.images.map((img, index) => (
									<AsyncImage key={img} path={'products/' + img + '.jpg'} onClick={this.setCurrentImage.bind(this, index)}/>
						))}
						</div>
				</div>
				<div className={styles.content}>
					<h2>{this.state.product.name}</h2>
					<span>${this.state.product.price}</span>
					<div className={styles.details}>
						<div className={styles.selectGroup}>
									<label htmlFor="color">Color</label>
									<Input element="select" name="color" id="color" onChange={this.onColorChange} defaultValue={this.state.product.color}>
								{this.state.product.options.map(option => (
											<option key={option.color} value={option.color}>{option.color}</option>
								))}
							</Input>
						</div>
						<div className={styles.selectGroup}>
							<label htmlFor="size">Size</label>
									<Input element="select" name="size" onChange={this.updateValue} defaultValue={this.state.purchaseValues.size} id="size">
									{this.state.product.sizes.map(size => (
										<option disabled={size.quant === 0} key={size.size} value={size.size}>{size.size}{size.quant < 1 ? ' (out of stock)' : size.quant === 1 ? ' (last item)' : ''}</option>
									))}
							</Input>
						</div>
					</div>
					<div className={styles.containerButtons} style={{marginTop: '2rem'}}>
								{this.state.addedToCart ? (
									<Fragment>
										<Button look="solid" style={{marginRight: '.5rem'}} onClick={() => this.props.history.push('/cart')}>View Cart</Button>
										<Button onClick={() => this.props.history.push('/all')}>Continue Shopping</Button>
									</Fragment>
								) : <Button onClick={this.addToCart}>Add to cart</Button>}
					</div>


					<p className={styles.demonstration}>This is a demonstration store. You can purchase products like this from <a href="https://www.spccstore.com" target="_blank" rel="noopener noreferrer">Sergeant Pepper Clothing Co.</a></p>

					<p className={styles.desc}>{this.state.product.desc}</p>
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

const mapStateToProps = state => ({
	cart: state.cart
});

const mapDispatchToProps = dispatch => ({
	addToCart: (product) => dispatch(addToCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);