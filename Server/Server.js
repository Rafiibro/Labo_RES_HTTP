var http = require("http");
var moment = require("moment");

var server = http.createServer().listen(3000);

console.log("Jecoute sur le port 3000");

server.on('request', function (req, res) {

    if (req.method === 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        console.log(body);
        var post = "";
        if (body == "time") {
            post = new Date();
            res.write(post.toDateString());
        } else {
            res.write("bite");

        }
        res.end();
    });
});
