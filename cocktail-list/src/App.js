import "./App.css";
import axios from "axios";
import React from "react";

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

  function ListFromArray(param) {
    param.map((ingredient) => {
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

        if (drink[ingredient] == null) {
          break;
        }

        ingredientObj = {
          ingredientName: drink[ingredient],
          ingredientMeasurement: drink[measurement],
        };

        ingredientsArray.push(ingredientObj);
        console.log(ingredientsArray);
      }
      /*
      <ul>
              <ListFromArray param={ingredientsArray} />
            </ul>
      */
      return (
        <div>
          <p className="cocktailHeader">
            <img
              style={imgStyle}
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
            ></img>
            {drink.strDrink}
          </p>
          <div className="cocktailIngredients"></div>

          <p className="cocktailInstructions">{drink.strInstructions}</p>
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
        <div>
          <ul>
            <CreateList />
          </ul>
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
