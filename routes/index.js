var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
    var newstype = req.query.newstype;

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "baidunews",
        dateStrings: true
    });
    // console.log("newstype:" + newstype);
    connection.connect();
    if (typeof newstype != "undefined") {
        connection.query("SELECT `newsType_id` FROM `newsType` WHERE `newsType_name`=?", [newstype], function(err, rows) {
            rows.forEach(function(value, index) {
                newstype = value["newsType_id"];
            });
            console.log(newstype);
            // 第二次查询要放在回调中（回调是异步的）
            connection.query("SELECT * FROM news WHERE newstype=? AND newsstatus=1", [newstype], function(err, rows) {
                if (err) throw err;
                // xss转义
                rows.forEach(function(value, index) {
                    value["newstitle"] = htmlspecialchars(value["newstitle"]);
                    value["newssrc"] = htmlspecialchars(value["newssrc"]);
                    value["newstype"] = htmlspecialchars(value["newstype"]);
                    value["newspath"] = htmlspecialchars(value["newspath"]);
                });
                res.json(rows);
                // 关闭数据库连接(放在回调中)
                connection.end();
            });
        });
    } else {
        connection.query("SELECT * FROM newstype", function(err2, rows2) {
            connection.query("SELECT * FROM news WHERE newsstatus=1", function(err1, rows1) {
            	rows1.forEach(function(value1,index1){
            		// value["newstype"]=?;
            		newstype=value1["newstype"];
            		rows2.forEach(function(value2,index2){
            			if(value2["newsType_id"]==newstype){
            				newstype=value2["newsType_name"];
            			}
            		});
            		value1["newstype"]=htmlspecialchars(newstype);
                    value1["newstitle"] = htmlspecialchars(value1["newstitle"]);
                    value1["newssrc"] = htmlspecialchars(value1["newssrc"]);
                    value1["newspath"] = htmlspecialchars(value1["newspath"]);
            	});
            	res.json(rows1);
            	connection.end();
            });	
        });
    }
    // console.log(req);
    // res.json({
    // 	success:"成功"
    // });
});

module.exports = router;

function htmlspecialchars(str) {
    var s = "";
    if (str.length == 0) return "";
    for (var i = 0; i < str.length; i++) {
        switch (str.substr(i, 1)) {
            case "<":
                s += "&lt;";
                break;
            case ">":
                s += "&gt;";
                break;
            case "&":
                s += "&amp;";
                break;
            case " ":
                if (str.substr(i + 1, 1) == " ") {
                    s += " &nbsp;";
                    i++;
                } else s += " ";
                break;
            case "\"":
                s += "&quot;";
                break;
            case "\n":
                s += "<br>";
                break;
            default:
                s += str.substr(i, 1);
                break;
        }
    }
    return s;
}
