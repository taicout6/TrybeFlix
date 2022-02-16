const SubscriberService = require('../services/SubscriberService');

const getAll = async (req, res) => {
  const subscribers = await SubscriberService.getAll();
  res.status(200).json(subscribers);
};

module.exports = {
  getAll,
};
