import React, { Component } from "react";

import withSession from "./../withSession";
import { Mutation } from "react-apollo";
import { LIKE_RECIPE } from "./../../queries/index";

export class LikeRecipe extends Component {
	state = {
		username: "",
		liked: false
	};

	componentDidMount() {
		if (this.props.session.getCurrentUser) {
			const { username, favorites } = this.props.session.getCurrentUser;
			const { _id } = this.props;
			console.log(this.props.session.getCurrentUser);
			console.log(favorites);
			//userのfavoritesの中にコンポーネントが表示しているレシピのIdがある場合true
			const prevLiked =
				favorites.findIndex(favorite => favorite._id === _id) > -1;

			this.setState({ username, liked: prevLiked });
		}
	}

	handleLike = likeRecipe => {
		if (this.state.liked) {
			likeRecipe().then(async ({ data }) => {
				console.log(data);
				await this.props.refetch();
			});
		} else {
			console.log("unlike");
		}
	};

	handleClick = likeRecipe => {
		this.setState(
			prevState => ({
				liked: !prevState.liked
			}),
			() => this.handleLike(likeRecipe)
		);
	};

	render() {
		const { username, liked } = this.state;
		const { _id } = this.props;
		return (
			<Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>
				{likeRecipe => {
					return (
						username && (
							<button onClick={() => this.handleClick(likeRecipe)}>
								{liked ? "Liked" : "Like"}
							</button>
						)
					);
				}}
			</Mutation>
		);
	}
}

export default withSession(LikeRecipe);
