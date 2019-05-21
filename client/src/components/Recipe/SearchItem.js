import React from "react";
import { Link } from "react-router-dom";

const SearchItem = ({ _id, name, likes }) => {
	return (
		<li>
			<Link to={`/recipes/${_id}`}>
				<h4> {name}</h4>
			</Link>
			<p>
				<strong>Likes: {likes}</strong>
			</p>
		</li>
	);
};

export default SearchItem;
