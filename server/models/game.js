const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  original: {
    type: Boolean,
    default: true,
  },
  clips: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Clip",
    },
  ],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

gameSchema.set("toJSON", {
  transform: (doc, ret) => {
    (ret.id = ret._id.toString()), delete ret._id;
    delete ret.__v;
    delete ret.user;
    delete ret.original;
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
