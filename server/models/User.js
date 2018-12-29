const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: { type: String },
  resetTokenExpiry: { type: Number }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next;
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
