import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./components/Error";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />

				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="*" component={Error} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
