import { use, useRef, useImperativeHandle, forwardRef } from 'react';

import { MealsContext } from "../store/meals-context";

// make single Modal component and pass context as prop?
const CheckoutModal = forwardRef(function CheckoutModal(props, ref){
	
	const { cartTotal } = use(MealsContext);
	
	const dialog = useRef();

	useImperativeHandle(ref, () => {
		return {
			open(){
				dialog.current.showModal()
			},
			close(){
				dialog.current.close()
			} 
		}
	})

	return (
		<dialog 
			ref={dialog}
			className="modal cart"
		>
			<h2>Checkout</h2>
			<p>Amount: ${cartTotal}</p> 
			<form className="control">
				<label>Full Name</label>
				<input></input>
				<br />
				<label>Email Address</label>
				<input></input>
				<br />
				<label>Street</label>
				<input></input>
				<br />
				<label>Postal Code</label>
				<input></input>
				<br />
				<label>City</label>
				<input></input>
			</form>
				<div className="modal-actions">
					<button className="text-button">Close</button>
					<button className='button'>Submit Order</button>
				</div>
		</dialog>
	)
})

export default CheckoutModal;