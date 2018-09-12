import React, { Component, Fragment } from 'react';
import { Link, withRouter} from 'react-router-dom';

import './Navigation.css';

import Wrapper from '../Wrapper/Wrapper';

import logo from '../../assets/icons/logo.png';
import searchIcon from '../../assets/icons/search.png';
import closeIcon from '../../assets/icons/close.png';
import cartIcon from '../../assets/icons/cart.png';

class Navigation extends Component {
	state = {
		searching: false,
		value: '',
		mobileSearch: false,
		searchPage: false
	}

	onSearchChange = e => {
		this.setState({
			searching: true,
			value: e.target.value,
		});
	}

	onSearchClose = e => {
		if (this.state.searching) {
			this.setState({
				value: '',
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

	onSearchSubmit = e => {
		e.preventDefault();
		this.props.history.push('/search/' + encodeURIComponent(this.state.value));
		console.log(this.searchInputRef.value);
		this.setState({
			value: '',
			searching: false,
			searchPage: true,
			mobileSearch: false,
		});
		this.searchInputRef.blur();
	}

	render() {
		const inputIcon = this.state.searching ? closeIcon : searchIcon;
		let mobileSearch;
		if (this.state.mobileSearch) {
			mobileSearch = (
				<form className="nav-top__search--mobile" onSubmit={this.onSearchSubmit}>
					<input type="text" autoFocus ref={ref => this.mobileInput = ref} />
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
						<img onClick={this.onSearchClickMobile} className="nav-top__input-icon--mobile" src={inputIcon} alt="search_icon" />
						<Link to="/cart" className="nav-top__cart-icon--mobile">
							<img src={cartIcon} alt="cart_icon" />
						</Link>

						{/* FOR DESKTOP */}
						<form onSubmit={this.onSearchSubmit} className="nav-top__input-container--desktop">
							<button type="submit">
								<img onClick={this.onSearchClose} className="nav-top__input-icon" src={searchIcon} alt="search_icon" />
							</button>
							<input
								className="nav-top__input"
								type="text"
								placeholder="Search"
								value={this.state.value}
								onFocus={this.onSearchFocus}
								onBlur={this.onSearchBlur}
								onChange={this.onSearchChange}
								ref={ref => this.searchInputRef = ref}
								/>
						</form>
						<div className="nav-top__cart-container--desktop">
							<img className="nav-top__cart-icon" src={cartIcon} alt="cart_icon" />
							<span className="nav-top__cart-span">Cart(0)</span>
						</div>

					</div>

				</Wrapper>
				{mobileSearch}
			</nav>
			<div className="top-margin"></div>
		</Fragment>
		)
	}
}


export default withRouter(Navigation);