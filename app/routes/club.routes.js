module.exports = (app) => {
  const clubs = require("../controllers/club.controller.js");

  // Create a new Note
  /*app.post("/clubs", clubs.create);*/

  // Retrieve all clubs
  app.get("/list", clubs.list);

  // Filter all clubs
  app.get("/filter", clubs.filter);

  // Retrieve a single Note with clubId
  app.get("/list/:clubId", clubs.findOne);

  // Retrieve nearby clubs to a given coordinate
  app.get("/nearby", clubs.nearby);

  // Retrieve nearby clubs within a given boundry box of coordinates
  app.get("/within", clubs.within);
  /*

  // Update a Note with clubId
  app.put("/clubs/:clubId", clubs.update);

  // Delete a Note with clubId
  app.delete("/clubs/:clubId", clubs.delete);
  */
};
