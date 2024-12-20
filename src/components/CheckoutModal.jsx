import { use, useRef, useImperativeHandle } from 'react';

import { MealsContext } from "../store/meals-context";

// make single Modal component and pass context as prop?
const CheckoutModal = forwardRef(function CheckoutModal(props, ref){
	
	const { cartTotal } = use(MealsContext);
	
	const dialog = useRef();

	useImperativeHandle(ref, () => {
		return {
			open(){
				dialog.current.showModal()
			} 
		}
	})


	return (
		<dialog ref={dialog}>
			<h2>Checkout</h2>
			<p>Amount: ${cartTotal}</p> 
			<form>
				This is a form
			</form>
		</dialog>
	)
})

export default CheckoutModal;