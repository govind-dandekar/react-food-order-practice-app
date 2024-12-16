import { createContext, useState, useEffect } from "react";

export const MealsContext = createContext({
	meals: []
});

export function MealsContextProvider({cildren}){
	const [meals, setMeals] = useState({
		meals: []
	});

	useEffect(() => {
		async function loadMeals(){
			const response = await fetch('http://localhost:3000/meals');
			const meals = await response.json()
			setMeals(meals);
		}

		loadMeals();
	}, [])



	const contextValue = {
		meals: meals
	}

	return 
	(
		<MealsContext value={contextValue}>
			{children}
		</MealsContext>
	)
}