const cartCode = (
	createPortal (
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
						className="button"
					>
						Go to Checkout
					</button>
				</div>
			</ul>
		</dialog>,
		document.getElementById('modal')
	)
)

export default cartCode;