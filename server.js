const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./variables.env" });

const Recipe = require("./models/Recipe");
const User = require("./models/User");

//Bring in GraphQL-Express middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

const { typeDefs } = require("./schema.gql");
const { resolvers } = require("./resolvers");

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("DB connected");
	})
	.catch(err => {
		console.error(err);
	});

const app = express();

//クロスドメインからのアクセスを許可するためのパケ
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true
};
app.use(cors(corsOptions));

//setup JWT authentication middleware

app.use(async (req, res, next) => {
	const token = req.headers["authorization"];
	console.log(token);
	next();
});

//create GrapQL application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

//Connect schema with GraphQL
app.use(
	"/graphql",
	bodyParser(),
	graphqlExpress({
		schema,
		context: {
			Recipe,
			User
		}
	})
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server listening on PORT ${PORT}`);
});
