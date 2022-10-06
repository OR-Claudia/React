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
    const imgStyle = { maxWidth: 100 };
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

      return (
        <div class="row">
          <p class="col" className="Cocktail-Header">
            <img
              style={imgStyle}
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
            ></img>
            {drink.strDrink}
          </p>
          <div class="col" className="Cocktail-Ingredients">
            <ul className="Cocktail-List-Items">
              <ListFromArray param={ingredientsArray} />
            </ul>
            <p className="Cocktail-Instructions">{drink.strInstructions}</p>
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
        <p>Cocktail Database</p>
        <div class="container-fluid" className="List-Container">
          <CreateList />
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
