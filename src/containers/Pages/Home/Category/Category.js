import React from 'react';
import { Link } from 'react-router-dom';

import './Category.css';

const Category = props => {
	return (
		<Link to={props.path} className="category-home" style={{backgroundImage: props.img}}>
			<img src={props.img} alt="category_photo" />
			<div className="category-home__text">
				<h3>{props.text}</h3>
			</div>
		</Link>
	)
}

export default Category;