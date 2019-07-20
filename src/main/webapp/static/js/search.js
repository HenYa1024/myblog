var vm;//vue对象
var basePath;// 服务器地址
var member = sessionStorage.getItem("member");
var memberJson=JSON.parse(member);//把json字符串转成json对象
//初始化方法
$(function(){
	basePath = $("#basePath").val();
	searchRes();//搜索结果
})

function searchRes(){
	var DecodeBfname = window.location.href.split("=")[1];
	var name = decodeURI(DecodeBfname);
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
				vm = new Vue({//vue初始化
					el:"#searchRes",
					data:{
						res:data.res, 
					}
				})
			}
		}
	})
}
function toReadBlog(obj){
	var articleId=obj//获取文章id
	sessionStorage.setItem("articleId",articleId);//html5新特性
	if (memberJson == null || memberJson == "" || memberJson == undefined){
		var userName = null;
	}else{
		var userName = memberJson.userName;
	}
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

//退出
function exit(){
	window.sessionStorage.removeItem("member");
}
