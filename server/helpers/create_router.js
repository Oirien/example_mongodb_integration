const express = require("express");
const ObjectId = require("mongodb").ObjectId;

const createRouter = function (collection) {
	const router = express.Router();

	router.get("/", (req, res) => {
		collection
			.find()
			.toArray()
			.then((docs) => {
				res.json(docs);
			})
			.catch((err) => {
				console.log("OH NO!", err);
				res.status(500);
				res.json({ status: 500, error: err });
			});
	});

	router.get("/:id", (req, res) => {
		const id = req.params.id;
		collection
			.findOne({ _id: ObjectId(id) })
			.then((doc) => {
				res.json(doc);
			})
			.catch((err) => {
				console.log("OH NO!", err);
				res.status(500);
				res.json({ status: 500, error: err });
			});
	});

	router.post("/", (req, res) => {
		const newGame = req.body;
		newGame.playingTime = Number(newGame.playingTime);
		newGame.players.min = Number(newGame.players.min);
		newGame.players.max = Number(newGame.players.max);

		collection
			.insertOne(newGame)
			.then((doc) => {
				res.json(doc.ops[0]);
			})
			.catch((err) => {
				console.log("OH NO!", err);
				res.status(500);
				res.json({ status: 500, error: err });
			});
	});

	router.delete("/:id", (req, res) => {
		const id = req.params.id;
		collection
			.deleteOne({ _id: ObjectId(id) })
			.then((docs) => {
				res.json(docs);
			})
			.catch((err) => {
				console.log("OH NO!", err);
				res.status(500);
				res.json({ status: 500, error: err });
			});
	});

	return router;
};

module.exports = createRouter;
