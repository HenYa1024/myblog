/**
 * 用户注册js
 */

var basePath;// 项目根目录
// 获取当前页面url,及表单验证
$(function() {
	basePath = $("#basePath").val();
	var userName = false;//验证用户名
	var userPassword = false;//验证密码
	var rptPassword = false;//验证重复密码
	// 验证用户名
	$("#userName").focus(function() {
		$(this).addClass("focus");
	}).blur(
			function() {
				var pattern = /^[a-zA-Z]{1}[a-zA-Z0-9]{3,19}$/; // 用户名
				if (!pattern.test($(this).val())) {
					$(this).css({
						'color': 'red',
					});
					$(this).parent().css({
						'border': 'solid 1px red',
					});
					$(this).parent().next().show();
				} else {
					userName = true;
					$(this).css({
						'color': '#ccc',
					});
					$(this).parent().css({
						'border': 'solid 1px #ccc',
					});
					$(this).parent().next().hide();
				}
			});
	// 验证密码
	$("#userPwd").focus(function() {
		$(this).addClass("focus");
	}).blur(
			function() {
				var pattern = /^[a-zA-Z0-9]{6,20}$/;// 验证密码
				if (!pattern.test($(this).val())) {
					$(this).css({
						'color': 'red',
					});
					$(this).parent().css({
						'border': 'solid 1px red',
					});
					$(this).parent().next().show();
				} else {
					userPassword = true;
					$(this).css({
						'color': '#ccc',
					});
					$(this).parent().css({
						'border': 'solid 1px #ccc',
					});
					$(this).parent().next().hide();
				}
			});

	// 验证重复密码
	$("#userPwd2").focus(function() {
		$(this).addClass("focus");
	}).blur(
			function() {
				if ($("#userPwd").val() != $(this).val()) {
					$(this).css({
						'color': 'red',
					});
					$(this).parent().css({
						'border': 'solid 1px red',
					});
					$(this).parent().next().show();
				} else {
					rptPassword = true;
					$(this).css({
						'color': '#ccc',
					});
					$(this).parent().css({
						'border': 'solid 1px #ccc',
					});
					$(this).parent().next().hide();
				}
			});

	// 验证
	$("#btnReg").click(function() {
		// 验证通过，才能提交表单
			if (userName && userPassword && rptPassword) {
				toReg();// 提交表单
			} else {
				alert("请填写完整信息");
			}

	});
})

// 用户注册
function toReg() {
	var name = $('#userName').val();
	var pwd = $('#userPwd').val();
		$.ajax({
			url : basePath + '/user/add',
			data : {
				userName : name,
				userPassword : pwd,
			},
			type : 'POST',
			dataType : "json",
			success : function(data) {
				if (data.status == 200) {
					alert("注册成功，请登录！");
					window.location.href = basePath + "/login.html";
				} else {
					alert("请重新注册！")
				}
			}
		});
	}

