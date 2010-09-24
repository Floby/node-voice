#!/usr/bin/env node

var sys = require('sys');
var cfg = require('./config');
var lang = cfg.loadJsonSync('./lang.json');

function getId(s) {
    s = s.toLowerCase();
    var res = lang[s] || 'en';
    return res;
}

exports.getId = getId;
