var http = require("http");
var xml2js = require('xml2js');
var port = process.argv[2] || 8080;
var date = new Date();

console.log('Server run on port ' + port);

setInterval(incrementDate, 1000);

http.createServer(function (req, res) {
    const { headers } = req;
    if (req.method === 'POST') {
        var body = "";

        req.on('data', function (data) {
            body += data;
        });
        req.on('end', () => {
            if(headers['content-type'] == 'application/json'){
                body = JSON.parse(body);
                date.setHours(body.hours);
                date.setMinutes(body.minutes);
                date.setSeconds(body.seconds);
            } else {
                xml2js.parseString(body, function (err, result) {
                    body = JSON.parse(JSON.stringify(result));
                });
                date.setHours(body.root.hours);
                date.setMinutes(body.root.minutes);
                date.setSeconds(body.root.seconds);
            }

        });

        console.log("ok");
        var send = {reponse: "ok"};
        res.write(reponseFormat(headers['accept'], send));
        res.end();

    } else if (req.method === 'GET') {
        console.log(req.method);
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        var send = {hour: hour + ":" + min + ":" + sec};
        console.log(send);

        res.write(reponseFormat(headers['accept'], send));
        res.end();
    }
}).listen(port);

function reponseFormat(format, text) {
    if(format == 'text/json'){
        return reponseJSON(text);
    } else if(format == 'text/xml'){
        return reponseXML(text);
    } else {
        return reponseHTML(text);
    }
}

function reponseJSON(text) {
    return JSON.stringify(text);
}

function reponseHTML(text) {
    if(text.reponse == 'ok'){
        return '<html><body><p>' + text.reponse + '</p></body></html>';
    }
    return '<html><body><p>' + text.hour + '</p></body></html>';
}

function reponseXML(text) {
    var builder = new xml2js.Builder();
    return builder.buildObject(text);
}

function incrementDate(){
    date = new Date(date.getTime() + 1000);
}