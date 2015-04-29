var personController = require('../controllers/PersonController');
module.exports = function(app) {
  app.get('person/:id?', function(req, res) {
    req.params.id ? personController.show(req.params.id) : personController.index();
  });
}