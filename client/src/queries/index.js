import { gql } from "apollo-boost";

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
