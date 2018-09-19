import React, { Component, Fragment } from 'react';

import styles from './Home.css';

import Category from './Category/Category';

import accessories from '../../../assets/categories/accessories.jpg';
import footwear from '../../../assets/categories/footwear.jpg';
import denim from '../../../assets/categories/denim.jpg';
import outwear from '../../../assets/categories/outwear.jpg';
import pants from '../../../assets/categories/pants.jpg';
import shirts from '../../../assets/categories/shirts.jpg';
import tshirts from '../../../assets/categories/tshirts.jpg';
import shorts from '../../../assets/categories/shorts.jpg';

class Home extends Component {
	state = {
		categories: [
			['Accessories', accessories, '/accessories'],
			['Footwear', footwear, '/footwear'],
			['Denim', denim, '/denim'],
			['Outwear', outwear, '/outwear'],
			['Pants', pants, '/pants'],
			['Shirts', shirts, '/shirts'],
			['T-Shirts', tshirts, '/tshirts'],
			['Shorts', shorts, '/shorts'],
		],
		videoWidth: null
	}
	componentDidMount(){
		let width;
		this.interval = setInterval(() => {
			width = this.videoContainer.offsetWidth;
			if (this.state.videoWidth !== width) {
				this.setState({
					videoWidth: width
				});
		}}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	render() {
		// const iframePlaceholder = <div style={{ backgroundColor: '#ccc', width: this.state.videoWidth, height: this.state.videoWidth / 1.77}}></div>;
		return (
			<Fragment>
				<div className={styles.categories}>
					{this.state.categories.map(el => (
						<Category key={el[0]} text={el[0]} img={el[1]} path={el[2]} />
					))}
				</div>
				<section className={styles.videoHome} ref={ref => this.videoContainer = ref} >
					<h2>Allow your style to match your ambition!</h2>
					<iframe src="https://player.vimeo.com/video/225104384?byline=0&amp;portrait=0" width={this.state.videoWidth} height={this.state.videoWidth/1.77} frameBorder="0" title="video"></iframe>
				</section>
			</Fragment>
		);
	}
}


export default Home;