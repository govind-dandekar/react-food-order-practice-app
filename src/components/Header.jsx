import { use } from 'react';

import foodImage from '/logo.jpg'

import { MealsContext } from '../store/meals-context';

function Header(){

	const { cart } = use(MealsContext);


	return (
		<div id="main-header">
			<div id="title">
				<img src={foodImage} alt="food app icon"/>
				<h1>React Food</h1>
			</div>
			<nav>
				<button className="text-button">
					Cart ({cart.length})
				</button>
			</nav>
		</div>
	)
}

export default Header;