const Subscription = {
  newMessage: {
    subscribe: (parent, args, { pubsub, subUser }) => {
      if (subUser) {
        return pubsub.asyncIterator("message-added");
      }
      throw new Error("User is not authenticated");
    }
  }
};

module.exports = Subscription;
