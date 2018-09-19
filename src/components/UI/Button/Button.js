import React from 'react';

import styles from './Button.css';

const Button = props => {
	let btnClass = styles.bordered;
	if (props.look) {
		btnClass = styles[props.look]
	}
	return (
		<button className={btnClass} {...props}>{props.children}</button>
	)
}

export default Button;