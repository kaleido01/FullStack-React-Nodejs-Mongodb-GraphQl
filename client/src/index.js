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
import withSession from "./components/withSession";

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

const Root = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/signin" component={Signin} />
			<Route path="/signup" component={Signup} />
			<Redirect to="/" />
		</Switch>
	</Router>
);

const RootWithSesstion = withSession(Root);

ReactDOM.render(
	<ApolloProvider client={client}>
		<RootWithSesstion />
	</ApolloProvider>,

	document.getElementById("root")
);
