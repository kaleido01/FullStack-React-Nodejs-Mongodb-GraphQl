import React from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_ALL_RECIPES } from "../queries";
import RecipeItem from "./Recipe/RecipeItem";

const App = () => {
	return (
		<div className="App">
			<h1>Home</h1>
			<Query query={GET_ALL_RECIPES}>
				{({ data, loading, error }) => {
					if (loading) return <div>Loading</div>;
					if (error) return <div>Error</div>;
					return (
						<ul>
							{data.getAllRecipes.map(recipe => (
								<RecipeItem {...recipe} key={recipe._id} />
							))}
						</ul>
					);
				}}
			</Query>
		</div>
	);
};

export default App;
