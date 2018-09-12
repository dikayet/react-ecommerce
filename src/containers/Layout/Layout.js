import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Layout.css';
import Wrapper from '../Wrapper/Wrapper';
import Navigation from '../Navigation/Navigation';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';


class Layout extends Component {
	render() {
		return (
			<Fragment>
			<Navigation />
			<Wrapper>
				{this.props.children}
				<section className="subs">
					<ul className="subs__links">
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
							<div className="input">
								<Input element="input" type="email" placeholder="Your Email" />
							</div>
							<div className="button">
								<Button type="submit">Subscribe</Button>
							</div>
						</form>
					</div>
				</section>
				<footer>
					<p>Copyright © 2017-2018, eCommerce Example Website by dikayet, showcase purpose only.</p>
				</footer>
			</Wrapper>
			</Fragment>
		)
	}
}

export default Layout;