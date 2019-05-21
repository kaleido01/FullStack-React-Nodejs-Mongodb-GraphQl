import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { SIGNIN_USER } from "../../queries";
import Error from "../Error";

const initialState = {
	username: "",
	password: ""
};
export class Signin extends Component {
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
		const { username, password } = this.state;
		const isInvalid = !username || !password;
		return isInvalid;
	};

	handleSubmit = (event, signinUser) => {
		event.preventDefault();
		signinUser().then(({ data }) => {
			console.log(data);
			localStorage.setItem("token", data.signinUser.token);
			this.clearState();
		});
	};
	render() {
		const { username, password } = this.state;
		return (
			<div className="App">
				<h2 className="App">Signin</h2>
				<Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
					{(signinUser, { data, loading, error }) => {
						return (
							<form
								className="form"
								onSubmit={event => this.handleSubmit(event, signinUser)}>
								<input
									type="text"
									placeholder="Username"
									name="username"
									onChange={this.changeHandler}
									value={username}
								/>
								<input
									type="password"
									placeholder="Password"
									name="password"
									onChange={this.changeHandler}
									value={password}
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

export default Signin;
