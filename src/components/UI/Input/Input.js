import React from 'react';

import styles from './Input.css';

const Input = props => {
	switch (props.element) {
		case 'input':
			return (
				<input className={styles.email} {...props}/>
			);
		case 'textarea':
		return (
			<teaxtarea className={styles.email} {...props}>{props.children}</teaxtarea>
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