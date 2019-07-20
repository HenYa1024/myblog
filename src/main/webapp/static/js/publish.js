/**
 * 写博客相关js
 */
var articleId =  window.location.href.split("=")[1];
var vm1;
$(function(){
	basePath = $("#basePath").val();
})
function readblog(){
	window.location.href=basePath+"/info.html?articleId="+articleId;
}
