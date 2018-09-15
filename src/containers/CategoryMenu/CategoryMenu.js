import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

import './CategoryMenu.css';

import BurgerButton from '../../components/UI/BurgerButton/BurgerButton';

class CategoryMenu extends Component {
	state = {
		open: false,
		categories: [
			['All', 'all'],
			['Accessories', 'accessories'],
			['Footwear', 'footwear'],
			['Denim', 'denim'],
			['Outwear', 'outwear'],
			['Pants', 'pants'],
			['Shirts', 'shirts'],
			['T-Shirts', 'tshirts'],
			['Shorts', 'shorts'],
		]
	}

	toggleMenu = e => {
		this.setState({
			open: !this.state.open
		});
	}

	render() {
		let	categories = (
			<ul className="categoryList">
				{this.state.categories.map(el => (
					<li key={el[1]}><Link style={this.props.match.params.category === el[1] ? {
						fontSize: '1.5rem',
						fontWeight: '700'
					} : null} onClick={this.toggleMenu} to={'/' + el[1]}>{el[0]}</Link></li>
				))}
			</ul>
		);
		return (
			<div className="withCategoryMenu">
				<div className="categoryMenu--mobile">
					<BurgerButton style={{marginBottom: '1.8rem'}} onClick={this.toggleMenu} open={this.state.open}/>
					{this.state.open ? categories : null}
				</div>
				<div className="categoryMenu--desktop">
					{categories}
				</div>
				<div className="withCategoryMenuContent">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default withRouter(CategoryMenu);