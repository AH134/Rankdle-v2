const userRouter = require("express").Router();
const Clip = require("../models/clip");
const Game = require("../models/game");
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate({
    path: "games",
    populate: {
      path: "clips",
      model: Clip,
      options: { sort: { createdAt: -1 } },
    },
  });

  res.status(200).json(users);
});

userRouter.post("/", async (req, res) => {
  const newUser = new User({});
  const games = await Game.find({ original: true });

  for (const game of games) {
    const newGame = new Game({
      name: game.name,
      original: false,
      user: newUser._id,
    });

    const clips = await Clip.find({ game: game._id })
      .sort({ createdAt: -1 })
      .limit(3);

    for (const clip of clips) {
      const newClip = new Clip({
        owner: clip.owner,
        link: clip.link,
        rank: clip.rank,
        game: newGame._id,
        createdAt: clip.createdAt,
      });

      await newClip.save();
      newGame.clips = newGame.clips.concat(newClip._id);
    }

    await newGame.save();
    newUser.games = newUser.games.concat(newGame._id);
  }
  await newUser.save();

  res.status(201).json(newUser);
});

userRouter.delete("/:id", async (req, res) => {
  const games = await Game.find({ user: req.params.id });
  for (const game of games) {
    await Clip.deleteMany({ game: game._id });
  }
  await Game.deleteMany({ user: req.params.id });
  await User.deleteOne({ _id: req.params.id });

  res.status(204).end();
});

userRouter.put("/:id", async (req, res) => {
  const { maxStreak, currStreak } = req.body;
  await User.findByIdAndUpdate(
    req.params.id,
    {
      maxStreak,
      currStreak,
    },
    { new: true, runValidators: true, context: "query" }
  );

  res.status(200).end();
});

module.exports = userRouter;
