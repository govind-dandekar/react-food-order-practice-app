import { 
		use, 
		useRef, 
		useImperativeHandle, 
		forwardRef, 
		useActionState,
		useState 
	} from 'react';

import { MealsContext } from "../store/meals-context";

import { isEmail, hasMinLength } from '../util/validation'

// TODO: fix CheckouModal submit order bug (seems to render twice)
const CheckoutModal = forwardRef(function CheckoutModal(props, ref){
	
	const [formState, formAction] = useActionState(checkoutAction, {errors: null} )
	const [isPosting, setIsPosting] = useState(false)
	const [postError, setPostError] = useState({});

	const { cartTotal, cart, updateModal } = use(MealsContext);
	
	const dialog = useRef();

	async function checkoutAction(prevFormState, formData){
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
			async function submitOrder(orderData){			
				setIsPosting(true);
				const response = await fetch('http://localhost:3000/orders', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(orderData)
				})

				console.log(response);

				// failed submit logic
				if (!response.ok){
					setPostError(true);
					setIsPosting(false);
					errors.push('Failed to submit order.  Please try to resubmit.')
				} else {
				// successful submit logic
				setIsPosting(false);
				setPostError(false);
				}
			}
					
			const orderData = {
				order: {
					items: cart,
					customer: {
						name: name,
						email: email,
						street: streetAddress,
						['postal-code']: postalCode,
						city: city
					}
				}	
			}
	
			await submitOrder(orderData);
			
				if (postError){
					// reset post error
					setPostError(false);
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
					updateModal('confirm');
					return { errors: null };
				}
			} 
		}

	function handleCheckoutClose(){
		updateModal('checkoutClose')
	}

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
				className="control"
			>
				<label htmlFor="name">
					Full Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value="FullName"
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
					value="test@example.com"
					defaultValue={formState.enteredValues?.email}
				/>
				<br />
				<label htmlFor="street-address">Street Address</label>
				<input
					type="text"
					id="street-address"
					name="street-address"
					value="123 Main St"
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
							value="12345"
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
							value="SF"
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
					<button 
						className="text-button" 
						formAction={handleCheckoutClose}
					>
							Close
					</button>
					<button 
						className='button' 
						formAction={formAction}>
						Submit Order
					</button>
			</div>
			</form>
		</dialog>
	)
})

export default CheckoutModal;