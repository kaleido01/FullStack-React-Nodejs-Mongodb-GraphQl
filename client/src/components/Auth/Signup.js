import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNUP_USER } from "../../queries";

export class Signup extends Component {
	state = {
		username: "",
		email: "",
		password: "",
		passwordConfirmation: ""
	};

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = (event, signupUser) => {
		event.preventDefault();
		signupUser().then(data => {
			console.log(data);
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
								<button type="submit" className="button-primary">
									Submit
								</button>
							</form>
						);
					}}
				</Mutation>
			</div>
		);
	}
}

export default Signup;
