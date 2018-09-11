import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './WithNavigation.css';
import Wrapper from '../Wrapper/Wrapper';

import logo from '../../assets/icons/logo.png';
import searchIcon from '../../assets/icons/search.png';
import closeIcon from '../../assets/icons/close.png';
import cartIcon from '../../assets/icons/cart.png';


class WithNavigation extends Component {
	state = {
		searching: false,
		value: 'Search',
		mobileSearch: false
	}

	searchOnChange = e => {
		this.setState({
			searching: true,
			value: e.target.value,
		});
	}
	searchOnFocus = e => {
		if (this.state.value === 'Search') {
			this.setState({
				value: ''
			});
		}
	}
	searchOnBlur = e => {
		if (this.state.value === '') {
			this.setState({
				value: 'Search',
				searching: false
			});
		}
	}

	searchClose = e => {
		if (this.state.searching) {
			this.setState({
				value: 'Search',
				searching: false
			});
		}
	}

	onSearchClickMobile = e => {
		this.setState({
			mobileSearch: !this.state.mobileSearch,
			searching: !this.state.searching
		});
	}
	searchSubmitMobile = e => {
		e.preventDefault();
		this.setState({
			value: this.mobileInput.value,
			searching: false,
			mobileSearch: false
		});
	}

	render() {
		const inputIcon = this.state.searching ? closeIcon : searchIcon;
		let mobileSearch;
		if (this.state.mobileSearch) {
			mobileSearch = (
					<form className="nav-top__search--mobile" onSubmit={this.searchSubmitMobile}>
						<input type="text" autoFocus ref={ref => this.mobileInput = ref}/>
						<button type="submit">Go</button>
					</form>
			);
		}
		return (
			<Fragment>
				<nav className="nav-top">
					<Wrapper>
						<div className="nav-top__flex">
							<Link to="/">
								<img className="nav-top__logo" src={logo} alt="logo" />
							</Link>

							{/* FOR MOBILE */}
							<img onClick={this.onSearchClickMobile}className="nav-top__input-icon--mobile" src={inputIcon} alt="search_icon" />
							<Link to="/cart" className="nav-top__cart-icon--mobile">
								<img src={cartIcon} alt="cart_icon" />
							</Link>

							{/* FOR DESKTOP */}
							<div className="nav-top__input-container--desktop">
								<img onClick={this.searchClose} className="nav-top__input-icon" src={inputIcon} alt="search_icon" />
								<input
									className="nav-top__input"
									type="text"
									value={this.state.value}
									onFocus={this.searchOnFocus}
									onBlur={this.searchOnBlur}
									onChange={this.searchOnChange}
									/>
							</div>
							<div className="nav-top__cart-container--desktop">
								<img className="nav-top__cart-icon" src={cartIcon} alt="cart_icon" />
								<span className="nav-top__cart-span">Cart(0)</span>
							</div>

						</div>
						
					</Wrapper>
					{mobileSearch}
			</nav>
			<Wrapper>
				{this.props.children}
					<footer>
						<p>Copyright © 2017-2018, eCommerce Example Website by dikayet, showcase purpose only.</p>
					</footer>
			</Wrapper>
			</Fragment>
		)
	}
}

export default WithNavigation;