import { forwardRef, useImperativeHandle, useRef, use, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { MealsContext } from '../store/meals-context';

const CartModal = forwardRef(function CartModal(props, ref){
	
	const { cart, incOrDecMealItemInCart, cartTotal, updateModal } = use(MealsContext)
	
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
			},
			close(){
				dialog.current.close();
			}
		}
	})
	
	return createPortal (
		<dialog className="cart modal" ref={dialog}>
			<h2>Your Cart</h2>
			<ul>
				{cart.length > 0 && cart.map((mealItem) => <li className="cart-item" key={mealItem.id}>
					<span>{mealItem.name} - {mealItem.quantity} x ${mealItem.price}</span>
					<span className="cart-item-actions">
						<button
							onClick={() => incOrDecMealItemInCart(mealItem.id, "add")}
						>
							+
						</button>
						{mealItem.quantity}
						<button
							onClick={() => incOrDecMealItemInCart(mealItem.id, "subtract")}
						>
							-
						</button>
					</span>
				</li>)}
				<div className="cart-total">${cartTotal.toFixed(2)}</div>
				<div className="modal-actions">
					<button 
						onClick={() => dialog.current.close()}
						className="text-button"
					>
						Close
					</button>
					<button 
						onClick={() => updateModal('checkout')}
						className="button"

					>
						Go to Checkout
					</button>
				</div>
			</ul>
		</dialog>,
		document.getElementById('modal')
	);
})

export default CartModal;