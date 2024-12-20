import { use, useRef } from 'react';

import foodImage from '/logo.jpg'

import { MealsContext, modalContent } from '../store/meals-context';
import CartModal from './CartModal';

function Header(){

	const { cartQuantity } = use(MealsContext);

	const cartDialog = useRef();

	function handleOpenCart(){
		cartDialog.current.open();
	}

	// add context state tied to which modal is showing
	// cartModal, checkoutModal, confirmationModal, noModal
	// set Refs and open with fx that calls open()
	// based on context state setting

	// add updateModal logic to cartModal (and checkout and confirm modals)

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
				ref={cartDialog}
			/>
		</div>
	)
}

export default Header;