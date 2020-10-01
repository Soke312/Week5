var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "./";
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/", {useUnifiedTopology: true},function(err, db) {
    http.createServer(function (request, res) {
            if(request.method === "POST") {
                var myDB = db.db("week-5-db");
                myDB.collection("week5entry", function (err, week5entry) {
                    week5entry.findOne({type: "week5"}, function (err, item) {
                        console.log("Before Save: ");
                        console.log(item);
                        item.info = "Some New Info";
                        week5entry.save(item, {w: 1}, function (err, results) {
                            week5entry.findOne({_id: item._id}, function (err, savedItem) {
                                console.log("After Save: ");
                                console.log(savedItem);
                                db.close();
                            });
                        });
                    });
                });
            }else
                {
            var urlObj = url.parse("./" + request.url, true, false);
            fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
                if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
    }).listen(8080);
});

