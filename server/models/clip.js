const mongoose = require("mongoose");

const clipSchema = new mongoose.Schema({
  game: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Game",
  },
  owner: String,
  link: String,
  played: {
    type: Boolean,
    default: false,
  },
  rank: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

clipSchema.set("toJSON", {
  transform: (doc, ret) => {
    (ret.id = ret._id.toString()), delete ret._id;
    delete ret.__v;
    delete ret.game;
  },
});

const Clip = mongoose.model("Clip", clipSchema);

module.exports = Clip;
