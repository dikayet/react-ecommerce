import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from './Legend.css';

const Legend = props => {
	const legend = props.elements.map(el => {
		if (el.link) {
			return <Link key={el.text} to={el.path}>{el.text}</Link>;
		} else {
			return <span key={el.text}>{el.text}</span>;
		}
	});
	return (
		<div className={styles.legend}>
			{legend.map((el, i) => (
				<Fragment key={i} >
					{i !== 0 ? <span> &gt; </span> : null}
					{el}
				</Fragment>
			))}
		</div>
	)
}

export default Legend;