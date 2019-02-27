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

module.exports = Query;
