import React from 'react';
import styles from './Wrapper.css';

const Wrapper = props => {
	return (
		<div className={styles.wrapper}>
			{props.children}
		</div>
	)
}
export default Wrapper;