layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage'],function(){
	var form = layui.form(),
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		$ = layui.jquery;
	var member = sessionStorage.getItem("member");
	var memberJson=JSON.parse(member);//把json字符串转成json对象
	var userId = memberJson.userId;
	//加载页面数据
	var linksData = '';
	$.ajax({
		url : "/myblog/user/selectById",
		type : "post",
		dataType : "json",
		data : {
			userId :userId
		},
		success : function(data){
			if(data.code==200){
				linksData = data.res;
				if(window.sessionStorage.getItem("addTypes")){
					var addTypes = window.sessionStorage.getItem("addTypes");
					linksData = JSON.parse(addTypes).concat(linksData);
				}
				//执行加载数据的方法
				linksList();
			}
		}
	})

	//修改博客类型
	$("body").on("click",".links_edit",function(){
		var _this = $(this);
		var userId = _this.attr("data-id")
		var userName = _this.attr("data-name");
		var userPassword = _this.attr("data-pass");
		var index = layui.layer.open({
			title: "修改个人信息",
			type: 2,
			content: "editinfo.html",
			success: function(layero, index) {
				var body = layui.layer.getChildFrame('body', index);
				body.find(".userId").val(userId);
				body.find(".userName").val(userName);
				body.find(".userPassword").val(userPassword);
				form.render();
				layui.layer.tips('点击此处返回个人信息页面', '.layui-layer-setwin .layui-layer-close', {
					tips: 4
				});
			}
		})
		//改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
		$(window).resize(function() {
			layui.layer.full(index);
		})
		layui.layer.full(index);
	})
	

	function linksList(that){
		//渲染数据
		function renderDate(data,curr){
			var dataHtml = '';
				if(!that){
					currData = linksData.concat().splice(curr*nums-nums, nums);
				}else{
					currData = that.concat().splice(curr*nums-nums, nums);
				}
				if(currData.length != 0){
					for(var i=0;i<currData.length;i++){
						dataHtml += '<tr>'
				    	+'<td align="center">'+currData[i].userName+'</td>'
//				    	+'<td align="center">'+currData[i].userPassword+'</td>'
				    	+'<td>'
						+  '<a class="layui-btn layui-btn-mini links_edit" data-id="'+data[i].userId+'" data-name="'+data[i].userName+'" data-pass="'+data[i].userPassword+'"><i class="iconfont icon-edit"></i> 编辑</a>'
				        +'</td>'
				    	+'</tr>';
					}
				}else{
					dataHtml = '<tr><td colspan="7">暂无数据</td></tr>';
				}
		    return dataHtml;
		}

		//分页
		var nums = 10; //每页出现的数据量
		if(that){
			linksData = that;
		}
		laypage({
			cont : "page",
			pages : Math.ceil(linksData.length/nums),
			jump : function(obj){
				$(".links_content").html(renderDate(linksData,obj.curr));
				$('.links_list thead input[type="checkbox"]').prop("checked",false);
		    	form.render();
			}
		})
	}
})
