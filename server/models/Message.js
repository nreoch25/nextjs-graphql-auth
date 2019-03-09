const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, required: true },
  sender: { ref: "User", type: Schema.Types.ObjectId }
});

module.exports = mongoose.model("Message", MessageSchema);
