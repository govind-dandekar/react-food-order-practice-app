import { useContext } from 'react';
import { MealsContext } from '../store/meals-context';

import MealItem from "./MealItem";

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
							image={"http://localhost:3000/" + image}
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