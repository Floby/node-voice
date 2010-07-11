#!/usr/bin/env node

var sys = require('sys'),
    net = require('net'),
    lang = require('./language'),
    cfg = require('./config'),
     cp = require('child_process');

var homedir = process.env.VOICESERVER_HOME || '.';
sys.puts(sys.inspect(lang));
var config = cfg.loadJsonSync(homedir+'/common.json');

var VoiceServer;
VoiceServer = net.createServer(function(socket) {
    socket.setEncoding('utf-8');
    socket.expect = 'name';
    socket.write(config.welcome_phrase.replace("%n", config.host_real_name)+"\n");
    socket.write("Name: ");
    sys.puts("receiving connection from "+socket.remoteAddress);
    socket.addListener('data', function(data) {
	data = data.replace(/(\n|\r)/g, "");
	if(socket.expect == 'name') {
	    socket.name = data;
	    socket.expect = 'lang';
	    socket.write("Language: ");
	}
	else if (socket.expect == 'lang') {
	    socket.lang = lang.getId(data);
	    delete socket.expect;
	    sys.puts(socket.name+'('+socket.lang+') connected from '+socket.remoteAddress);
	    socket.write("say: ");
	}
	else {
	    if(data == 'quit') {
		socket.end();
		sys.puts(socket.name+'('+socket.lang+') quit');
		return;
	    }
	    data = data.replace(/["`()\\]/g, "");
	    sys.puts(socket.name+'('+socket.lang+') says: '+data);
	    var cmd = config.cmd_template.replace("%s", '"'+data+'"').replace("%v", socket.lang);
	    cp.exec(cmd);
	    socket.write("say: ");
	}

    });
});

VoiceServer.listen(config.local_port);
sys.puts("listening on " + config.local_port);
