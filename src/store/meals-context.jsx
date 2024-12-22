import { createContext, useState, useEffect, useMemo } from "react";

export const MealsContext = createContext({
	meals: [],
	cart: [],
	cartQuantity: 0,
	cartTotal: 0,
	modalContent: "none",
	addMealItemToCart: () => {},
	incOrDecMealItemInCart: () => {},
	updateModal: () => {},
	setCart: () => {}
});

// add meal quantities
export function MealsContextProvider({children}){
	const [meals, setMeals] = useState([]);
	const [cart, setCart] = useState([]);
	const [modalContent, setModalContent] = useState('none');

	useEffect(() => {
		async function loadMeals(){
			const response = await fetch('http://localhost:3000/meals');
			const meals = await response.json()
			setMeals(meals);
		}

		loadMeals();
	}, [])

	function addMealItemToCart(id, name, price){	
		setCart((prevState) => {
			const mealIndex = prevState.findIndex((meal) => meal.id === id);
		
			// update state immutably
			if (mealIndex !== -1){
				const newState = [...prevState.slice(0, mealIndex),
					{...prevState[mealIndex], quantity: prevState[mealIndex].quantity + 1},
					...prevState.slice(mealIndex + 1)
				];
				return newState
			} else {
				return [...prevState, {id, name, price, quantity: 1}]
			}
		})
	}

	function incOrDecMealItemInCart(id, operator){
		setCart((prevState) => {
			const mealIndex = prevState.findIndex((meal) => meal.id === id )

			if (prevState[mealIndex].quantity === 0 && operator === 'subtract'){
				return prevState;
			}

			if (operator === 'add') {
				const newState = [...prevState.slice(0, mealIndex),
					{...prevState[mealIndex], quantity: prevState[mealIndex].quantity + 1},
					...prevState.slice(mealIndex + 1)
				]

				return newState;
			} else {
				const newState = [...prevState.slice(0, mealIndex),
					{...prevState[mealIndex], quantity: prevState[mealIndex].quantity - 1},
					...prevState.slice(mealIndex + 1)
				]

				return newState;
			}
		})
	}

	// calculate number of discrete mealItems in cart
	let cartQuantity = cart.reduce((previousValue, currentValue) => {
		return previousValue + currentValue.quantity
	}, 0);

	// calculate total price of items in cart
	let cartTotal = cart.reduce((previousValue, currentValue) => {
		return previousValue + currentValue.quantity * currentValue.price
	}, 0)

	function updateModal(content){
		setModalContent(content);
	}

	const contextValue = {
		meals: meals,
		cart: cart,
		cartQuantity: cartQuantity,
		cartTotal: cartTotal,
		modalContent: modalContent,
		addMealItemToCart: addMealItemToCart,
		incOrDecMealItemInCart: incOrDecMealItemInCart,
		updateModal: updateModal,
		setCart: setCart
	}

	return <MealsContext value={contextValue}>
			{children}
	</MealsContext>
}