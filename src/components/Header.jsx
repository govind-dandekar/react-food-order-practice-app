import foodImage from '/logo.jpg'

function Header(){
	return (
		<div id="main-header">
			<div id="title">
				<img src={foodImage} alt="food app icon"/>
				<h1>React Food</h1>
			</div>
			<nav>
				<button className="text-button">
					Cart (0)
				</button>
			</nav>
		</div>
	)
}

export default Header;