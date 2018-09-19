import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Category.css';

const Category = props => {
	return (
		<Link to={props.path} className={styles.container} style={{backgroundImage: props.img}}>
			<img src={props.img} alt="category_photo" />
			<div className={styles.text}>
				<h3>{props.text}</h3>
			</div>
		</Link>
	);
}

export default Category;