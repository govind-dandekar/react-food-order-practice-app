import { createContext, useState, useEffect } from "react";

export const MealsContext = createContext({
	meals: [],
	cart: [],
	addMealItemToCart: () => {}
});

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

	function addMealItemToCart(id){
		setCart((prevCart) => [id, ...prevCart])
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