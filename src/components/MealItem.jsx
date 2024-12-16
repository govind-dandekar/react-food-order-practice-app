function MealItem({name, price, description, image}){
	return (
	<article className="meal-item">
		<img src={image} alt={name}/>
		<h3>{name}</h3>
		<p className="meal-item-price">${price}</p>
		<p className="meal-item-description">{description}</p>
		<button className="button meal-item-actions">Add to Cart</button>
	</article>
	)
}

export default MealItem;