import { gql } from "apollo-boost";

//Recipes queries
export const GET_ALL_RECIPES = gql`
	query getAllRecipes {
		getAllRecipes {
			_id
			name
			category
		}
	}
`;
export const GET_USER_RECIPES = gql`
	query getUserRecipes($username: String!) {
		getUserRecipes(username: $username) {
			_id
			name
			likes
		}
	}
`;

export const GET_RECIPE = gql`
	query getRecipe($_id: ID!) {
		getRecipe(_id: $_id) {
			_id
			name
			description
			category
			instructions
			createdDate
			likes
			username
		}
	}
`;

export const SEARCH_RECIPES = gql`
	query searchRecipes($searchTerm: String!) {
		searchRecipes(searchTerm: $searchTerm) {
			_id
			name
			likes
		}
	}
`;

//Recipes mutations

export const ADD_RECIPE = gql`
	mutation addRecipe(
		$name: String!
		$instructions: String!
		$category: String!
		$description: String!
		$username: String
	) {
		addRecipe(
			name: $name
			instructions: $instructions
			category: $category
			description: $description
			username: $username
		) {
			_id
			name
			description
			category
			instructions
			createdDate
			likes
			username
		}
	}
`;
export const DELETE_USER_RECIPE = gql`
	mutation deleteUserRecipe($_id: ID!) {
		deleteUserRecipe(_id: $_id) {
			_id
		}
	}
`;
export const LIKE_RECIPE = gql`
	mutation likeRecipe($_id: ID!, $username: String!) {
		likeRecipe(_id: $_id, username: $username) {
			likes
		}
	}
`;

//User queries

export const GET_CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			username
			joinDate
			email
			favorites {
				_id
				name
			}
		}
	}
`;

//User Mutations

export const SIGNUP_USER = gql`
	mutation signupUser($username: String!, $email: String!, $password: String!) {
		signupUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`;

export const SIGNIN_USER = gql`
	mutation signinUser($username: String!, $password: String!) {
		signinUser(username: $username, password: $password) {
			token
		}
	}
`;
