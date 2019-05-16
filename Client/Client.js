var http = require('http');

var postData = "time";

var options = {
    hostname: "localhost",
    port: 3000,
    method: "POST",
    headers: {

    }
};
var body = '';
var request = http.request(options, function (res) {
    if (res.method === 'POST') {
    }
    res.on('data', function (data) {
        body += data;
    });

    res.on('end', function () {
        console.log(body);
    });
});

request.write(postData);
request.end();