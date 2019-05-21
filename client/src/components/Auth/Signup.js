import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";
import Error from "../Error";

const initialState = {
	username: "",
	email: "",
	password: "",
	passwordConfirmation: ""
};
export class Signup extends Component {
	state = {
		...initialState
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	clearState = () => {
		this.setState({
			...initialState
		});
	};
	validateForm = () => {
		const { username, email, password, passwordConfirmation } = this.state;
		const isInvalid =
			!username || !email || !password || password !== passwordConfirmation;
		return isInvalid;
	};

	handleSubmit = (event, signupUser) => {
		event.preventDefault();
		signupUser().then(data => {
			console.log(data);
			localStorage.setItem("token", data.sigupUser.token);

			this.clearState();
		});
	};
	render() {
		const { username, email, password, passwordConfirmation } = this.state;
		return (
			<div className="App">
				<h2 className="App">Signup</h2>
				<Mutation
					mutation={SIGNUP_USER}
					variables={{ username, email, password }}>
					{(signupUser, { data, loading, error }) => {
						return (
							<form
								className="form"
								onSubmit={event => this.handleSubmit(event, signupUser)}>
								<input
									type="text"
									placeholder="Username"
									name="username"
									onChange={this.changeHandler}
									value={username}
								/>
								<input
									type="email"
									placeholder="Your Email"
									name="email"
									onChange={this.changeHandler}
									value={email}
								/>
								<input
									type="password"
									placeholder="Password"
									name="password"
									onChange={this.changeHandler}
									value={password}
								/>
								<input
									type="password"
									placeholder="Confirm Password"
									name="passwordConfirmation"
									onChange={this.changeHandler}
									value={passwordConfirmation}
								/>
								<button
									type="submit"
									className="button-primary"
									disabled={loading || this.validateForm()}>
									Submit
								</button>
								{error && <Error error={error} />}
							</form>
						);
					}}
				</Mutation>
			</div>
		);
	}
}

export default Signup;
