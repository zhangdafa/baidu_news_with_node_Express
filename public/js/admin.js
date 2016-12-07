$(document).ready(function() {
	var newstable = $("#table tbody");
	// 初始化数据库
	// $("#init_db").on("click",function(){
	// 	$.ajax({
	// 		url:"./php/init_db.php",
	// 		dataType:"json",
	// 		success:function(data){
	// 			refresh();
	// 		}
	// 	});
	// });
	// 添加数据
	$("#submit-btn").on("click",function(e){
		e.preventDefault();
		// 输入判断
		if ($("#newstitle").val()==""||
			$("#newspath").val()==""||
			$("#newssrc").val()==""||
			!/^(([0-9]){4})-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])$/.test($("#newstime").val())) {
			if ($("#newstitle").val()=="") {
				$("#newstitle").parent().addClass("has-error");
			}else{
				$("#newstitle").parent().removeClass("has-error");
			}
			if ($("#newspath").val()=="") {
				$("#newspath").parent().addClass("has-error");
			}else{
				$("#newspath").parent().removeClass("has-error");
			}
			if ($("#newssrc").val()=="") {
				$("#newssrc").parent().addClass("has-error");
			}else{
				$("#newssrc").parent().removeClass("has-error");
			}
			if (!/^(([0-9]){4})-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])$/.test($("#newstime").val())) {
				$("#newstime").parent().addClass("has-error");
			}else{
				$("#newstime").parent().removeClass("has-error");
			}
		}else{
			$("#newstitle").parent().removeClass("has-error");
			$("#newspath").parent().removeClass("has-error");
			$("#newssrc").parent().removeClass("has-error");
			$("#newstime").parent().removeClass("has-error");
			var jsonNews={
				newstitle:$("#newstitle").val(),
				newspath:$("#newspath").val(),
				newssrc:$("#newssrc").val(),
				newstime:$("#newstime").val(),
				newstype:$("#newstype").val()
			}
			$.ajax({
				url:"/admin/insert_db",
				type:"post",
				data:jsonNews,
				dataType:"json",
				success:function(data){
					console.log(data);
					refresh();
				}
			});
		}
	});
	// ID
	var deleteid=null;
	var updataid=null;
	// 删除按钮
	newstable.on("click",".btn-danger",function(){
		deleteid=$(this).parent().prevAll().eq(5).html();
		$("#deleteModal").modal("show");
	});
	// deleteModal中的删除按钮
	$("#confirm-delete").on("click",function(){
		if (deleteid) {
			$.ajax({
				url:"/admin/delete_db",
				type:"post",
				data:{delete_id:deleteid},
				dataType:"json",
				success:function(data){
					$("#deleteModal").modal("hide");
					refresh();
				}
			});
		}
	});
	// 修改按钮
	newstable.on("click",".btn-primary",function(){
		updataid=$(this).parent().prevAll().eq(5).html();
		$("#updataModal").modal("show");
		$.ajax({
			url:"/admin/curnews",
			type:"post",
			data:{newsid:updataid},
			dataType:"json",
			success:function(data){
				data.forEach(function(value,index){

				$("#unewstitle").val(value.newstitle);
				$("#unewspath").val(value.newspath);
				$("#unewssrc").val(value.newssrc);
				$("#unewstime").val(value.newstime);
				$("#unewstype").val(value.newstype);
				});
			}
		});
	});
	// updataModal中的修改按钮
	$("#confirm-updata").on("click",function(){
		// 输入判断
		if ($("#unewstitle").val()==""||
			$("#unewspath").val()==""||
			$("#unewssrc").val()==""||
			!/^(([0-9]){4})-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])$/.test($("#unewstime").val())) {
			if ($("#unewstitle").val()=="") {
				$("#unewstitle").parent().addClass("has-error");
			}else{
				$("#unewstitle").parent().removeClass("has-error");
			}
			if ($("#unewspath").val()=="") {
				$("#unewspath").parent().addClass("has-error");
			}else{
				$("#unewspath").parent().removeClass("has-error");
			}
			if ($("#unewssrc").val()=="") {
				$("#unewssrc").parent().addClass("has-error");
			}else{
				$("#unewssrc").parent().removeClass("has-error");
			}
			if (!/^(([0-9]){4})-(0[0-9]|1[0-2])-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])$/.test($("#unewstime").val())) {
				$("#unewstime").parent().addClass("has-error");
			}else{
				$("#unewstime").parent().removeClass("has-error");
			}
		}else{
			$("#unewstitle").parent().removeClass("has-error");
			$("#unewspath").parent().removeClass("has-error");
			$("#unewssrc").parent().removeClass("has-error");
			$("#unewstime").parent().removeClass("has-error");
			var jsonNews={
					newsid:updataid,
					newstitle:$("#unewstitle").val(),
					newspath:$("#unewspath").val(),
					newssrc:$("#unewssrc").val(),
					newstime:$("#unewstime").val(),
					newstype:$("#unewstype").val()
				};
			if(updataid){
				$.ajax({
					url:"/admin/updata_db",
					type:"post",
					data:jsonNews,
					dataType:"json",
					success:function(data){
						$("#updataModal").modal("hide");
						refresh();
					}
				});
			}
		}
	});
	//  后台的第一次刷新
    refresh();
});

function refresh() {
    // 清空表身
    var newstable = $("#table tbody");
    newstable.empty();
    $.ajax({
        dataType: "json",
        type: "get",
        url: "/news",
        success: function(data) {
        	console.log(data);
            data.forEach(function(value,index) {
                var newsid = $("<td></td>").html(value.newsid);
                var newstype = $("<td></td>").html(value.newstype);
                var newstitle = $("<td></td>").html(value.newstitle);
                var newspath = $("<td></td>").html(value.newspath);
                var newssrc = $("<td></td>").html(value.newssrc);
                var newstime = $("<td></td>").html(value.newstime);
                var newsbtn = $("<td></td>");
                var newsbtn_updata = $("<button></button>").addClass("btn btn-primary btn-xs").html("修改").appendTo(newsbtn);
                var newsbtn_delete = $("<button></button>").addClass("btn btn-danger btn-xs").html("删除").appendTo(newsbtn);
                var newstr = $("<tr></tr>");
                newstr.append(newsid, newstype, newstitle, newspath, newssrc, newstime, newsbtn);
                newstr.appendTo(newstable);
            });

        }


    });
}
