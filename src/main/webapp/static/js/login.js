/**
 * 登录相关js
 */

var basePath;// 项目根目录
$(function() {
	basePath = $("#basePath").val();
})

//// 判断是否登录
//function isLogin() {
//	var member = sessionStorage.getItem("member");
//	if (member == null || member == "" || memberId == undefined) {
//		return true;
//	} else {
//		return false;
//	}
//}

function toLogin() {
	var name = $('#userName').val();
	var pwd = $('#userPwd').val();
	$.ajax({
		url : basePath + '/user/login',
		data : {
			userName : name,
			userPassword : pwd
		},
		type : 'POST',
		dataType : "json",
		success : function(data) {
			if (data.status == 200) {
				sessionStorage.setItem("member", JSON.stringify(data.member));//转成json字符串 保存到sessionStorage
				var member = sessionStorage.getItem("member");
				var memberJson=JSON.parse(member);
				var memberId=memberJson.userId;
				var url = sessionStorage.getItem("url_logined");
				if(url==null){
					window.location.href = basePath + "/index.html";
				}else if(url=="/userHomePage.html") {
					window.location.href = basePath + url+"?userId="+memberId;
				}else{
					window.location.href = basePath + url;
				}
			} else {
				alert("你输入的用户名或者密码不正确，请重新输入！")
			}
		}
	});
}