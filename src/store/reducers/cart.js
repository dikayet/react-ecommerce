import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
	products: []
}

// private
const toSession = (products) => {
	localStorage.setItem('cart', products);
}


// public
const addProduct = (state, product) => {
	let index = 0;
	const newProducts = [...state.products];
	let inCart = false;
	for(let prod of state.products){
		if (prod.id === product.id && prod.color === product.color && prod.size === product.size) {
			inCart = true;
			let newProduct = updateObject(prod, {
				quant: prod.quant + product.quant
			});
			newProducts[index] = newProduct;
			break;
		}
		index++;
	}
	if (!inCart) {
		newProducts.push(product);
	}
	toSession(JSON.stringify(newProducts));
	return updateObject(state, {
		products: newProducts
	});
}

const removeProduct = (state, index) => {
	let newProducts = state.products.filter((el, i) => i!==index);
	toSession(JSON.stringify(newProducts));
	return updateObject(state, {
		products: newProducts
	});
}

const setCart = (state, cart) => {
	return updateObject(state, {
		products: JSON.parse(cart)
	});
}

const changeProductQuant = (state, quant) => {
	const product = state.products[quant.index];
	product.quant = quant.quant;
	const newProducts = [...state.products];
	newProducts[quant.index] = product;
	toSession(JSON.stringify(newProducts));
	return updateObject(state, {
		products: newProducts
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CART_ADD: return addProduct(state, action.payload);
		case actionTypes.CART_REMOVE: return removeProduct(state, action.payload);
		case actionTypes.CART_SET: return setCart(state, action.payload);
		case actionTypes.CART_CHANGE_QUANT: return changeProductQuant(state, action.payload);
	
		default: return state;
	}
}

export default reducer;