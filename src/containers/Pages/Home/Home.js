import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

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
			['Accessories', accessories, '/categories/accessories'],
			['Footwear', footwear, '/categories/footwear'],
			['Denim', denim, '/categories/denim'],
			['Outwear', outwear, '/categories/outwear'],
			['Pants', pants, '/categories/pants'],
			['Shirts', shirts, '/categories/shirts'],
			['T-Shirts', tshirts, '/categories/tshirts'],
			['Shorts', shorts, '/categories/shorts'],
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
				console.log('resize');
		}}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	render() {
		return (
			<Fragment>
				<div className="home-categories">
					{this.state.categories.map(el => (
						<Category key={el[0]} text={el[0]} img={el[1]} path={el[2]} />
					))}
				</div>
				<section className="video-home" ref={ref => this.videoContainer = ref} >
					<h2>Allow your style to match your ambition!</h2>
					<iframe src="https://player.vimeo.com/video/225104384?byline=0&amp;portrait=0" width={this.state.videoWidth} height={this.state.videoWidth/1.77} frameBorder="0" title="video"></iframe>
				</section>
				<section className="subs">
					<ul class="subs__links">
						<h4>Links</h4>
						<li><Link to="/news">News</Link></li>
						<li><Link to="/story">Our Story</Link></li>
						<li><Link to="/faq">FAQ</Link></li>
						<li><Link to="/policies">Return Policy</Link></li>
						<li><Link to="/contact">Contact</Link></li>
					</ul>
					<div className="subs__email-form">
						<h4>Be in the know</h4>
						<p>Sign up for the latest news, offers and styles</p>
						<form onSubmit={this.onSubsSubmit}>
							<input type="email" placeholder="Your email" />
							<button type="submit">Subscribe</button>
						</form>
					</div>
				</section>
			</Fragment>
		)
	}
}


export default Home;