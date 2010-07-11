#!/usr/bin/env node

var sys = require('sys');
var zip = require('./gzip');

zip.gzip(process.openStdin(), process.stdout);
