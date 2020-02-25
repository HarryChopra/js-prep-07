const cart = [
	{ name: 'Banana', price: 30, qty: 3 },
	{ name: 'Apple', price: 30, qty: 10 },
	{ name: 'Ginger', price: 30, qty: 2 },
	{ name: 'Shipping', price: 5 }
];

// Add all the prices
// you could employ a loop to go over the array
// However reduce function is much better
const orderTotal = () => {
	const userSelectedItemsTotal = cart
		.filter(item => item.name != 'Shipping')
		.reduce((prev, curr) => prev + curr.price * curr.qty, 0);
	const shippingCost =
		userSelectedItemsTotal > 500 ? 0 : cart.find(item => item.name == 'Shipping').price;

	return userSelectedItemsTotal + shippingCost;
};

console.log(orderTotal());
