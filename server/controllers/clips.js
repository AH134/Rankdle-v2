const clipRouter = require("express").Router();
const Clip = require("../models/clip");
const Game = require("../models/game");

clipRouter.get("/", async (req, res) => {
  const clips = await Clip.find({}).sort({ createdAt: -1 });

  res.status(200).json(clips);
});

clipRouter.post("/", async (req, res) => {
  const clipGame = req.query.game;
  const clip = req.body;
  const game = await Game.findOne({ name: clipGame });

  const newClip = new Clip({ ...clip, game: game._id });
  game.clips = game.clips.concat(newClip._id);

  await newClip.save();
  await game.save();

  res.status(201).json(newClip);
});

clipRouter.put("/:id", async (req, res) => {
  const { score, played, guessedRank } = req.body;
  await Clip.findByIdAndUpdate(
    req.params.id,
    { score, played, guessedRank },
    { new: true, runValidators: true, context: "query" }
  );

  res.status(200).end();
});

clipRouter.delete("/:id", async (req, res) => {
  const clipId = req.params.id;
  const clip = await Clip.findById(clipId);
  const gameId = clip.game;

  await Clip.deleteOne({ _id: clipId });
  await Game.updateOne({ _id: gameId }, { $pull: { clips: clip._id } });

  res.status(204).end();
});

module.exports = clipRouter;
