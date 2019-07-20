package com.ncwu.controller.login;

import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.ncwu.pojo.User;
import com.ncwu.service.UserService;

/**
 * @ClassName:  UserController   
 * @Description:TODO描述：   
 * @author: wzh
 * @date:   2019年4月20日 下午2:19:45
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {
	
	private static final Logger LOGGER = Logger.getLogger(UserController.class);
	@Autowired
	private UserService userService;
	/**
	 * @Description:TODO描述：  用户登录 
	 * @author: wzh
	 * @date:   2019年4月20日 下午2:23:53    
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/login",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String login(User user){
		JSONObject json = new JSONObject();
		try {
			User users = userService.login(user);
			if(users!=null ){
				json.put("status", "200");
				json.put("member", users);
			}else{
				json.put("status", "201");
			}
		} catch (Exception e) {
			LOGGER.error(e.getLocalizedMessage());
			json.put("status", "500");
		}
		return json.toJSONString();
	}
	/**
	 * @Description:TODO描述：   用户注册
	 * @author: wzh
	 * @date:   2019年4月20日 下午2:24:48    
	 * @param user
	 * @return
	 */
	@RequestMapping(value="/add",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String add(User user){
		JSONObject json = new JSONObject();
		try {
			int rslt = userService.add(user);
			if(rslt==1){
				json.put("status", "200");
			}else{
				json.put("status", "201");
			}
		} catch (Exception e) {
			LOGGER.error(e.getLocalizedMessage());
			json.put("status", "500");
		}
		return json.toJSONString();
	}
	
	@RequestMapping(value="/selectById",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectById(Integer userId){
		JSONObject json = new JSONObject();
		ArrayList<User> list = new ArrayList<User>();
		User user = userService.selectByUserId(userId);
		list.add(user);
		if (user!=null && !"".equals(user)) {
			json.put("res", list);
			json.put("code", "200");
		}else{
			json.put("code", "500");
		}
		return json.toJSONString();
	}
	
	@RequestMapping(value="/updateUser",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String updateUser(User user){
		JSONObject json = new JSONObject();
		int res = userService.update(user);
		if (res!=0) {
			json.put("code", "200");
		}else{
			json.put("code", "500");
		}
		return json.toJSONString();
	}
}
