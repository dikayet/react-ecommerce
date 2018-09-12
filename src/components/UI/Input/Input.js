import React from 'react';

import './Input.css';

const Input = props => {
	switch (props.element) {
		case 'input':
			return (
				<input className="input-generic" {...props}/>
			);
		case 'textarea':
		return (
			<teaxtarea className="input-generic" {...props}>{props.children}</teaxtarea>
			);
	
		default:
			break;
	}
}


export default Input;