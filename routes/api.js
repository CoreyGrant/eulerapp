var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

router.get('/problem', function(req, res, next) {
	const id = req.query.id;
	if(!id){
		res.status(400).send("Expected id parameter");
		return;
	}
	// const filePath = 'data/questions.json'
	// fs.readFile(filePath, function(error, data){
	// 	if(error){
	// 		throw error;
	// 	}
		var file = {} //JSON.parse(data.toString());
	// 	var fileData = file[id];
	// 	if(fileData){
	// 		res.send(fileData)
	// 		return;
	// 	} else {
			const url = "https://projecteuler.net/problem=" + id;
			request(url, function(error, response, html){
				if(error){
					throw error;
				}
				fileData = file[id] = {};
				var $ = cheerio.load(html);
				var content = $('#content')
				fileData.title = content.find('h2').text();
				// ToDo: Figure out how to replace with reduce
				
				var questionDesc = "";
				content
					.find('.problem_content')
					.find('p')
					.each(function(){questionDesc += " " + $(this).text()});
				fileData.questionDesc = questionDesc.trim();
				//fs.writeFile(filePath, JSON.stringify(file), function(err){});
				res.send(fileData);
			});
	// 	}
	// });
});

module.exports = router;
