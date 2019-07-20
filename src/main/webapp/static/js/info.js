var basePath;// 项目根目录
var vm;
var attentionUserId;
var attentionUserName;
var member = sessionStorage.getItem("member");
var memberJson=JSON.parse(member);//把json字符串转成json对象
var currentUserId;
var articleUserId;
$(function(){
	basePath = $("#basePath").val();
	//获取传递的商品id
	articleId= window.location.href.split("=")[1];
	if(articleId==null){
		articleId=sessionStorage.getItem("articleId");
	}
	readblog();
})
/*
 * 查看博客内容
 */
function readblog(){
	$.ajax({
		url : basePath+"/article/queryById",//请求地址
		data:{
			id:articleId
		},
		type: "GET",//请求类型
		dataType: "json", //返回类型
		//async: false ,//是否异步，默认为true
		success:function(data){
			if(data.status == 200){
				articleUserId = data.articleUser.userId;
				attentionUserId = data.res.userId;
				attentionUserName = data.articleUser.userName;
				$(".news_title").text(data.res.articleTitle);
				$(".au01").text(data.articleUser.userName);
				$(".au02").text(data.res.articleTime);
				$("#ArticleContent").text(data.res.articleContent);
				$(".author1").text(data.articleUser.userName);
				editormd.markdownToHTML("test1", {
                    htmlDecode      : "style,script,iframe",  // you can filter tags decode
                    emoji           : true,
                    taskList        : true,
                    tex             : true,  // 默认不解析
                    flowChart       : true,  // 默认不解析
                    sequenceDiagram : true,  // 默认不解析
                });
				if(data.res.articleStates=="unChecked"){
					$(".fbComment").removeAttr("hidden");
				}else if(member==null||member==undefined||member==""){
					$(".login_tips").removeAttr("hidden");//若用户没有登录则禁止评论
				}else{
					$(".outComment").removeAttr("hidden");
				}
				attentionYoN();
				showUser();
			}
		}
	})
}
/**
 * 添加关注
 */
function addAttention(){
	if(member==null||member==undefined||member==""){
		//往sessionstorage 存放登陆成功之后跳转的页面
		sessionStorage.setItem("url_logined","/info.html");
		alert("请登录后,再进行注册操作!")
		window.location.href=basePath+"/login.html";//未登录跳转到登录界面
	}else{
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

/*
 * 判断当前用户是否关注该博主
 */
function attentionYoN(){
	if(member==null||member==undefined||member==""){
		$("#isAttention").removeAttr("hidden");//显示未关注 
	}else{
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
				if(data.code==200){
					$("#noAttention").removeAttr("hidden");//显示取消关注 
				}else if(attentionUserId == currentUserId){
					// 说明此博客就是博主本人，不显示+关注按钮
				}else{
					$("#isAttention").removeAttr("hidden");//显示未关注
				}
			}

		})
	}
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