import React, { Component } from "react";

import withSession from "./../withSession";
import { Mutation } from "react-apollo";
import { LIKE_RECIPE, GET_RECIPE, UNLIKE_RECIPE } from "./../../queries/index";

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

	handleLike = (likeRecipe, unlikeRecipe) => {
		if (this.state.liked) {
			likeRecipe().then(async ({ data }) => {
				console.log(data);
				await this.props.refetch();
			});
		} else {
			unlikeRecipe().then(async ({ data }) => {
				console.log(data);
				await this.props.refetch();
			});
		}
	};

	handleClick = (likeRecipe, unlikeRecipe) => {
		this.setState(
			prevState => ({
				liked: !prevState.liked
			}),
			() => this.handleLike(likeRecipe, unlikeRecipe)
		);
	};
	updateLike = (cache, { data: { likeRecipe } }) => {
		const { _id } = this.props;
		const { getRecipe } = cache.readQuery({
			query: GET_RECIPE,
			variables: { _id }
		});
		cache.writeQuery({
			query: GET_RECIPE,
			variables: { _id },
			data: {
				getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
			}
		});
	};
	updateUnlike = (cache, { data: { unlikeRecipe } }) => {
		const { _id } = this.props;
		const { getRecipe } = cache.readQuery({
			query: GET_RECIPE,
			variables: { _id }
		});
		cache.writeQuery({
			query: GET_RECIPE,
			variables: { _id },
			data: {
				getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }
			}
		});
	};

	render() {
		const { username, liked } = this.state;
		const { _id } = this.props;
		return (
			<Mutation
				mutation={UNLIKE_RECIPE}
				variables={{ _id, username }}
				update={this.updateUnlike}>
				{unlikeRecipe => (
					<Mutation
						mutation={LIKE_RECIPE}
						variables={{ _id, username }}
						update={this.updateLike}>
						{likeRecipe => {
							return (
								username && (
									<button
										onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}>
										{liked ? "Unlike" : "Like"}
									</button>
								)
							);
						}}
					</Mutation>
				)}
			</Mutation>
		);
	}
}

export default withSession(LikeRecipe);
