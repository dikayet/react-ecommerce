import React, { Component } from 'react';

import AsyncImage from '../AsyncImage/AsyncImage'; 
import './Lightbox.css';


class Lightbox extends Component {
	state = {
		current: 0
	}

	componentDidMount(){
		this.setState({ current: this.props.current });
	}

	toLeft = () => {
		let current = this.state.current;
		if (current === 0) {
			current = this.props.images.length - 1;
		} else {
			current--;
		}
		this.setState({
			current
		});
	}
	toRight = () => {
		let current = this.state.current;
		if (current === this.props.images.length-1) {
			current = 0;
		} else {
			current++;
		}
		this.setState({
			current
		});
	}

	render() {
		return (
			<div className="lightbox">
				<AsyncImage path={'icons/arrowLeft.png'} onClick={this.toLeft} className="arrowLeft" />
				<AsyncImage path={'products/' + this.props.images[this.state.current] + '.jpg'} onClick={this.props.close.bind(this, this.state.current)} className="mainImage" />
				<AsyncImage path={'icons/arrowRight.png'} onClick={this.toRight} className="arrowRight" />
				<AsyncImage path={'icons/close.png'} onClick={this.props.close.bind(this, this.state.current)} className="lbExit" />
			</div>
		)
	}
}

export default Lightbox;
