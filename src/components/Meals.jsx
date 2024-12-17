import { useState, useEffect, useContext } from 'react';
import { MealsContext } from '../store/meals-context';

import MealItem from "./MealItem";
import ErrorPage from './ErrorPage';

function Meals(){
	const {meals: contextMeals} = useContext(MealsContext);

	return (
		<div id="meals">
				{contextMeals.map((meal) => {
					const {id, image, name, price, description} = meal;
					return (
						<MealItem 
							key={id}
							id={id}
							image={'./../backend/public/' + image}
							name={name}
							price={price}
							description={description}
						/>
					)
				})} 
		</div>
	)
}

export default Meals;