import { use, useRef } from 'react';

import foodImage from '/logo.jpg'

import { MealsContext } from '../store/meals-context';
import CartModal from './CartModal';

function Header(){

	const { cart } = use(MealsContext);

	const dialog = useRef();

	function handleOpenCart(){
		dialog.current.open();
	}

	// calculate number of discrete mealItems in cart
	let cartQuantity = cart.reduce((previousValue, currentValue) => {
		return previousValue + currentValue.quantity
	}, 0);

	return (
		<div id="main-header">
			<div id="title">
				<img src={foodImage} alt="food app icon"/>
				<h1>React Food</h1>
			</div>
			<nav>
				<button className="text-button" onClick={handleOpenCart}>
					Cart ({cartQuantity})
				</button>
			</nav>
			<CartModal 
				ref={dialog}
			/>
		</div>
	)
}

export default Header;