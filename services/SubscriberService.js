const SubscriberModel = require('../models/SubscriberModel');

const getAll = async () => {
  const subscribers = await SubscriberModel.getAll();
  return subscribers;
};

module.exports = {
  getAll,
};
