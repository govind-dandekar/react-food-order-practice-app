import { use } from "react";

import { MealsContext } from "../store/meals-context";

function MealItem({name, price, description, image, id}){

	const { addMealItemToCart } = use(MealsContext);

	return (
		<article className="meal-item">
			<img src={image} alt={name}/>
			<h3>{name}</h3>
			<p className="meal-item-price">${price}</p>
			<p className="meal-item-description">{description}</p>
			<button
				onClick={() => addMealItemToCart(id, name, price)} 
			  className="button meal-item-actions">
				Add to Cart
			</button>
		</article>
	)
}

export default MealItem;