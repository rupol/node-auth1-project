module.exports = () => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        message: "You shall not pass!"
      });
    }
    next();
  };
};
