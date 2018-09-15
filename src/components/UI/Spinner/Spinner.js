import React from 'react';

import spinnerGif from '../../../assets/icons/loader.gif';

const Spinner = () => {
	return (
		<img style={{width: '15rem', margin: '0 auto'}} src={spinnerGif} alt="Loading..."/>
	)
}

export default Spinner;