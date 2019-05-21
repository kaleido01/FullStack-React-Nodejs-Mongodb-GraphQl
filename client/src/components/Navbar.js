import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ session }) => {
	return (
		<nav>
			{session && session.getCurrentUser ? (
				<NavbarAuth session={session} />
			) : (
				<NavbarUnAuth />
			)}
		</nav>
	);
};

const NavbarAuth = ({ session }) => (
	<React.Fragment>
		<ul>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<NavLink to="/search">Search</NavLink>
			</li>
			<li>
				<NavLink to="/recipe/add">Add Recipe</NavLink>
			</li>
			<li>
				<NavLink to="/profile">Profile</NavLink>
			</li>
			<li>
				<button>Signout</button>
			</li>
		</ul>
		<h2>
			Welcome, <strong> {session.getCurrentUser.username}</strong>
		</h2>
	</React.Fragment>
);

const NavbarUnAuth = () => (
	<ul>
		<li>
			<NavLink to="/">Home</NavLink>
		</li>
		<li>
			<NavLink to="/search">Search</NavLink>
		</li>
		<li>
			<NavLink to="/signin">Signin</NavLink>
		</li>

		<li>
			<NavLink to="/signup">signup</NavLink>
		</li>
	</ul>
);

export default Navbar;
