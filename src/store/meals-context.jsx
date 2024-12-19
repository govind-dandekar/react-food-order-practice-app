import { createContext, useState, useEffect, useMemo } from "react";

export const MealsContext = createContext({
	meals: [],
	cart: [],
	addMealItemToCart: () => {}
});

// add meal quantities
export function MealsContextProvider({children}){
	const [meals, setMeals] = useState([]);

	const [cart, setCart] = useState([])

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
			// console.log(mealIndex);

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

	const contextValue = {
		meals: meals,
		cart: cart,
		addMealItemToCart: addMealItemToCart
	}

	return <MealsContext value={contextValue}>
			{children}
	</MealsContext>
}