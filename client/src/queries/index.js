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

//Recipes mutations

//User queries

export const GET_CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			username
			joinDate
			email
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
