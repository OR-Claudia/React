import Card from "../card/card.component";
import "./card-list.styles.css";

const CardList = ({ monsters }) => {
  //const { monsters } = props; //instead of this.props we use just props
  return (
    <div className="card-list">
      {monsters.map((monster) => {
        return <Card monster={monster} key={monster.id} />;
      })}
    </div>
  );
};

//implicit return if "return" is not declared in the code
export default CardList;
