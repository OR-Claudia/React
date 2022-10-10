import "./App.css";
import axios from "axios";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/*const cocktails = [];*/

const cocktailURL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=m";

function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(cocktailURL)
      .then((res) => {
        if (res.data) {
          setPost(res.data.drinks);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!post) return null;

  function ListFromArray(data) {
    return data.param?.map((ingredient) => {
      return (
        <li>
          {ingredient.ingredientName} {ingredient.ingredientMeasurement}
        </li>
      );
    });
  }

  function CreateList() {
    console.log(post.length);
    var ingredientsArray = [];
    var ingredientObj = {};
    //const textStyle = { textAlign: "left" };
    const cocktailList = post?.map((drink) => {
      for (var i = 1; i < 15; i++) {
        var ingredient = `strIngredient${i}`;
        var measurement = `strMeasure${i}`;

        ingredientObj = {
          ingredientName: drink[ingredient],
          ingredientMeasurement: drink[measurement],
        };

        ingredientsArray.push(ingredientObj);
        console.log(ingredientsArray);

        if (drink[ingredient] == null) {
          ingredientsArray = [];
          break;
        }
      }
      /*            <ul className="Cocktail-List-Items">
              <ListFromArray param={ingredientsArray} />
            </ul>
            <p className="Cocktail-Instructions">{drink.strInstructions}</p> */ // ingredients + instructions

      return (
        <div className="col">
          <div className="card shadow-sm pt-3">
            <svg>
              <image
                className=""
                x="0"
                y="0"
                width="100%"
                height="100%"
                xlinkHref={drink.strDrinkThumb}
              ></image>
              ;
            </svg>
            <div className="card-body">
              <p className="card-text">
                {drink.strDrink}
                <p className="card-text CardText">
                  Glass needed: {drink.strGlass}
                </p>
              </p>
            </div>
            <button className="btn m-3 btn-secondary btn-lg btn-block ">
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

  return (
    <div className="App">
      <header className="App-header">
        <div className="row spacer">
          <h1>Cocktail Database</h1>
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
