const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

const Query = {
  users: async (root, args, { User }) => {
    return await User.find();
  }
};

const Mutation = {
  createUser: async (root, { data }, { User }) => {
    const { username, email, password } = data;
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("User already exists");
    }
    const newUser = await new User({
      username,
      email,
      password
    }).save();
    return { token: createToken(newUser, process.env.JWT_SECRET, "1hr") };
  }
};

module.exports = {
  Query,
  Mutation
};
