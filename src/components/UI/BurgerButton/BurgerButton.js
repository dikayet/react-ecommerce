import React from 'react';

import styles from './BurgerButton.css';

const BurgerButton = props => {
	const classes = [styles.btn];
	if (props.open) {
		classes.push(styles.open);
	}
	return (
		<div className={classes.join(' ')} {...props}>
			<span className={styles.span1}></span>
			<span className={styles.span1}></span>
			<span className={styles.span1}></span>
			<span className={styles.span1}></span>
		</div>
	)
}

export default BurgerButton;
