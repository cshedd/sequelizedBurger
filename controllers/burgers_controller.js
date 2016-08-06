var express = require('express');
var router = express.Router();
var models = require("./../models");
models.burger.sync();

//get route index
router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	models.burger.all.then(function (result) {
		var hbsObject = { burgers: result }
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function (req, res) {
	models.burger.create({
		burger_name: req.body.burger_name, 
		devoured: req.body.devoured
	}).then(function() {
		res.redirect('/burgers');
	})	
});

//put route -> back to index
router.put('/burgers/update/:id', function(req,res){
	models.burger.update({
		devoured: req.body.devoured
	},{
		where: {id: req.params.id}
	}).then(function(){
		res.redirect('/patties');
	});
});	

module.exports = router;
