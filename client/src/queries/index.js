import { gql } from "apollo-boost";

//Recipes queries
export const GET_ALL_RECIPES = gql`
	query getAllRecipes {
		getAllRecipes {
			name
			description
			instructions
			category
			likes
			createdDate
		}
	}
`;

//Recipes mutations

//User queries

//User Mutations

export const SIGNUP_USER = gql`
	mutation signupUser($username: String!, $email: String!, $password: String!) {
		signupUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`;
