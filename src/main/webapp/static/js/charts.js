var basePath;
var member = sessionStorage.getItem("member");
var memberJson=JSON.parse(member);//把json字符串转成json对象
var currentUserId = memberJson.userId;
$(function(){
	basePath = $("#basePath").val();
	getMyChart();
	getMyChart2();
})

//柱状图博客类型对应的篇数
function getMyChart(){
	var myChart = echarts.init(document.getElementById('chartmain'));
	// 指定图标的配置和数据
	myChart.setOption({
		title : {
			text : '发布博客类型分布一览图'
		},
		tooltip : {},
		legend : {
			data : ['篇数']
		},
		xAxis : {
			data : []
		},
		yAxis : {

		},
		series : [ {
			center : ['25%','25%'],
			name : '篇数',
			type : 'bar',
			data : []
		} ]
	});
	
	// 异步加载数据
	$.ajax({
		url : basePath + "/article/selectTAN",
		data : {
			userId:currentUserId
		},
		dataType : "json",
		type : "GET",
		success : function(data) {
			var flag = data.res.length;
			var x = "";//博客类型
			var y= "";//博客数量
			for(var i=0;i<flag;i++){
				x+=data.res[i].articleType;
				if(i!=flag-1){
					x+=",";	
				}
			}
			for(var j=0;j<flag;j++){
				y+=data.res[j].articleNum;
				if(j!=flag-1){
					y+=",";	
				}
			}
			var X = new Array();
			var Y = new Array();
			X=x.split(",");
			Y=y.split(",");
			// 填入数据
		    myChart.setOption({
		        xAxis: {
		            data: X
		        },
		        
		        series: [{
		            // 根据名字对应到相应的系列
		            name: '篇数',
		            data: Y
		        }]
		    });
		}
	});
}

//饼状图粉丝数与关注用户数
function getMyChart2(){
	var myChart2 = echarts.init(document.getElementById('chartmain2'));
	myChart2.setOption({
		 title : {
				text : '粉丝数、关注数一览图'
		 },
		 tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'right',
		        data:['粉丝数','关注用户数']
		    },
		    series: [
		        {
		            name:'人数',
		            type:'pie',
		            radius: ['50%', '70%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        fontSize: '30',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:[
		            ]
		        }
		    ]
	});
	//异步加载数据
	$.ajax({
		url : basePath + "/attention/selAnum",
		data : {
			userId:currentUserId,
			attentionUserId:currentUserId
		},
		dataType : "json",
		type : "GET",
		success : function(data){
			//填入数据
			myChart2.setOption({
				series:[{
					data:[{
				    	value : data.fansNum,
						name : '粉丝数'
					},{
				    	value : data.atNum,
						name : '关注用户数'
					}]
					
				}]
			});
		}
		
	})
}

