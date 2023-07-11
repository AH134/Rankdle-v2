const mongoose = require("mongoose");

const clipSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      default: "Anonymous",
    },
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
  },
  { timestamps: true }
);

clipSchema.set("toJSON", {
  transform: (doc, ret) => {
    (ret.id = ret._id.toString()), delete ret._id;
    delete ret.__v;
    delete ret.game;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

const Clip = mongoose.model("Clip", clipSchema);

module.exports = Clip;
