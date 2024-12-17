import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

const CartModal = forwardRef(function CartModal(props, ref){
	
	const dialog = useRef();

	useImperativeHandle(ref, () => {
		return {
			open(){
				dialog.current.showModal();
			}
		}
	})
	
	return createPortal (
		<dialog className="cart" ref={dialog}>
			<h2>Your Cart</h2>
		</dialog>,
		document.getElementById('modal')
	)
})

export default CartModal;