import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_USER_RECIPES } from "../../queries";

const UserRecipes = ({ username }) => {
	return (
		<Query query={GET_USER_RECIPES} variables={{ username }}>
			{({ data, loading, error }) => {
				if (loading) return <div>loading</div>;
				if (error) return <div>error</div>;

				console.log(data);
				return (
					<ul>
						<h3>Your Recipes</h3>
						{data.getUserRecipes.map(recipe => (
							<li>
								<Link to={`/recipes/${recipe._id}`}>
									<p>{recipe.name}</p>
								</Link>
								<p>likes: {recipe.likes}</p>
							</li>
						))}
					</ul>
				);
			}}
		</Query>
	);
};

export default UserRecipes;
