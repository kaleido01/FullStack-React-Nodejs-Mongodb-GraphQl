import React, { Component } from "react";

export class Signup extends Component {
	render() {
		return (
			<div className="App">
				<h2 className="App">Signup</h2>
				<form className="form">
					<input type="text" placeholder="Username" name="text" />
					<input type="email" placeholder="Your Email" name="email" />
					<input type="password" placeholder="Password" name="password" />
					<input
						type="password"
						placeholder="Confirm Password"
						name="passwordConfirmation"
					/>
					<button type="submit" className="button-primary">
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default Signup;
