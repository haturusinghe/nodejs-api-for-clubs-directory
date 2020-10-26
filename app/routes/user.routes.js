const passport = require("passport");

module.exports = (app) => {
  app.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    async (req, res, next) => {
      res.json({
        message: "Signup successful",
        user: req.user,
      });
    }
  );
};
