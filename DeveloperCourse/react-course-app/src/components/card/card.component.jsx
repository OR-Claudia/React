import "./card.styles.css";

const Card = ({ monster }) => {
	const { name, email, id } = monster;
	return (
		<div className="card-container" key={id}>
			<img
				alt={`monster: ${name}`}
				src={`http://robohash.org/${id}?set=set1&size=180x180`}
			></img>
			<h2>{name}</h2>
			<p>{email}</p>
		</div>
	);
};
export default Card;
