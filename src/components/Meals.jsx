import { useState, useEffect } from 'react';

import MealItem from "./MealItem";

function Meals(){
	const [isLoading, setIsLoading] = useState(false);
	const [fetchedMeals, setFetchedMeals] = useState([]);
	const [error, setError] = useState();

	useEffect(() => {
		async function getMeals(){
			setIsLoading(true);
			try {
				// console.log('fetching meals')
				const response = await fetch('http://localhost:3000/meals')
				const meals = await response.json();
				setFetchedMeals(meals)
			} catch (error) {
				setError(error.message);
			}
			setIsLoading(false);
		};
		
		getMeals();
	}, [])

	return (
		<div id="meals">
			{fetchedMeals.map((meal) => {
				const {name, price, description, id, image} = meal;
				return (
				<MealItem
					key={id}
					id={id}
					image={'./../backend/public/' + image}
					name={name}
					price={price}
					description={description}
				/>)
			})}
		</div>
	)
}

export default Meals;