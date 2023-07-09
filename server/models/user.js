const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  maxStreak: {
    type: Number,
    default: 0,
  },
  currStreak: {
    type: Number,
    default: 0,
  },
  games: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Game",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    (ret.id = ret._id.toString()), delete ret._id;
    delete ret.__v;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
