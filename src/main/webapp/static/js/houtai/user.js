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
	var usersData = '';
	$.ajax({
		url : "/myblog/attention/selectByUid",
		type : "get",
		dataType : "json",
		data:{
			userId:userId
		},
		success : function(data){
			if(data.code==200){
				usersData = data.res;
				if(window.sessionStorage.getItem("addUsers")){
					var addUsers = window.sessionStorage.getItem("addUsers");
					usersData = JSON.parse(addUsers).concat(usersData);
				}
				//执行加载数据的方法
				linksList();
			}
		}
	})

	//查询
	$(".search_btn").click(function(){
		var newArray = [];
		var attentionName = $(".search_input").val();
		if($(".search_input").val() != ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
            		url : "/myblog/attention/selByAu",
					type : "get",
					dataType : "json",
					data:{
						attentionUserName:attentionName,
						userId:userId
					},
					success : function(data){
						if(window.sessionStorage.getItem("addUsers")){
							var addUsers = window.sessionStorage.getItem("addUsers");
							usersData = JSON.parse(addUsers).concat(data.res);
						}else{
							usersData = data.res;
						}
						for(var i=0;i<usersData.length;i++){
							var linksStr = usersData[i];
							var selectStr = $(".search_input").val();
		            		function changeStr(data){
		            			var dataStr = '';
		            			var showNum = data.split(eval("/"+selectStr+"/ig")).length - 1;
		            			if(showNum > 1){
									for (var j=0;j<showNum;j++) {
		            					dataStr += data.split(eval("/"+selectStr+"/ig"))[j] + selectStr;
		            				}
		            				dataStr += data.split(eval("/"+selectStr+"/ig"))[showNum];
		            				return dataStr;
		            			}else{
		            				dataStr = data.split(eval("/"+selectStr+"/ig"))[0] + selectStr + data.split(eval("/"+selectStr+"/ig"))[1];
		            				return dataStr;
		            			}
		            		}
		            		//关注用户名字
		            		if(linksStr.attentionUserName.indexOf(selectStr) > -1){
			            		linksStr["attentionUserName"] = changeStr(linksStr.attentionUserName);
		            		}
		            		if(linksStr.attentionUserName.indexOf(selectStr) > -1){
		            			newArray.push(linksStr);
		            		}
		            	}
						usersData = newArray;
		            	linksList(usersData);
					}
				})
            	
                layer.close(index);
            },1000);
		}else{
			layer.msg("请输入需要查询的内容");
		}
	})



	//批量取关
	$(".batchDel").click(function(){
		var $checkbox = $('.links_list tbody input[type="checkbox"][name="checked"]');
		var $checked = $('.links_list tbody input[type="checkbox"][name="checked"]:checked');
		var list = new Array();
		if($checkbox.is(":checked")){
			layer.confirm('确定取关选中的用户？',{icon:3, title:'提示信息'},function(index){
				var index = layer.msg('取关中，请稍候',{icon: 16,time:false,shade:0.8});
	            setTimeout(function(){
	            	//删除数据
	            	for(var j=0;j<$checked.length;j++){
	            		for(var i=0;i<usersData.length;i++){
							if(usersData[i].attentionId == $checked.eq(j).parents("tr").find(".links_del").attr("data-id")){
								list.push(usersData[i].attentionId);
								usersData.splice(i,1);
								linksList(usersData);
							}
						}
	            	}
	            	$.ajax({
	    				url : "/myblog/attention/delByIds",// 请求地址
	    				type : "get",// 请求类型
	    				dataType : "json",// 返回类型
	    				data : {
	    					ids:list.toString()
	    				},
	    				success : function(data) {
	    					if(data.code==200){
	    						$('.links_list thead input[type="checkbox"]').prop("checked",false);
	    		                layer.close(index);
	    						layer.msg("取关成功");
	    						form.render();
	    					}
	    				}
	    			})
	            },1000);
	        })
		}else{
			layer.msg("请选择需要取关的用户");
		}
	})

	//全选
	form.on('checkbox(allChoose)', function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		child.each(function(index, item){
			item.checked = data.elem.checked;
		});
		form.render('checkbox');
	});

	//通过判断是否全部选中来确定全选按钮是否选中
	form.on("checkbox(choose)",function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		var childChecked = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"]):checked')
		data.elem.checked;
		if(childChecked.length == child.length){
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = true;
		}else{
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = false;
		}
		form.render('checkbox');
	})
	
	//查看用户主页
	$("body").on("click",".users_page",function(){  
		var _this = $(this);
		var userId = _this.attr("data-id");
		window.parent.location.href="/myblog/userHomePage.html?userId="+userId;
	})
 
	//取关
	$("body").on("click",".links_del",function(){  
		var _this = $(this);
		var flag;
		layer.confirm('确定取关此用户？',{icon:3, title:'提示信息'},function(index){
			//_this.parents("tr").remove();
			for(var i=0;i<usersData.length;i++){
				if(usersData[i].attentionId == _this.attr("data-id")){
					flag=usersData[i].attentionId;
					usersData.splice(i,1);
					linksList(usersData);
				}
			}
			$.ajax({
				url : "/myblog/attention/delByIds",// 请求地址
				type : "get",// 请求类型
				dataType : "json",// 返回类型
				data : {
					ids:flag
				},
				success : function(data) {
					if(data.code==200){
						layer.msg("取关成功");
                        location.reload();
					}
				}
			})
			layer.close(index);
		});
	})
	
	function linksList(that){
		//渲染数据
		function renderDate(data,curr){
			var dataHtml = '';
			if(!that){
				currData = usersData.concat().splice(curr*nums-nums, nums);
			}else{
				currData = that.concat().splice(curr*nums-nums, nums);
			}
			if(currData.length != 0){
				for(var i=0;i<currData.length;i++){
					dataHtml += '<tr>'
			    	+'<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
			    	+'<td align="left">'+currData[i].attentionUserName+'</td>'
			    	+'<td>'
					+  '<a class="layui-btn layui-btn-mini users_page" data-id="'+data[i].attentionUserId+'"><i class="iconfont icon-edit"></i> 查看用户主页</a>'
					+  '<a class="layui-btn layui-btn-danger layui-btn-mini links_del" data-id="'+data[i].attentionId+'"><i class="layui-icon">&#xe640;</i> 取消关注</a>'
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
			usersData = that;
		}
		laypage({
			cont : "page",
			pages : Math.ceil(usersData.length/nums),
			jump : function(obj){
				$(".links_content").html(renderDate(usersData,obj.curr));
				$('.links_list thead input[type="checkbox"]').prop("checked",false);
		    	form.render();
			}
		})
	}
})
