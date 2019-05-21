import React from "react";
import Userinfo from "./Userinfo";
import UserRecipes from "../Recipe/UserRecipes";

const Profile = ({ session }) => {
	return (
		<div className="App">
			<Userinfo session={session} />
			<UserRecipes username={session.getCurrentUser.username} />
		</div>
	);
};

export default Profile;
