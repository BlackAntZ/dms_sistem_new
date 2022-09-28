const Odjeljenja = require('../models/odjeljenja.model');

async function getStartPage(req, res, next) {
  const odjeljenje = new Odjeljenja();
  try {
    const response = await odjeljenje.getAllOdjeljenja();
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStartPage: getStartPage
}