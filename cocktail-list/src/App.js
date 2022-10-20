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

  // function ListFromArray(data) {
  //   return data.param?.map((ingredient) => {
  //     return (
  //       <li>
  //         {ingredient.ingredientName} {ingredient.ingredientMeasurement}
  //       </li>
  //     );
  //   });
  // }

  function GetIngredients(param) {
    //continue writing here - use Post to find by ID
    var cocktail = {};
    var ingredient = {};
    var drinkIngredients = [];
    drinkList?.map((drink) => {
      if (drink.idDrink === param) {
        for (var i = 1; i < 15; i++) {
          var ingredient = `strIngredient${i}`;
          var measurement = `strMeasure${i}`;

          ingredient = {
            ingredientName: drink[ingredient],
            ingredientMeasurement: drink[measurement],
          };

          drinkIngredients.push(ingredient);

          if (drink[ingredient] == null) {
            break;
          }
        }
        cocktail = {
          cocktailID: param,
          cocktailName: drink.strDrink,
          cocktailIngredients: ingredient,
          cocktailImgURL: drink.strDrinkThumb,
          cocktailInstructions: drink.strInstructions,
        };
        console.log(cocktail);
        return cocktail;
      }
    });
  }

  function ShowPreview(cocktail) {
    console.log(cocktail);
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
              <h1 className="modal-title fs-5">Demo</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClickImg}
              ></button>
            </div>
            <div className="modal-body py-0">
              <p>
                This is a modal sheet, a variation of the modal that docs itself
                to the bottom of the viewport like the newer share sheets in
                iOS.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleClickImg = (drinkID) => {
    tempDrink = drinkList.find((x) => x.idDrink === drinkID);
    console.log(tempDrink);
    setCurrentDrink(tempDrink);
    setIsActive((current) => !current);

    //assign to currentDrink check docu find or findFirst
    //with current drink -> put into modal and display
  };

  const handleClick = () => {}; //tbc for new page with all details

  function CreateList() {
    var ingredientsArray = [];

    var ingredientObj = {};
    const cocktailList = drinkList?.map((drink) => {
      for (var i = 1; i < 15; i++) {
        var ingredient = `strIngredient${i}`;
        var measurement = `strMeasure${i}`;

        ingredientObj = {
          ingredientName: drink[ingredient],
          ingredientMeasurement: drink[measurement],
        };

        ingredientsArray.push(ingredientObj);

        if (drink[ingredient] == null) {
          ingredientsArray = [];
          break;
        }
      }
      /*          <ul className="Cocktail-List-Items">
              <ListFromArray param={ingredientsArray} />
            </ul>
            this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
            <p className="Cocktail-Instructions">{drink.strInstructions}</p> */ // ingredients + instructions

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
    ingredientsArray = [];
    return cocktailList;
  }

  console.log(currentDrink);

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
