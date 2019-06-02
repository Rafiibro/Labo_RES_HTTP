var request = require("request-promise");
var port = process.argv[2] || 8080;
var ip = process.argv[3] || "localhost";
var repFormat = process.argv[4] || "json";
var reqFormat = process.argv[5] || "json";

var headers = {
    'Accept': 'text/' + repFormat,
}

var options = {
    method: 'GET',
    uri: 'http://' + ip + ':' + port,
    headers: headers
};

request(options)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });


var headers = {
    'Accept': 'text/' + repFormat,
}

var options = {
    method: 'POST',
    uri: 'http://' + ip + ':' + port,
    headers: headers,
    body: {
        hours: '4',
        minutes: '20',
        seconds: '0'
    }
};

if (reqFormat == 'json') {
    options.json = true;
} else {
    options.body = "<root><hours>4</hours><minutes>20</minutes><seconds>0</seconds></root>"
}

request(options)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

var headers = {
    'Accept': 'text/' + repFormat,
}

var options = {
    method: 'GET',
    uri: 'http://' + ip + ':' + port,
    headers: headers
};

request(options)
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

/*
var http = require('http');

var post_req  = null,
    post_data = '{"login":"toto","password":"okay","duration":"9999"}';

var post_options = {
    hostname: '192.168.1.1',
    port    : '8080',
    path    : '/web/authenticate',
    method  : 'POST',
    headers : {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Content-Length': post_data.length
    }
};

post_req = http.request(post_options, function (res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ', chunk);
    });
});

post_req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

post_req.write(post_data);
post_req.end();
 */