var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var NodeCache = require('node-cache');
var cache = new NodeCache();

router.get('/problem', function(req, res) {
	const id = req.query.id;
	if(!id){
		res.status(400).send("Expected id parameter");
		return;
	}
	cache.get(id, function(error, value){
		if(error){
			throw error;
		}
		if(value){
			res.send(value);
			return;
		}
		const url = "https://projecteuler.net/problem=" + id;
		const options = {
			url: url
		}
		request(options, function(error, response, html){
			if(error){
				throw error;
			}
			var $ = cheerio.load(html);
			var content = $('#content')
			var title = content.find('h2').text();
			var questionDesc = "";
			content
				.find('.problem_content')
				.find('p')
				.each(function(){questionDesc += " " + $(this).text()});
			fileData = {
				title: title,
				questionDesc: questionDesc
			};
			cache.set(id, fileData);
			res.send(fileData);
		});
	});
});

router.get('/check', function(req, res){
	const id = req.query.id;
	if(!id){
		res.status(400).send("Expected id parameter");
		return;
	}
	const answer = req.query.answer;
	if(!answer){
		res.status(400).send("Expected answer parameter");
		return;
	}
	const filePath = "data/answers.json";
	fs.readFile(filePath, function(error, data){
		var correctAnswer = JSON.parse(data)[id];
		if(!correctAnswer){
			res.send(undefined);
			return;
		}
		res.send(+correctAnswer === +answer);
	});
});

module.exports = router;
