module.exports = function(app) {
  var PersonController = require('../controllers/PersonController');
  var personController = new PersonController();
  app
    .all('/person/*', function(req, res, next) {
      // TODO Auth Method.
      next();
    })
    .get('/person/:id?', function(req, res) {
      var promise;
      if(req.params.id) {
        promise = personController.show(req.params.id);
      } else {
        promise = personController.index();
      }

      promise
      	.then(function(data) {
      		res.send(data);
     		})
     		.catch(function(err) {
          console.log("Error on PersonRouter. Get Person. " + err.toString());
          res.status(500).send("Internal Server Error");
        })
        .done()
    })
    .post('/person', function(req, res) {
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