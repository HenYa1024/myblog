/**
 * 平台首页js
 */
var vm;//vue对象
var basePath;// 服务器地址
//判断用户有无登录
var member = sessionStorage.getItem("member");
//初始化方法
$(function(){
	basePath = $("#basePath").val();
	if (member == null || member == "" || member == undefined) {
		//未登录
		$("#loginAndReg").removeAttr("hidden");//显示 “登录、注册
	}else {
		//已登录
		var memberJson=JSON.parse(member);
		$("#exit").removeAttr("hidden");//显示”退出
	}
})

function writeblog(){
	if(member==null||member==undefined||member==""){
		alert("请登录后再进行访问!");
		//往sessionstorage 存放登陆成功之后跳转的页面
		sessionStorage.setItem("url_logined","/writeblog.html");
		window.location.href=basePath+"/login.html";//未登录跳转到登录界面
	}else{
		window.location.href=basePath+"/writeblog.html";
	}
}

function myHistory(){
	if(member==null||member==undefined||member==""){
		alert("请登录后再进行访问!");
		//往sessionstorage 存放登陆成功之后跳转的页面
		sessionStorage.setItem("url_logined","/history.html");
		window.location.href=basePath+"/login.html";//未登录跳转到登录界面
	}else{
		window.location.href=basePath+"/history.html";//跳转到我的足迹页面
	}
}

function myHomePage(){
	if(member==null||member==undefined||member==""){
		alert("请登录后再进行访问!");
		//往sessionstorage存放登陆成功之后跳转的页面
		sessionStorage.setItem("url_logined","/userHomePage.html");
		window.location.href=basePath+"/login.html";//未登录跳转到登录界面
	}else{
		var memberJson=JSON.parse(member);//把json字符串转成json对象
		var userId = memberJson.userId;
		window.location.href=basePath+"/userHomePage.html?userId="+userId;//跳转到我的足迹页面
	}
}

function myCenter(){
	if(member==null||member==undefined||member==""){
		alert("请登录后再进行访问!");
		//往sessionstorage 存放登陆成功之后跳转的页面
		sessionStorage.setItem("url_logined","/houtai.html");
		window.location.href=basePath+"/login.html";//未登录跳转到登录界面
	}else{
		window.location.href=basePath+"/houtai.html";//跳转到个人中心页面
	}
}

function toLogin(){
	articleId = window.location.href.split("=")[1];
	//往sessionstorage 存放登陆成功之后跳转的页面
	sessionStorage.setItem("url_logined","/info.html?articleId="+articleId);
	window.location.href=basePath+"/login.html";//未登录跳转到登录界面
}
function searchBlog(){
	var name =  $("#searchBlog").val();
	if(name == null || name == "" || name == undefined ){
		alert("请输入搜索内容！")
	}else{
		$.ajax({
			url : basePath+"/article/query",//请求地址
			data:{
				name:name
			},
			type: "GET",//请求类型
			dataType: "json", //返回类型
			//async: false ,//是否异步，默认为true
			success:function(data){
				if(data.status == 200){
					window.location.href = basePath + "/search.html?name="+encodeURI(name);
				}else{
					alert("搜索内容不存在!");
				}
			}
		})
	}
}
//退出
function exit(){
	window.sessionStorage.removeItem("member");
}
