var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//get route index
router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burger.all(function (data) {
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function (req, res) {
	burger.create(req.body.burger_name, function (result) {
		console.log(result);
		res.redirect('/');
	});
});

//put route -> back to index
router.put('/burgers/update', function(req,res){
	burger.update(req.body.burger_id, function(result){
		//wrapper for orm.js that using MySQL update callback will return a log to console, render back to index with handle
		console.log(result);
		res.redirect('/');
	});
});

module.exports = router;
