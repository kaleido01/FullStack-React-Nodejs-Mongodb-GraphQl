import React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { GET_USER_RECIPES, DELETE_USER_RECIPE } from "../../queries";

const handleDelete = deleteUserRecipe => {
	const confirmDelete = window.confirm(
		"Are you sure you want to delete this recipe?"
	);
	if (confirmDelete) {
		deleteUserRecipe().then(({ data }) => {
			console.log(data);
		});
	}
};

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
								<Mutation
									mutation={DELETE_USER_RECIPE}
									variables={{ _id: recipe._id }}>
									{(deleteUserRecipe, { data, loading, error }) => {
										return (
											<p
												onClick={() => handleDelete(deleteUserRecipe)}
												className="delete-button">
												X
											</p>
										);
									}}
								</Mutation>
							</li>
						))}
					</ul>
				);
			}}
		</Query>
	);
};

export default UserRecipes;
