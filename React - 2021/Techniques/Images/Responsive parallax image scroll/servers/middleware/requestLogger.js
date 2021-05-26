const requestLogger = (req, res, next) => {
  console.log(`[ GET ] - ${req.url}`);
  next();
};

module.exports = requestLogger;
