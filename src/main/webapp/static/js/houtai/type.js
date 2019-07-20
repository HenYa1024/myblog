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
		url : "/myblog/artype/selByUid",
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

	//查询
	$(".search_btn").click(function(){
		var newArray = [];
		var typeName = $(".search_input").val();
		if($(".search_input").val() != ''){
			var index = layer.msg('查询中，请稍候',{icon: 16,time:false,shade:0.8});
            setTimeout(function(){
            	$.ajax({
					url : "/myblog/artype/selBynu",
					type : "get",
					dataType : "json",
					data :{
						typeName:typeName,
						userId : userId
					},
					success : function(data){
						if(window.sessionStorage.getItem("addTypes")){
							var addTypes = window.sessionStorage.getItem("addTypes");
							linksData = JSON.parse(addTypes).concat(data.res);
						}else{
							linksData = data.res;
						}
						for(var i=0;i<linksData.length;i++){
							var linksStr = linksData[i];
							var selectStr = $(".search_input").val();
		            		function changeStr(data){
		            			var dataStr = '';
		            			var showNum = data.split(eval("/"+selectStr+"/ig")).length - 1;
		            			if(showNum > 1){
									for (var j=0;j<showNum;j++) {
		            					dataStr += data.split(eval("/"+selectStr+"/ig"))[j] + selectStr ;
		            				}
		            				dataStr += data.split(eval("/"+selectStr+"/ig"))[showNum];
		            				return dataStr;
		            			}else{
		            				dataStr = data.split(eval("/"+selectStr+"/ig"))[0] + selectStr + data.split(eval("/"+selectStr+"/ig"))[1];
		            				return dataStr;
		            			}
		            		}
		            		//类型名称
		            		if(linksStr.typeName.indexOf(selectStr) > -1){
			            		linksStr["typeName"] = changeStr(linksStr.typeName);
		            		}
		            		if(linksStr.typeName.indexOf(selectStr) > -1){
		            			newArray.push(linksStr);
		            		}
		            	}
		            	linksData = newArray;
		            	linksList(linksData);
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
		var $checkbox = $('.links_list tbody input[type="checkbox"][name="checked"]');
		var $checked = $('.links_list tbody input[type="checkbox"][name="checked"]:checked');
		var list = new Array();
		if($checkbox.is(":checked")){
			layer.confirm('确定删除选中的信息？',{icon:3, title:'提示信息'},function(index){
				var index = layer.msg('删除中，请稍候',{icon: 16,time:false,shade:0.8});
	            setTimeout(function(){
	            	//删除数据
	            	for(var j=0;j<$checked.length;j++){
	            		for(var i=0;i<linksData.length;i++){
							if(linksData[i].typeId == $checked.eq(j).parents("tr").find(".links_del").attr("data-id")){
								list.push(linksData[i].typeId);
								linksData.splice(i,1);
								linksList(linksData);
							}
						}
	            	}
	            	$.ajax({
	    				url : "/myblog/artype/delByIds",// 请求地址
	    				type : "GET",// 请求类型
	    				dataType : "json",// 返回类型
	    				data : {
	    					ids:list.toString()
	    				},
	    				success : function(data) {
	    					if(data.code==200){
	    						$('.links_list thead input[type="checkbox"]').prop("checked",false);
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

	//通过判断类型是否全部选中来确定全选按钮是否选中
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
 
	//删除
	$("body").on("click",".links_del",function(){  
		var _this = $(this);
		var flag = null;
		layer.confirm('确定删除此信息？',{icon:3, title:'提示信息'},function(index){
			for(var i=0;i<linksData.length;i++){
				if(linksData[i].typeId == _this.attr("data-id")){
					flag = linksData[i].typeId;
					linksData.splice(i,1);
					linksList(linksData);
				}
			}
			$.ajax({
				url : "/myblog/artype/delByIds",// 请求地址
				type : "GET",// 请求类型
				dataType : "json",// 返回类型
				data : {
					ids:flag
				},
				success : function(data) {
					if(data.code==200){
						form.render();
						layer.msg("删除成功!");
					}
					layer.close(index);
				}
			})
		});
	})
	
	//修改博客类型
	$("body").on("click",".links_edit",function(){
		var _this = $(this);
		var typeName = _this.attr("data-name");
		var id = _this.attr("data-id")
		var index = layui.layer.open({
			title: "修改博客类型",
			type: 2,
			content: "editType.html",
			success: function(layero, index) {
				var body = layui.layer.getChildFrame('body', index);
				body.find(".typeId").val(id);
				body.find(".typeName").val(typeName);
				form.render();
				layui.layer.tips('点击此处返回类型列表', '.layui-layer-setwin .layui-layer-close', {
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
	
	//添加博客类型
	$(".linksAdd_btn").click(function() {
		var index = layui.layer.open({
			title: "添加博客类型",
			type: 2,
			content: "AddType.html",
			success: function(layero, index) {
				layui.layer.tips('点击此处返回类型列表', '.layui-layer-setwin .layui-layer-close', {
					tips: 3
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
				    	+'<td><input type="checkbox" name="checked" lay-skin="primary" lay-filter="choose"></td>'
				    	+'<td align="left">'+currData[i].typeName+'</td>'
				    	+'<td>'
						+  '<a class="layui-btn layui-btn-mini links_edit" data-id="'+data[i].typeId+'" data-name="'+data[i].typeName+'"><i class="iconfont icon-edit"></i> 编辑</a>'
						+  '<a class="layui-btn layui-btn-danger layui-btn-mini links_del" data-id="'+data[i].typeId+'"><i class="layui-icon">&#xe640;</i> 删除</a>'
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
