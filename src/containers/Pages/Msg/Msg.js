import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { cartDiscard } from '../../../store/actions/cart';

import Button from '../../../components/UI/Button/Button';

const Msg = props => {
	let btn = <Button style={{ margin: '0 auto', marginTop: '2rem', display: 'block' }
	} onClick={() => props.history.push('/all')}>Continue Shopping</Button>;
	let msg;
	switch (props.match.params.msg) {
		case 'email_success':
			msg = (<p style={{ width: '50%', margin: '0 auto' }}>Thank you for being interested in my portfolio website, to contact me please visit my <a href="https://dikayet.000webhostapp.com">website</a> or just reply to an email you are about to recieve.{btn}</p>)
			break;

		case 'email_error':
			msg = <p>Opps...Something went wrong {btn}</p>
			break;

		case 'checkout':
			msg = (
				<p style={{ width: '50%', margin: '0 auto' }}>Thank you for being interested in my portfolio website, to contact me please: <Button style={{ marginTop: '2rem' }} onClick={e => window.location.href = 'https://dikayet-portfolio.netlify.com'}>visit my website</Button></p>
			);
			localStorage.removeItem('cart');
			props.discardCart();
			break;
	
		default:
			break;
	}
	return (
		<div style={{ textAlign: 'center', marginTop: '10%' }}>
			{msg}
		</div>
		
	)
}

const mapDispatchToProps = dispatch => ({
	discardCart: () => dispatch(cartDiscard())
});

export default connect(null, mapDispatchToProps)(withRouter(Msg));