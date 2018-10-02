import * as actionTypes from './actionTypes';

export const addToCart = product => ({
	type: actionTypes.CART_ADD,
	payload: product
})
export const removeFromCart = index => ({
	type: actionTypes.CART_REMOVE,
	payload: index
})
export const changeProductQuant = (quant, index) => ({
	type: actionTypes.CART_CHANGE_QUANT,
	payload: {quant, index}
})
export const setCart = products => ({
	type: actionTypes.CART_SET,
	payload: products
})
export const cartDiscard = products => ({
	type: actionTypes.CART_DISCARD
})