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
	var newsData = '';
	$.ajax({
		url : "/myblog/article/selectByUid",
		type : "get",
		dataType : "json",
		data : {
			userId :userId
		},
		success : function(data){
			newsData = data.res;
			if(window.sessionStorage.getItem("addNews")){
				var addNews = window.sessionStorage.getItem("addNews");
				newsData = JSON.parse(addNews).concat(newsData);
			}
			//执行加载数据的方法
			newsList();
		}
	})
	//查询
	$(".search_btn").click(function(){
		var newArray = [];
		var articleTitle = $(".search_input").val();
		if( articleTitle!= ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "/myblog/article/selBytu",
					type : "get",
					dataType : "json",
					data :{
						articleTitle:articleTitle,
						userId : userId
					},
					success : function(data){
						if(window.sessionStorage.getItem("addNews")){
							var addNews = window.sessionStorage.getItem("addNews");
							newsData = JSON.parse(addNews).concat(data.res);
						}else{
							newsData = data.res;
						}
						for(var i=0;i<newsData.length;i++){
							var newsStr = newsData[i];
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
		            		//文章标题
		            		if(newsStr.articleTitle.indexOf(selectStr) > -1){
			            		newsStr["articleTitle"] = changeStr(newsStr.articleTitle);
		            		}
		            		//文章类型
		            		if(newsStr.articleType.indexOf(selectStr) > -1){
			            		newsStr["articleType"] = changeStr(newsStr.articleType);
		            		}
		            		//发布时间
		            		if(newsStr.articleTime.indexOf(selectStr) > -1){
			            		newsStr["articleTime"] = changeStr(newsStr.articleTime);
		            		}
		            		if(newsStr.articleTitle.indexOf(selectStr)>-1 || newsStr.articleType.indexOf(selectStr)>-1 || newsStr.articleTime.indexOf(selectStr)>-1){
		            			newArray.push(newsStr);
		            		}
		            	}
		            	newsData = newArray;
		            	newsList(newsData);
					}
				})
            	
                layer.close(index);
            },1000);
		}else{
			layer.msg("请输入需要查询的内容");
		}
	})
	//批量删除
	$(".batchDel").click(function(){
		var $checkbox = $('.news_list tbody input[type="checkbox"][name="checked"]');
		var $checked = $('.news_list tbody input[type="checkbox"][name="checked"]:checked');
		var list = new Array();
		if($checkbox.is(":checked")){
			layer.confirm('确定删除选中的信息？',{icon:3, title:'提示信息'},function(index){
				var index = layer.msg('删除中，请稍候',{icon: 16,time:false,shade:0.8});
	            setTimeout(function(){
	            	//删除数据
	            	for(var j=0;j<$checked.length;j++){
	            		for(var i=0;i<newsData.length;i++){
							if(newsData[i].articleId == $checked.eq(j).parents("tr").find(".news_del").attr("data-id")){
								list.push(newsData[i].articleId);
								newsData.splice(i,1);
								newsList(newsData);
							}
						}
	            	}
	            	$.ajax({
	    				url : "/myblog/article/delByIds",// 请求地址
	    				type : "get",// 请求类型
	    				dataType : "json",// 返回类型
	    				data : {
	    					ids:list.toString()
	    				},
	    				success : function(data) {
	    					if(data.code==200){
	    						$('.news_list thead input[type="checkbox"]').prop("checked",false);
	    		            	form.render();
	    						layer.msg("删除成功");
	    					}
	    					layer.close(index);
	    				}

	    			})
	            },1000);
	        })
		}else{
			layer.msg("请选择需要删除的文章");
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

	//通过判断文章是否全部选中来确定全选按钮是否选中
	form.on("checkbox(choose)",function(data){
		var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"])');
		var childChecked = $(data.elem).parents('table').find('tbody input[type="checkbox"]:not([name="show"]):checked')
		if(childChecked.length == child.length){
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = true;
		}else{
			$(data.elem).parents('table').find('thead input#allChoose').get(0).checked = false;
		}
		form.render('checkbox');
	})

	//是否允许评论
	form.on('switch(isShow)', function(data){
		var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
        	var articleId = data.value;
        	if(data.elem.checked){
        		var articleStates = "checked";
        	}else{
        		var articleStates = "unChecked";
        	}
        	$.ajax({
				url : "/myblog/article/upstates",// 请求地址
				type : "get",// 请求类型
				dataType : "json",// 返回类型
				data : {
					articleId:articleId,
					articleStates:articleStates
				},
				success : function(data) {
					if(data.code==200){
						layer.close(index);
						layer.msg("评论状态修改成功！");
					}else{
						layer.close(index);
						layer.msg("评论状态修改失败！");
					}
				}
			})
        },500);
	})
 
	//编辑
	$("body").on("click",".news_edit",function(){  
		var _this = $(this);
		var articleId = _this.attr("data-id");
		window.parent.location.href="/myblog/writeblog.html?articleId="+articleId;
	})
	
	//删除
	$("body").on("click",".news_del",function(){  
		var _this = $(this);
		var flag = null;
		layer.confirm('确定删除此信息？',{icon:3, title:'提示信息'},function(index){
			//_this.parents("tr").remove();
			for(var i=0;i<newsData.length;i++){
				if(newsData[i].articleId == _this.attr("data-id")){
					flag = newsData[i].articleId;
					newsData.splice(i,1);
					newsList(newsData);
				}
			}
			$.ajax({
				url : "/myblog/article/delByIds",// 请求地址
				type : "get",// 请求类型
				dataType : "json",// 返回类型
				data : {
					ids:flag
				},
				success : function(data) {
					if(data.code==200){
						layer.msg("删除成功");
					}
				}
			})
		});
	})

	//查看
	$("body").on("click",".news_look",function(){  
		var _this = $(this);
		var articleId = _this.attr("data-id");
		var member = sessionStorage.getItem("member");
		var memberJson=JSON.parse(member);//把json字符串转成json对象
		var userName = memberJson.userName;
		$.ajax({
			url : "/myblog/article/queryByIds",//请求地址
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
		window.parent.location.href="/myblog/info.html?articleId="+articleId;
	})
	
	function newsList(that){
		//渲染数据
		function renderDate(data,curr){
			var dataHtml = '';
			if(!that){
				currData = newsData.concat().splice(curr*nums-nums, nums);
			}else{
				currData = that.concat().splice(curr*nums-nums, nums);
			}
			if(currData.length != 0){
				for(var i=0;i<currData.length;i++){
					dataHtml += '<tr>'
			    	+'<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
			    	+'<td align="left">'
			    	+'<a class="news_look" data-id="'+data[i].articleId+'">'+currData[i].articleTitle+'</a>'
			    	+'</td>'
			    	+'<td>'+currData[i].articleType+'</td>';
			    	dataHtml += '</td>'
			    	+'<td>'+currData[i].articleTime+'</td>'
			    	+'<td><input class="test1" type="checkbox" name="show" lay-skin="switch" lay-text="是|否" lay-filter="isShow" '+data[i].articleStates+' value="'+data[i].articleId+'"></td>'
			    	+'<td>'
					+  '<a class="layui-btn layui-btn-mini news_edit" data-id="'+data[i].articleId+'"><i class="iconfont icon-edit"></i> 编辑</a>'
					+  '<a class="layui-btn layui-btn-danger layui-btn-mini news_del" data-id="'+data[i].articleId+'"><i class="layui-icon">&#xe640;</i> 删除</a>'
			        +'</td>'
			    	+'</tr>';
				}
			}else{
				dataHtml = '<tr><td colspan="8">暂无数据</td></tr>';
			}
		    return dataHtml;
		}

		//分页
		var nums = 10; //每页出现的数据量
		if(that){
			newsData = that;
		}
		laypage({
			cont : "page",
			pages : Math.ceil(newsData.length/nums),
			jump : function(obj){
				$(".news_content").html(renderDate(newsData,obj.curr));
				$('.news_list thead input[type="checkbox"]').prop("checked",false);
		    	form.render();
			}
		})
	}
})
