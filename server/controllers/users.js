const userRouter = require("express").Router();
const User = require("../models/user");
const Clip = require("../models/clip");
const { Game } = require("../models/game");

userRouter.get("/", async (req, res) => {
  const users = await User.find().populate({
    path: "games",
    populate: {
      path: "clips",
      model: Clip,
    },
  });
  // use this if needed
  // users[1].games[0].clips.reverse();

  res.status(200).json(users);
});

userRouter.post("/", async (req, res) => {
  const games = await Game.find();
  const user = new User({});

  user.games = user.games.concat(games);
  await user.save();

  res.status(201).json(user);
});

module.exports = userRouter;
