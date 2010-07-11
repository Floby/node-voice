#!/usr/bin/env node

var fs = require('fs'),
    sys= require('sys');

exports.loadJsonSync = function loadJsonSync(filename) {
    var content = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(content);
}

exports.load = function loadJson(filename, callback) {
    fs.readFile(filename, function(err, data) {
	if(err) throw err;
	var data = JSON.parse(data.toString());
	callback(data);
    });
}
