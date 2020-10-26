module.exports = (app) => {
  const clubs = require("../controllers/club.controller.js");

  // Create a new Note
  app.post("/clubs", clubs.create);

  // Retrieve all clubs
  app.get("/clubs", clubs.list);

  // Retrieve a single Note with clubId
  app.get("/clubs/:clubId", clubs.findOne);

  // Update a Note with clubId
  app.put("/clubs/:clubId", clubs.update);

  // Delete a Note with clubId
  app.delete("/clubs/:clubId", clubs.delete);
};
