const Subscription = {
  newMessage: {
    subscribe: (parent, args, { pubsub }) =>
      pubsub.asyncIterator("message-added")
  }
};

module.exports = Subscription;
