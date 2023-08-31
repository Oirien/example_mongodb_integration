const express = require("express");
const app = express();
const cors = require("cors");
const createRouter = require("./helpers/create_router");
const MongoClient = require("mongodb").MongoClient;

app.use(express.json());
app.use(cors());

MongoClient.connect("mongodb://127.0.0.1:27017", { useUnifiedTopology: true })
	.then((client) => {
		const db = client.db("games_hub");
		const games = db.collection("games");
		const gamesRouter = createRouter(games);
		app.use("/api/games", gamesRouter);
	})
	.catch(console.error("Beep Boop, you fucked up!"));

app.listen(9000, function () {
	console.log(`Listening on port ${this.address().port}`);
});
