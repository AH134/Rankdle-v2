const mongoose = require("mongoose");
const { gameSchema } = require("./game");

const userSchema = new mongoose.Schema({
  maxStreak: {
    type: Number,
    default: 0,
  },
  currStreak: {
    type: Number,
    default: 0,
  },
  games: [gameSchema],
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    (ret.id = ret._id.toString()), delete ret._id;
    delete ret.__v;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
