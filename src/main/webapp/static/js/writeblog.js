/**
 * 写博客相关js
 */

var basePath;// 项目根目录
var vm;//vue对象
var articleType;
var member=sessionStorage.getItem("member");
var memberJson=JSON.parse(member);//把json字符串转成json对象
var articleId= window.location.href.split("=")[1];
$(function(){
	basePath = $("#basePath").val();
	if(member==null||member==undefined||member==""){
		alert("请登录后再进行访问!");
		//往sessionstorage 存放登陆成功之后跳转的页面
		sessionStorage.setItem("url_logined","/writeblog.html");
		window.location.href=basePath+"/login.html";//未登录跳转到登录界面
	}
	blogType();
	if(articleId!=null && articleId!=undefined && articleId!=""){
		modifyBlog();
	}
})
$(document).ready(function(){
			$(".textfield").change(function(){ 
				articleType =($("select option:selected").text()); //文章类型
			}); 
		});


function publishArticle() {
		var userId=memberJson.userId;//用户id
		if($("select option:selected").val()==0){
			alert("请选择博客类型!");
			return;
		}
		articleId = window.location.href.split("=")[1];
		//将发布文章添加至数据库
		var articleTitle = $(".input_title").val();// 标题内容
		var articleContent = $("#editormds").val();// 文章内容
		$.ajax({
			url : basePath+"/article/addArticle",//请求地址，添加购物车
			data:{
				articleId:articleId,
				userId:userId,
				articleTitle:articleTitle,
				articleContent:articleContent,
				articleType:articleType
			},
			type: "POST",//请求类型
			dataType: "json", //返回类型
			//async: false ,//是否异步，默认为true
			success:function(data){
				if(data.status == 200){
					var articleId=data.id;//发布成功后，文章id，即文章Key
					window.location.href = basePath + "/publish.html"+"?articleId="+articleId+"&title="+encodeURI(articleTitle);
				}
			}
		})
}

function fbarticle(){
	var articleTitle = $(".input_title").val();// 标题内容
	var articleContent = $("#editormds").val();// 文章内容
	if(articleTitle==null||articleTitle==undefined||articleTitle==""){
		alert("请填写博客标题");
		return;
	}else if(articleContent==null||articleContent==undefined||articleContent==""){
		alert("文章内容不能为空");
		return;
	}
	$("#fb-article").show();
}
function closearticle(){
	$("#fb-article").hide();
}

function modifyBlog(){
	$.ajax({
		url : basePath+"/article/queryById",
		data:{
			id:articleId
		},
		type: "GET",//请求类型
		dataType: "json", //返回类型
		//async: false ,//是否异步，默认为true
		success:function(data){
			if(data.status == 200){
				var article = data.res;
				$(".input_title").val(article.articleTitle);
				$("#editormds").val(article.articleContent);
			}
		}
	})
}

function blogType() {
	var userId=memberJson.userId;//用户id
	$.ajax({
		url : basePath + "/artype/selByUid",
		data : {
			userId : userId
		},
		type : "POST",// 请求类型
		dataType : "json", // 返回类型
		// async: false ,//是否异步，默认为true
		success : function(data) {
			if (data.code == 200) {
				var vm = new Vue({// vue初始化
					el : "#blogType",
					data : {
						options : data.res
					}
				})
			}
		}
	})
}