const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  clips: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Clip",
    },
  ],
});

gameSchema.set("toJSON", {
  transform: (doc, ret) => {
    (ret.id = ret._id.toString()), delete ret._id;
    delete ret.__v;
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = { Game, gameSchema };
