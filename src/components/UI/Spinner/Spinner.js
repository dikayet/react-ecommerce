import React from 'react';

import spinnerGif from '../../../assets/icons/loader.gif';

const Spinner = props => {
	return (
		<img style={{width: '15rem', margin: '0 auto', ...props.style}} src={spinnerGif} alt="Loading..."/>
	)
}

export default Spinner;