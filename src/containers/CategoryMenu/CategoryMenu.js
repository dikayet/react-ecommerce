import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

import styles from './CategoryMenu.css';
import { categories } from '../../shared/exports';

import BurgerButton from '../../components/UI/BurgerButton/BurgerButton';

class CategoryMenu extends Component {
	state = {
		open: false,
	}

	toggleMenu = e => {
		this.setState({
			open: !this.state.open
		});
	}

	render() {
		let	categoriesList = (
			<ul className={styles.list}>
				{categories.map(el => (
					<li key={el.link}><Link style={this.props.match.params.category === el.link ? {
						fontSize: '1.5rem',
						fontWeight: '700'
					} : null} onClick={this.toggleMenu} to={'/' + el.link}>{el.name}</Link></li>
				))}
			</ul>
		);
		return (
			<div className={styles.container}>
				<div className={styles.mobile}>
					<BurgerButton style={{marginBottom: '1.8rem'}} onClick={this.toggleMenu} open={this.state.open}/>
					{this.state.open ? categoriesList : null}
				</div>
				<div className={styles.desktop}>
					{categoriesList}
				</div>
				<div className={styles.content}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default withRouter(CategoryMenu);