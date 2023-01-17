import { Routes, Route } from "react-router-dom"; //assembles the routing of the app
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const App = () => {
	/* when nesting, we keep track of path as in 
	  	   /level1/level2 == /home/shop */
	return (
		<Routes>
			{/*this will always stay on top because of hierarchy */}
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="/auth" element={<Authentication />} />
			</Route>
		</Routes>
	);
};

export default App;
