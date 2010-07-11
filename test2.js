#!/usr/bin/env node

var sys = require('sys');
var zip = require('./gzip');

zip.gunzip(process.openStdin(), process.stdout);
