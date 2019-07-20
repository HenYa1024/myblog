var basePath;// 项目根目录
var vm;
var member = sessionStorage.getItem("member");
var memberJson=JSON.parse(member);//把json字符串转成json对象
$(function(){
	basePath = $("#basePath").val();
	showFoot();
})

function showFoot(){
	if(member==null||member==undefined||member==""){
		alert("请登录后再进行访问!");
		//往sessionstorage 存放登陆成功之后跳转的页面
		sessionStorage.setItem("url_logined","/history.html");
		window.location.href=basePath+"/login.html";//未登录跳转到登录界面
	}
	var userName = memberJson.userName;
	$.ajax({
		url : basePath+"/article/queryByIds",//请求地址
		data:{
			articleId:0,
			userName:userName
		},
		type: "GET",//请求类型
		dataType: "json", //返回类型
		async: true ,//是否异步，默认为true
		success:function(data){
			if(data.code == 200){
				$(".showList").removeAttr("hidden");
				vm = new Vue({//vue初始化
					el:"#myfoot",
					data:{
						articles:data.articles
					}
				})
			}else if(data.code == 500){
				alert("请启动redis后，再访问!")
			}else{
				$(".noFoot").removeAttr("hidden");
			}
		}
	})
}
function toReadBlogs(obj){
	var articleId=obj//获取文章id
	var userName = memberJson.userName;
	sessionStorage.setItem("articleId",articleId);//html5新特性
	$.ajax({
		url : basePath+"/article/queryByIds",//请求地址
		data:{
			articleId:articleId,
			userName:userName
		},
		type: "GET",//请求类型
		dataType: "json", //返回类型
		async: true ,//是否异步，默认为true
		success:function(data){
		}
	})
	window.location.href=basePath+"/info.html?articleId="+articleId;
}