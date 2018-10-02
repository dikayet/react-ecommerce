import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import styles from './Item.css';
import { categories } from '../../../../shared/exports';

import AsyncImage from '../../../../components/AsyncImage/AsyncImage';

class Item extends Component {

	state = {
		show: false,
		image: null,
		index: 0
	}

	componentDidMount(){
		this.setState({image: this.props.el.images[0]})
		setTimeout(() => {
			this.setState({ show: true });
		}, 100*this.props.index);
	}

	onHover = () => {
		this.interval = setInterval(()=> {
			let num = this.props.el.images.length;
			let index;
			if(this.state.index+1 >= num){
				index = 0;
			} else {
				index = this.state.index + 1;
			}
			this.setState({
				image: this.props.el.images[index],
				index
			})
		}, 500);
	}

	onBlur = () => {
		clearInterval(this.interval);
		this.setState({
			image: this.props.el.images[0],
			index: 0
		})
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	render(){
		const { el } = this.props;
		let classes = [styles.product];
		if (this.state.show) {
			classes.push(styles.show);
		}

		return this.state.image ? (
			<div key={el.id} className={classes.join(' ')}>
				<Link to={'/' + categories[el.category].link + '/' + el.id}><AsyncImage onMouseEnter={this.onHover} onMouseLeave={this.onBlur} path={'products/' + this.state.image + '.jpg'} /></Link>
				<h5><Link to={'/' + categories[el.category].link + '/' + el.id}>{el.name} - {el.color}</Link></h5>
				<span>${el.price}</span>
			</div>
		) : null;
	}
}

export default Item;