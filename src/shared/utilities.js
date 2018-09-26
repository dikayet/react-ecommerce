export const updateObject = (state, update) => {
	return {
		...state,
		...update
	}
}

export const checkAvailability = (id, color, size, cart) => {
	const productInCart = cart.find(el => (el.id === id) && (el.size === size.size) && (el.color === color));
	let quant = 0;
	if (productInCart) {
		quant += productInCart.quant;
	}
	return quant;
}