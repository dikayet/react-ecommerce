import React, { Component, Fragment } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './Navigation.css';

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
		searchPage: false,
		cartAmount: 0
	}

	componentDidMount(){
		const nextNum = this.props.cart.reduce((sum, el) => sum + el.quant, 0);
		if (nextNum !== this.state.cartAmount) {
			this.setState({ cartAmount: +nextNum });
		}
	}

	componentWillReceiveProps(nextProps){
		const nextNum = nextProps.cart.reduce((sum, el) => sum + el.quant, 0);
		if(nextNum !== this.state.cartAmount){
			this.setState({ cartAmount: +nextNum });
		}
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
		if (this.state.value.length < 1) return;
		this.props.history.push('/search/' + encodeURIComponent(this.state.value));
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
				<form className={styles.searchForm} onSubmit={this.onSearchSubmit}>
					<input type="text" autoFocus ref={ref => this.mobileInput = ref} onChange={this.onSearchChange} />
				</form>
			);
		}
		return (
			<Fragment>
				<nav className={styles.nav}>
				<Wrapper>
					<div className={styles.flex}>
						<Link to="/">
							<img className={styles.logo} src={logo} alt="logo" />
						</Link>

						{/* FOR MOBILE */}
						<img onClick={this.onSearchClickMobile} className={styles.searchIcon} src={inputIcon} alt="search_icon" />
						<Link to="/cart" style={{position: 'relative'}} className={styles.cartIcon}>
							<img src={cartIcon} alt="cart_icon" />
								<div><span>{ this.state.cartAmount }</span></div>
						</Link>

						{/* FOR DESKTOP */}
						<form onSubmit={this.onSearchSubmit} className={styles.containerInput}>
							<button type="submit">
									<img onClick={this.onSearchClose} className={styles.searchIcon_desktop} src={searchIcon} alt="search_icon" />
							</button>
							<input
								className={styles.search}
								type="text"
								placeholder="Search"
								value={this.state.value}
								onFocus={this.onSearchFocus}
								onBlur={this.onSearchBlur}
								onChange={this.onSearchChange}
								ref={ref => this.searchInputRef = ref}
								/>
						</form>
						<Link to="/cart" className={styles.containerCart}>
								<img className={styles.cartIcon_desktop} src={cartIcon} alt="cart_icon" />
								<div style={{ display: 'flex', flexWrap: 'nowrap' }} className={styles.span}><span style={{marginRight: '.4rem'}}>Cart</span><span style={{fontWeight: '700', fontSize: '1.1rem'}}>{this.state.cartAmount}</span></div>
						</Link>

					</div>
					{mobileSearch}
				</Wrapper>
			</nav>
				<div className={styles.margin}></div>
		</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	cart: state.cart.products
});

export default connect(mapStateToProps)(withRouter(Navigation));