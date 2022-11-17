import { useState, useEffect } from "react";
// import Card from "./components/card/card.component";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const url = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  console.log("render");
  //functional component skeleton - does not have lifecycles!
  //props are taken from params
  //no constructor, no class
  //react keeps a reference of the functional component (runs top to bottom)

  const [searchField, setSearchField] = useState(""); //[value=to be stored, setFunction], one single value
  const [title, setTitle] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  console.log("render");

  //useEffect(callback(), dependencies)
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((users) => setMonsters(users));
  }, []);
  //keep the 2nd prop empty if it only runs once - no dependecies, no trigger for rerunning function

  //componentDidMount the first time the app is rendered - happens only once

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);

    console.log("effect");
  }, [monsters, searchField]);

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>

      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="monsters-search-box"
      />
      <br />
      <SearchBox
        onChangeHandler={onTitleChange}
        placeholder="set title"
        className="title-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   //class is used to write classes and within JSX we use className
//   //state can be used by local functions/classes and only? with the help of a constructor
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {

//   }

//   //onsearchchange - called once at render - lambda functions can be taxing on performance

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();

//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>

//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder="search monsters"
//           className="monsters-search-box"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
