module.exports = function(app) {
  var PersonController = require('../controllers/PersonController');
  var personController = new PersonController();
  app
    .route('/person')
    .all(function(req, res, next) {
      // TODO Auth Method.
      next();
    })
    .get(function(req, res) {
      personController.show(req.query)
      	.then(function(data) {
      		res.send(data);
     		})
     		.catch(function(err) {
          console.log("Error on PersonRouter. Get Person. " + err.toString());
          res.status(500).send("Internal Server Error");
        })
        .done()
    })
    .post(function(req, res) {
      personController.create(req.body)
        .then(function(response) {
          res.send(response);
        })
        .catch(function(err) {
          console.log("Error on PersonRouter. Post Person. " + err.toString());
     			res.status(500).send("Internal Server Error");
        })
        .done()
    })

}