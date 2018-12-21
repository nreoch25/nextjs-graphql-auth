const jwt = require("jsonwebtoken");

const createToken = (user, secret) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret);
};

const Query = {
  users: async (root, args, { User }) => {
    return await User.find();
  }
};

const Mutation = {
  signupUser: async (root, { username, email, password }, { User, res }) => {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("User already exists");
    }
    const newUser = await new User({
      username,
      email,
      password
    }).save();

    const token = createToken(newUser, process.env.JWT_SECRET);
    // We set the jwt as a cookie on the response
    res.cookie("nflevate-token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day cookie
    });

    return newUser;
  }
};

module.exports = {
  Query,
  Mutation
};
