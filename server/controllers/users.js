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

  const user = await User.findById(newUser._id).populate({
    path: "games",
    populate: {
      path: "clips",
      model: Clip,
      options: { sort: { createdAt: -1 } },
    },
  });

  res.status(201).json(user);
});

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).populate({
    path: "games",
    populate: {
      path: "clips",
      model: Clip,
      options: { sort: { createdAt: -1 } },
    },
  });

  res.status(200).json(user);
});

userRouter.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  const games = await Game.find({ user: userId });
  for (const game of games) {
    await Clip.deleteMany({ game: game._id });
  }
  await Game.deleteMany({ user: userId });
  await User.deleteOne({ _id: userId });

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

userRouter.put("/update/:id", async (req, res) => {
  const userId = req.params.id;

  const updateGameList = async () => {
    const user = await User.findById(userId);
    const userGames = await Game.find({ user: userId });
    const games = await Game.find({ original: true });

    const userGamesList = userGames.map((game) => game.name);
    const gamesList = games.map((game) => game.name);
    const newGameList = gamesList.filter(
      (game) => !userGamesList.includes(game)
    );

    // JSUT ADD THE CLIPS FORM THE GAMES RIGHT AFTER
    for (const gameName of newGameList) {
      // const game = await Game.find({ name: gameName });
      const newGame = new Game({
        name: gameName,
        original: false,
        user: user._id,
      });
      // console.log(game);
      // console.log(newGame);
      await newGame.save();
      user.games = user.games.concat(newGame);
    }
    await user.save();
  };
  console.log(await User.findById(userId));


  //UPDATES THE CLIPS FOR OTHER GAMES
  const updateClips = async () => {
    const games = await Game.find({ original: true });

    for (const game of games) {
      const userGame = await Game.find({
        user: userId,
        name: game.name,
      }).populate({
        path: "clips",
        options: { sort: { createdAt: -1 } },
      });

      const clips = await Clip.find({ game: game._id })
        .sort({ createdAt: -1 })
        .limit(3);
      console.log(userGame[0]);

      if (clips.length) {
        if (userGame[0].clips[0].link === clips[0].link) {
          for (const clip of clips) {
            const newClip = new Clip({
              owner: clip.owner,
              link: clip.link,
              rank: clip.rank,
              game: game._id,
              createdAt: clip.createdAt,
            });
    
            if (newClip.name === "chess") {
              console.log(newClip);
            }
    
            await newClip.save();
            userGame.clips = userGame.clips.concat(newClip._id);
          }
          await game.save();
      }

    }
  };

  updateGameList();
  updateClips();

  const updateduser = await User.findById(userId).populate({
    path: "games",
    populate: {
      path: "clips",
      model: Clip,
      options: { sort: { createdAt: -1 } },
    },
  });

  res.status(201).json(updateduser);
});

module.exports = userRouter;
