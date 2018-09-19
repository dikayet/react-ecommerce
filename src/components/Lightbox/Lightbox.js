import React, { Component } from 'react';

import AsyncImage from '../AsyncImage/AsyncImage'; 
import styles from './Lightbox.css';


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
			<div className={styles.lightbox}>
				<AsyncImage path={'icons/arrowLeft.png'} onClick={this.toLeft} className={styles.left} />
				<AsyncImage path={'products/' + this.props.images[this.state.current] + '.jpg'} onClick={this.props.close.bind(this, this.state.current)} className={styles.image} />
				<AsyncImage path={'icons/arrowRight.png'} onClick={this.toRight} className={styles.right} />
				<AsyncImage path={'icons/close.png'} onClick={this.props.close.bind(this, this.state.current)} className={styles.close} />
			</div>
		)
	}
}

export default Lightbox;
