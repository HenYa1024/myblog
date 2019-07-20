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
 		var userId = $(".userId").val();
	 	var userName = $(".userName").val();
	 	var userPassword = $(".userPassword").val();
 		//弹出loading
 		var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
        	$.ajax({
				url : "/myblog/user/updateUser",// 请求地址
				type : "post",// 请求类型
				dataType : "json",// 返回类型
				data : {
					userId:userId,
					userName:userName,
					userPassword:userPassword
				},
				success : function(data) {
					if(data.code==200){
						top.layer.close(index);
						top.layer.msg("个人信息修改成功！");
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
