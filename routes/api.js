var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var NodeCache = require('node-cache');
var cache = new NodeCache();

router.get('/problem', function(req, res, next) {
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
			var answerNode = content.find('.noprint').find('b');
			if(answerNode.length){
				fileData.answer = answerNode.text();
			}
			cache.set(id, fileData);
			res.send(fileData);
		});
	})
	
});

module.exports = router;
