const Subscription = {
  newMessage: {
    subscribe: (parent, args, { pubsub, req }) => {
      return pubsub.asyncIterator("message-added");
    }
  }
};

module.exports = Subscription;
