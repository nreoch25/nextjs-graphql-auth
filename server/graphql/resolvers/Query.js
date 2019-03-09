const Query = {
  users: async (parent, args, { User }) => {
    return await User.find();
  },
  me: async (parent, args, { User, req }) => {
    if (!req.userId) {
      return null;
    }
    const user = User.findById(req.userId);
    return user;
  },
  messages: async (parent, args, { Message }) => {
    return await Message.find({}).populate("sender");
  }
};

module.exports = Query;
