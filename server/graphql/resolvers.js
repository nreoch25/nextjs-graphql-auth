const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret) => {
  const { _id, username, email } = user;
  return jwt.sign({ _id, username, email }, secret);
};

const Query = {
  users: async (root, args, { User }) => {
    return await User.find();
  },
  me: async (root, args, { User, req }) => {
    if (!req.userId) {
      return null;
    }
    const user = User.findById(req.userId);
    return user;
  }
};

const Mutation = {
  signupUser: async (root, { username, email, password }, { User, res }) => {
    const user = await User.findOne({ username });
    email = email.toLowerCase();
    if (user) {
      throw new Error("User already exists");
    }
    const newUser = await new User({
      username,
      email,
      password
    }).save();

    const token = createToken(newUser, process.env.JWT_SECRET);
    // set the jwt as a cookie on the response
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day cookie
    });

    return newUser;
  },
  signinUser: async (root, { email, password }, { User, res }) => {
    email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`No user found for email ${email}`);
    }
    // validate password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }
    const token = createToken(user, process.env.JWT_SECRET);
    // set the jwt as a cookie on the response
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day cookie
    });
    return user;
  },
  signoutUser: async (root, args, { res }) => {
    res.clearCookie("token");
    return { message: "Come back soon" };
  }
};

module.exports = {
  Query,
  Mutation
};
