import { useRef, useImperativeHandle, forwardRef, use } from 'react';

import { MealsContext } from '../store/meals-context';

const ConfirmationModal = forwardRef(function ConfirmationModal(props, ref){
 
	const { updateModal, setCart } = use(MealsContext);
	
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

	function handleConfirmationClose(){
		setCart([]);
		updateModal('confirmationClose')
	}
	
	return(
	<dialog ref={dialog} className="modal">
		<h2>Success!</h2>
		<p>Your order was submitted successfully.</p>
		<p>We will get back to you with more details via email within the next few minutes</p>
		<div className="modal-actions">
			<button 
				className="button"
				onClick={handleConfirmationClose}
			>
				Okay
			</button>
		</div>
	</dialog>
 )
})

export default ConfirmationModal;