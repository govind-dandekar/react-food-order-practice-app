import { use, useRef } from 'react';

import foodImage from '/logo.jpg'

import { MealsContext } from '../store/meals-context';
import CartModal from './CartModal';
import CheckoutModal from './CheckoutModal';

function Header(){

	const { cartQuantity, modalContent, updateModal } = use(MealsContext);

	// using refs and context doesn't feel like the best way to
	// solve this; check instructor answer when done
	const cartDialog = useRef();
	const checkoutDialog = useRef();

	if (modalContent === 'cart'){
		cartDialog.current.open();
	} else if (modalContent === 'checkout') {
		cartDialog.current.close();
		checkoutDialog.current.open();
	}



	return (
		<>
		<div id="main-header">
			<div id="title">
				<img src={foodImage} alt="food app icon"/>
				<h1>React Food</h1>
			</div>
			<nav>
				<button className="text-button" onClick={() => updateModal('cart')}>
					Cart ({cartQuantity})
				</button>
			</nav>

			
		</div>
		<CartModal 
			ref={cartDialog}
		/>
		<CheckoutModal 
			ref={checkoutDialog}/>
		</>
	)
}

export default Header;