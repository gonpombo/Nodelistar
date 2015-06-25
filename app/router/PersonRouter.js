module.exports = function(app) {
  var PersonController = require('../controllers/PersonController');
  var personController = new PersonController();
  app.get('/person/:id?', function(req, res) {
    var resp = req.params.id ? personController.show(req.params.id) : personController.index();
    resp
    	.then(function(data) {
    		res.send(data);
   		})
   		.catch(function(err) {
        console.log("Error on PersonRouter. Get Person. " + err.toString());
   			res.status(500).send("Internal Server Error");
   		})
      .done()
  });
}