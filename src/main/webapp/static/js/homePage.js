var basePath;// 项目根目录
var vm;
var attentionUserName;
var member = sessionStorage.getItem("member");
var memberJson=JSON.parse(member);//把json字符串转成json对象
var attentionUserId = window.location.href.split("=")[1];
var currentUserId;
$(function(){
	basePath = $("#basePath").val();
	if(member==null||member==undefined||member==""){
		alert("请登录后再进行访问!");
		//往sessionstorage 存放登陆成功之后跳转的页面
		sessionStorage.setItem("url_logined","/userHomePage.html");
		window.location.href=basePath+"/login.html";//未登录跳转到登录界面
	}
	blogList();
	showUser();
})
/**
 * 查询该博主主页
 */
function blogList(){
	$.ajax({
		url : basePath + "/article/selectByUid",// 请求地址
		type : "get",// 请求类型
		dataType : "json",// 返回类型
		data : {
			userId:attentionUserId
		},
		success : function(data) {
			attentionUserName=data.userName;
			$(".author1").text(attentionUserName);
			if(data.code==200){
				$(".showPage").removeAttr("hidden");
				vm = new Vue({//vue初始化
					el:"#blogList",
					data:{
						blogs:data.res,
						userName:data.userName
					}
				})
			}else{
				$(".noBlog").removeAttr("hidden");
				vm = new Vue({//vue初始化
					el:"#blogList",
					data:{
						userName:data.userName
					}
				})
			}
			attentionYoN();
		}
	})
}

/**
 * 添加关注
 */
function addAttention(){
		currentUserId = memberJson.userId;
		$.ajax({
			url : basePath + "/attention/addAttention",// 请求地址
			type : "post",// 请求类型
			dataType : "json",// 返回类型
			data : {
				userId:currentUserId,
				attentionUserId:attentionUserId,
				attentionUserName:attentionUserName
			},
			success : function(data) {
				if(data.status==200){
					alert("添加关注成功");
					location.reload();
				}else{
					alert("添加关注失败");
				}
			}

		})
}

/*
 * 取消关注
 */
function delAttention(){
	currentUserId = memberJson.userId;
	$.ajax({
		url : basePath + "/attention/delAttention",// 请求地址
		type : "post",// 请求类型
		dataType : "json",// 返回类型
		data : {
			userId:currentUserId,
			attentionUserId:attentionUserId
		},
		success : function(data) {
			if(data.code==200){
				alert("取关成功");
				location.reload();
			}else{
				alert("取关失败");
			}
		}

	})
}


/**
 * 显示用户信息
 */
function showUser(){
	$.ajax({
		url : basePath + "/attention/selAnum",// 请求地址
		type : "get",// 请求类型
		dataType : "json",// 返回类型
		data : {
			attentionUserId:attentionUserId
		},
		success : function(data) {
			if(data.code==200){
				$(".fansNum").text(data.fansNum);
				$(".atNum").text(data.atNum);
			}
		}
	})
}

function attentionYoN(){
		currentUserId = memberJson.userId;
		$.ajax({
			url : basePath + "/attention/selectByIds",// 请求地址
			type : "post",// 请求类型
			dataType : "json",// 返回类型
			data : {
				userId:currentUserId,
				attentionUserId:attentionUserId
			},
			success : function(data) {
				if(currentUserId==attentionUserId){
					return;
				}else if(data.code==200){
					$("#noAttention").removeAttr("hidden");//显示取消关注 
				}else{
					$("#isAttention").removeAttr("hidden");//显示未关注
				}
			}
		})
}

function toReadBlog(obj){
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