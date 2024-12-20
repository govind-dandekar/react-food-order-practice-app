import { use, useRef, useImperativeHandle, forwardRef, useActionState } from 'react';

import { MealsContext } from "../store/meals-context";

import { isEmail, isNotEmpty, hasMinLength } from '../util/validation'


function checkoutAction(prevFormState, formData){
	const name = formData.get('name');
	const email = formData.get('email');
	const streetAddress = formData.get('street-address');
	const postalCode = formData.get('postal-code');
	const city = formData.get('city');

	let errors = [];

	if (!hasMinLength(name, 5)){
		errors.push('Please input a valid name')
	}

	if (!isEmail(email)){
		errors.push('Please input a valid email address')
	}

	if (!hasMinLength(streetAddress, 5)){
		errors.push('Please input a valid street address')
	}

	if (!hasMinLength(streetAddress, 5)){
		errors.push('Please input a valid postal code')
	}

	if (!hasMinLength(streetAddress, 2)){
		errors.push('Please input a valid city name')
	}

	if (errors.length > 0){
		return {
			errors: errors,
			enteredValues: {
				name,
				email,
				streetAddress,
				postalCode,
				city
			}
		}
	} else {
		return { errors: null }
	}
}


const CheckoutModal = forwardRef(function CheckoutModal(props, ref){
	
	const [formState, formAction] = useActionState(checkoutAction, {errors: null} )

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
			<form 
				action={formAction}
				className="control"
			>
				<label htmlFor="name">
					Full Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					defaultValue={formState.enteredValues?.name}
				/>
				<br />
				<label htmlFor="email">
					Email Address
				</label>
				<input
					type="email"
					id="email"
					name="email"
					defaultValue={formState.enteredValues?.email}
				/>
				<br />
				<label htmlFor="street-address">Street Address</label>
				<input
					type="text"
					id="street-address"
					name="street-address"
					defaultValue={formState.enteredValues?.streetAddress}
				/>
				<br />
				<div className="control-row">
					<div>
						<label htmlFor="postal-code">
							Postal Code
						</label>
						<input 
							type="text"
							id="postal-code"
							name="postal-code"
							defaultValue={formState.enteredValues?.postalCode}
						/>
					</div>
					<br />
					<div>
						<label htmlFor="city">City</label>
						<input
							type="text"
							id="city"
							name="city"
							defaultValue={formState.enteredValues?.city}
						/>
					</div>
				</div>
				<br />
				<div>
				{formState.errors && <ul className="errors">
					{formState.errors.map((error) => {
						return <li key={error}>{error}</li>
					})}
					</ul>}
			</div>
				<div className="modal-actions">
					<button className="text-button">Close</button>
					<button className='button'>Submit Order</button>
			</div>
			</form>
			
			
		</dialog>
	)
})

export default CheckoutModal;