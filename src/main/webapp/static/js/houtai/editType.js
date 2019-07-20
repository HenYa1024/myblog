layui.config({
	base : "js/"
}).use(['form','layer','jquery','layedit','laydate'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		layedit = layui.layedit,
		laydate = layui.laydate,
		$ = layui.jquery;
	var member = sessionStorage.getItem("member");
	var memberJson=JSON.parse(member);//把json字符串转成json对象
	var userId = memberJson.userId;
 	form.on("submit(editType)",function(data){
 		var typeId = $(".typeId").val();
	 	var typeName = $(".typeName").val();
 		//弹出loading
 		var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
        	$.ajax({
				url : "/myblog/artype/updateType",// 请求地址
				type : "GET",// 请求类型
				dataType : "json",// 返回类型
				data : {
					typeId:typeId,
					typeName:typeName
				},
				success : function(data) {
					if(data.code==200){
						top.layer.close(index);
						top.layer.msg("博客类型修改成功！");
				 		layer.closeAll("iframe");
				 		//刷新父页面
				 		parent.location.reload();
					}
				}
			})
        },1000);
 		return false;
 	})
	
})
