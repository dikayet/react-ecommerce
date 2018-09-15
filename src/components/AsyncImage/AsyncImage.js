import React, { Component } from 'react';
import imagePlaceholder from '../../assets/icons/placeholder.jpg';

class AsyncImage extends Component {
	state = {
		image: null,
		updated: false
	}
	componentDidMount(){
		try {
			this.setState({
				image: require('../../assets/' + this.props.path),
				updated: true
			});
		} catch (error) {
			console.log(error);
		}
		
	}
	shouldComponentUpdate(nextProps, nextState) {
		return (this.props.path !== nextProps.path || !this.state.updated);
	}
	
	componentWillReceiveProps(nextProps){
		try {
			this.setState({
				image: require('../../assets/' + nextProps.path),
			});
		} catch (error) {
			console.log(error);
		}
		
	}
	render() {
		let image = imagePlaceholder;
		if (this.state.image) {
			image = this.state.image;
		}
		return (
			<img src={image} alt="product_image" {...this.props} />
		)
	}
}

export default AsyncImage;