import React, { Component } from "react";

import withSession from "./../withSession";
import { Mutation } from "react-apollo";
import { LIKE_RECIPE } from "./../../queries/index";

export class LikeRecipe extends Component {
	state = {
		username: ""
	};

	componentDidMount() {
		if (this.props.session.getCurrentUser) {
			const { username } = this.props.session.getCurrentUser;
			this.setState({ username });
		}
	}

	handleLike = likeRecipe => {
		likeRecipe().then(({ data }) => {
			console.log(data);
		});
	};

	render() {
		const { username } = this.state;
		const { _id } = this.props;
		return (
			<Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>
				{likeRecipe => {
					return (
						username && (
							<button onClick={() => this.handleLike(likeRecipe)}>like</button>
						)
					);
				}}
			</Mutation>
		);
	}
}

export default withSession(LikeRecipe);
