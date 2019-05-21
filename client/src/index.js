import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import "./index.css";
import App from "./components/App";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Search from "./components/Recipe/Search";
import withSession from "./components/withSession";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile/Profile";
import AddRecipe from "./components/Recipe/AddRecipe";
import RecipePage from "./components/Recipe/RecipePage";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	fetchOptions: {
		credentials: "includes"
	},
	request: operation => {
		const token = localStorage.getItem("token");
		operation.setContext({
			headers: {
				authorization: token
			}
		});
	},
	onError: ({ networkError }) => {
		if (networkError) {
			console.log("network Error", networkError);
		}
	}
});

const Root = ({ refetch, session }) => (
	<Router>
		<React.Fragment>
			<Navbar session={session} />
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/search" component={Search} />
				<Route path="/profile" component={Profile} />
				<Route path="/recipe/add" component={AddRecipe} />
				<Route path="/recipes/:_id" component={RecipePage} />
				<Route path="/signin" render={() => <Signin refetch={refetch} />} />
				<Route path="/signup" render={() => <Signup refetch={refetch} />} />
				<Redirect to="/" />
			</Switch>
		</React.Fragment>
	</Router>
);

const RootWithSesstion = withSession(Root);

ReactDOM.render(
	<ApolloProvider client={client}>
		<RootWithSesstion />
	</ApolloProvider>,

	document.getElementById("root")
);
