var express = require('express');
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "baidunews",
    dateStrings: true
});
// 增加数据
router.post('/insert_db', function(req, res, next) {

    var newstitle = req.body.newstitle,
        newspath = req.body.newspath,
        newssrc = req.body.newssrc,
        newstime = req.body.newstime,
        newstype = req.body.newstype;
    connection.query("SELECT newsType_id FROM newstype WHERE newsType_name=?", [newstype], function(err, rows) {
        rows.forEach(function(value, index) {
            newstype = value["newsType_id"];
        });
        connection.query("INSERT INTO news (newsid,newspath,newstitle,newssrc,newstype,newstime,newsstatus) VALUES (NULL,?,?,?,?,?,1)", [newspath, newstitle, newssrc, newstype, newstime],
            function(err, result) {
                res.json({ success: "添加成功" });
            });
    });
});
// 删除数据
router.post('/delete_db', function(req, res) {
    var newsid = req.body.delete_id;
    connection.query("UPDATE news SET newsstatus=0 WHERE newsid=?", [newsid], function(err, rows) {
        res.json({ success: "删除成功" });
    });
});
// 模态框的获取
router.post('/curnews', function(req, res) {
    var newsid = req.body.newsid;
    connection.query("SELECT * FROM newstype", function(err2, rows2) {
        connection.query("SELECT * FROM news WHERE newsid=?", [newsid], function(err1, rows1) {
            rows1.forEach(function(value1, index1) {
                // value["newstype"]=?;
                newstype = value1["newstype"];
                rows2.forEach(function(value2, index2) {
                    if (value2["newsType_id"] == newstype) {
                        newstype = value2["newsType_name"];
                    }
                });
                value1["newstype"] = newstype;

            });
            res.json(rows1);

        });
    });
});
// 修改数据
router.post('/updata_db', function(req, res) {
    var newstitle = req.body.newstitle,
        newspath = req.body.newspath,
        newssrc = req.body.newssrc,
        newstime = req.body.newstime,
        newstype = req.body.newstype,
        newsid=req.body.newsid;
    connection.query("SELECT `newsType_id` FROM `newsType` WHERE `newsType_name`=?", [newstype], function(err, rows) {
        rows.forEach(function(value, index) {
            newstype = value["newsType_id"];
        });
        console.log(newstype);
        // 第二次查询要放在回调中（回调是异步的）
        connection.query("UPDATE news SET newstitle = ?, newspath = ?, newssrc = ?,newstime=?,newstype=? WHERE newsid = ?",
        				[newstitle,newspath,newssrc,newstime,newstype,newsid],
			            function(err, rows) {
			                if (err) throw err;
			                
			                res.json({success:"修改成功"});
			                
        });
    });
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
