const mongoose = require("mongoose");

const clipSchema = new mongoose.Schema({
  owner: String,
  link: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  played: {
    type: Boolean,
    default: false,
  },
  game: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Game",
  },
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
