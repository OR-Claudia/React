import "./App.css";
import axios from "axios";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const cocktailURL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=m";

//const singleCocktailURL = "www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

function App() {
  const [drinkList, setDrinkList] = React.useState(null); //change setpost
  const [isActive, setIsActive] = React.useState(false); //isActive provides the value, setIsActive sets the value
  const [currentDrink, setCurrentDrink] = React.useState(null);

  var tempDrink = {};
  //const ref = React.useRef(null);

  var backgroundStyle1 = { display: "block" };

  React.useEffect(() => {
    axios
      .get(cocktailURL)
      .then((res) => {
        if (res.data) {
          setDrinkList(res.data.drinks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!drinkList) return null;

  function GetIngredients({ cocktail }) {
    var ingredientsArray = [];
    var ingredientObj = {};

    console.log(cocktail);

    for (var i = 1; i < 15; i++) {
      var ingredient = `strIngredient${i}`;
      var measurement = `strMeasure${i}`;

      // console.log(cocktail[ingredient])

      // if (cocktail[ingredient] == null) {
      //   break;
      // }

      ingredientObj = {
        ingredientName: cocktail[ingredient],
        ingredientMeasurement: cocktail[measurement],
      };

      ingredientsArray.push(ingredientObj);
    }
    console.log(ingredientsArray);
    return ingredientsArray
      .filter(({ ingredientName }) => ingredientName !== null)
      .map(({ ingredientName, ingredientMeasurement }) => (
        <li key={ingredientName}>
          {ingredientName} {ingredientMeasurement}
        </li>
      ));
  }

  //modal-body contains the data with the ingredients
  function ShowPreview(cocktail) {
    //const ingredients = GetIngredients(cocktail);

    //console.log(ingredients);

    return (
      <div
        className="modal fade show popup"
        tabIndex="-1"
        role="dialog"
        style={Object.assign(backgroundStyle1)}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header border-bottom-0">
              <h2 className="modal-title fs-5">{cocktail.cocktail.strDrink}</h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClickImg}
              ></button>
            </div>
            <div className="modal-body py-0">
              <ul className="ingredients-list">
                <GetIngredients cocktail={cocktail.cocktail} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleClickImg = (drinkID) => {
    tempDrink = drinkList.find((x) => x.idDrink === drinkID);
    setCurrentDrink(tempDrink);
    setIsActive((current) => !current);
  };

  const handleClick = () => {}; //tbc for new page with all details

  function CreateList() {
    const cocktailList = drinkList?.map((drink) => {
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
                  handleClickImg(drink.idDrink);
                }}
              ></image>
            </svg>
            <div className="card-body">
              <p className="card-text">{drink.strDrink}</p>
              <p className="card-text CardText">
                Glass needed: {drink.strGlass}
              </p>
            </div>
            <div className="drink-id">Drink id:{drink.idDrink}</div>
            <button
              onClick={handleClick}
              className="btn m-3 btn-secondary btn-lg btn-block"
            >
              View
            </button>
            <div className="col"></div>
          </div>
        </div>
      );
    });

    return cocktailList;
  }

  return (
    <div className="App">
      {isActive ? <ShowPreview cocktail={currentDrink} /> : null}
      <header className="App-header">
        <div className="row spacer">
          <h1>Cocktail Database</h1>
          <h2 className="previewText">Click the image for a preview!</h2>
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              <CreateList />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
