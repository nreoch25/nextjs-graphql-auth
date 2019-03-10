const Query = require("./Query");
const Mutation = require("./Mutation");
const Subscription = require("./Subscription");
const Type = require("./Type");

module.exports = {
  Query,
  Mutation,
  Subscription,
  ...Type
};
