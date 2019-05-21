import React from "react";
import { withRouter } from "react-router-dom";

const RecipePage = ({ match }) => {
	const { _id } = match.params;
	console.log(_id);
	return <div>aaaa</div>;
};

export default withRouter(RecipePage);
