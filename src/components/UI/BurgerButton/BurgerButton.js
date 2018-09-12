import React from 'react';

import './BurgerButton.css';

const BurgerButton = props => {
	const classes = ['BurgerButton'];
	if (props.open) {
		classes.push('open');
	}
	return (
		<div className={classes.join(' ')} {...props}>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	)
}

export default BurgerButton;
