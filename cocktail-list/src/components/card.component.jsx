const Card = (drink, onClickImgHandler, onClickHandler) => {
	return (
		<div className="col" key={drink.idDrink}>
			<div className="card shadow-sm pt-3">
				<svg>
					<image
						className={drink.idDrink}
						x="0"
						y="0"
						width="100%"
						height="100%"
						xlinkHref={drink.strDrinkThumb}
						onClick={() => {
							onClickImgHandler(drink.idDrink);
						}}
					></image>
				</svg>
				<div className="card-body">
					<p className="card-text">{drink.strDrink}</p>
					<p className="card-text CardText">Glass needed: {drink.strGlass}</p>
				</div>
				<div className="drink-id">Drink id:{drink.idDrink}</div>
				<button
					onClick={onClickHandler}
					className="btn m-3 btn-secondary btn-lg btn-block"
				>
					View
				</button>
				<div className="col"></div>
			</div>
		</div>
	);
};

export default Card;
