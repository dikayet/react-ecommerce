import React from 'react';

import styles from './Input.css';

const Input = props => {
	switch (props.element) {
		case 'input':
			return (
				<input className={styles.input} {...props}/>
			);
		case 'textarea':
		return (
			<textarea className={styles.input} {...props}>{props.children}</textarea>
			);
		case 'select':
			return (
				<select className={styles.select} {...props}>{props.children}</select>
			);
	
		default:
			break;
	}
}


export default Input;