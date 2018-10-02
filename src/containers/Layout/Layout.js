import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import styles from './Layout.css';
import Wrapper from '../Wrapper/Wrapper';
import Navigation from '../Navigation/Navigation';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';


class Layout extends Component {
	state = {
		email: '',
		sendingEmail: false,
		error: false
	}
	componentWillReceiveProps(nextProps){
		if (this.props.location.pathname !== nextProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}
	onEmailChange = e => {
		this.setState({
			email: e.target.value
		})
	}
	sendEmail = e => {
		e.preventDefault();
		const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (!this.state.email.match(regex)) {
			this.setState({
				error: true
			});
			return;
		}
		this.setState({
			error: false,
			sendingEmail: true
		});
		const data = {
			service_id: 'gmail',
			template_id: 'simple_com',
			user_id: 'user_p3XK8GXe7y8L2mtTOosRK',
			template_params: {
				'email': this.state.email
			}
		};
		axios.post('https://api.emailjs.com/api/v1.0/email/send', data)
			.then(result => {
				this.setState({
					sendingEmail: false
				});
				this.props.history.push('/msg/email_success');
			})
			.catch(err => {
				this.setState({
					sendingEmail: false
				});
				this.props.history.push('/msg/email_error');
			});
	}
	render() {
		return (
			<div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
			<Navigation />
				<Wrapper>
					{this.props.children}
				</Wrapper>
			<div style={{marginTop:'auto'}}>
				<Wrapper>
					<section className={styles.subs}>
						<ul className={styles.links}>
							<h4>Links</h4>
							<li><Link to="/news">News</Link></li>
							<li><Link to="/story">Our Story</Link></li>
							<li><Link to="/faq">FAQ</Link></li>
							<li><Link to="/policies">Return Policy</Link></li>
							<li><Link to="/contact">Contact</Link></li>
						</ul>
						<div className={styles.container}>
							<h4>Be in the know</h4>
							<p>Sign up for the latest news, offers and styles</p>
								<form onSubmit={this.onSubsSubmit} className={styles.form}>
								<div className={styles.input}>
									<Input onChange={this.onEmailChange} element="input" type="email" placeholder="Your Email" />
								</div>
								<div className={styles.button}>
									<Button onClick={this.sendEmail} look="solid" type="submit" style={{position: 'relative'}}>{this.state.sendingEmail ? 'Sending...' : 'Subscribe'}</Button>
								</div>
							</form>
						</div>
					</section>
				</Wrapper>
			</div>
			<footer>
				<Wrapper>
					<p>Copyright © 2017-2018, eCommerce Example Website by dikayet, showcase purpose only.</p>
				</Wrapper>
			</footer>
			</div>
		)
	}
}

export default withRouter(Layout);