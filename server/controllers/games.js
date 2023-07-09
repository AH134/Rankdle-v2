const gameRouter = require("express").Router();
const Game = require("../models/game");
const Clip = require("../models/clip");

gameRouter.get("/", async (req, res) => {
  const games = await Game.find({ original: true }).populate({
    path: "clips",
    model: Clip,
    options: { sort: { createdAt: -1 } },
  });

  res.status(200).json(games);
});

gameRouter.post("/", async (req, res) => {
  const gameName = req.body.name;
  const newGame = await Game.create({ name: gameName });

  res.status(201).json(newGame);
});

gameRouter.delete("/:id", async (req, res) => {
  await Clip.deleteMany({ game: req.params.id });
  await Game.deleteOne({ _id: req.params.id });

  res.status(204).end();
});

module.exports = gameRouter;
