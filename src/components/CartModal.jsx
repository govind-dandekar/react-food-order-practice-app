import { forwardRef, useImperativeHandle, useRef, use, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { MealsContext } from '../store/meals-context';

const CartModal = forwardRef(function CartModal(props, ref){
	
	const { cart } = use(MealsContext)
	
	const dialog = useRef();

	useEffect(() => {
		function calculateCart(){
			console.log(cart);
		}

		calculateCart();
	})


	useImperativeHandle(ref, () => {
		return {
			open(){
				dialog.current.showModal();
			}
		}
	})
	
	return createPortal (
		<dialog className="cart modal" ref={dialog}>
			<h2>Your Cart</h2>
			<ul>
				{cart.length > 0 && cart.map((mealItem) => <li key={mealItem.id}>
					{mealItem.name} - { mealItem.price}
				</li>)}
			</ul>
		</dialog>,
		document.getElementById('modal')
	)
})

export default CartModal;