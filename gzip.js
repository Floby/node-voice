#!/usr/bin/env node

var chp = require('child_process');

function stream(input, output, cmd) {
    var p = chp.spawn(cmd);
    p.stdout.addListener('data', function(data) {
	output.write(data);
    });
    input.addListener('data', function(data) {
	p.stdin.write(data);	
    });
    input.addListener('end', function() {
	p.stdin.end();
    });
    p.stdout.addListener('end', function() {
	output.end();
    });

}

exports.gzip =  function gzip(input, output)  {
    stream(input, output, 'gzip');
}
exports.gunzip =  function gzip(input, output)  {
    stream(input, output, 'gunzip');
}
