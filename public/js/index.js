$(document).ready(function() {
    //宽度设置
    var deviceWidth = $("body").width();
    $("nav li").each(function(index, value) {
        if ($(this).find("a").html().split("").length > 2) {
            $(this).width(deviceWidth / 3);
        } else {
            $(this).width(deviceWidth / 6);
        }
    });
    // 分类显示
    $("nav li a").click(function(e){
        e.preventDefault();
        var type=$(this).text();
        refresh(type);
    });
    // 第一次刷新页面
    // $.ajax({
    //     dataType: "json",
    //     url: "/news",
    //     type:"post",
    //     success: function(data) {
    //         console.log(data);
    //         data.forEach(function(value, index) {
    //             var lists = $("article ul");
    //             var list = $("<li></li>").addClass("news-list").appendTo(lists);
    //             var newsimg = $("<div></div>").addClass("newsimg").appendTo(list);
    //             var img = $("<img>").attr("src", value.newspath).appendTo(newsimg);
    //             var newscontent = $('<div></div>').addClass("newscontent").appendTo(list);
    //             var newstitle = $("<h1></h1>").html(value.newstitle).appendTo(newscontent);
    //             var p = $("<p></p>").appendTo(newscontent);
    //             var newstime = $("<span></span>").html(value.newstime).appendTo(p);
    //             var newssrc = $("<span></span>").html(value.newssrc).appendTo(p);
    //         });
    //     }
    // });
    refresh("推荐");
    


});

function refresh(type) {
    var lists = $("article ul");
    lists.empty();
    $.ajax({
        dataType: "json",
        url: "/news",
        data: {newstype:type},
        type:"get",
        success: function(data) {
            console.log(data);
            data.forEach(function(value, index) {
                var list = $("<li></li>").addClass("news-list").appendTo(lists);
                var newsimg = $("<div></div>").addClass("newsimg").appendTo(list);
                var img = $("<img>").attr("src", value.newspath).appendTo(newsimg);
                var newscontent = $('<div></div>').addClass("newscontent").appendTo(list);
                var newstitle = $("<h1></h1>").html(value.newstitle).appendTo(newscontent);
                var p = $("<p></p>").appendTo(newscontent);
                var newstime = $("<span></span>").html(value.newstime).appendTo(p);
                var newssrc = $("<span></span>").html(value.newssrc).appendTo(p);
            });
        }
    });
    

}
