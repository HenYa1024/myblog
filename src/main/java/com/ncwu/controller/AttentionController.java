package com.ncwu.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.ncwu.pojo.Attention;
import com.ncwu.service.AttentionService;

@Controller
@RequestMapping(value = "/attention")
public class AttentionController {
	@Autowired
	private AttentionService attentionService;
	
	/**
	 * @Description:TODO描述：添加关注   
	 * @author: wzh
	 * @date:   2019年5月27日 下午10:08:47    
	 * @param attention
	 * @return
	 */
	@RequestMapping(value="/addAttention",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addAttention(Attention attention){
		JSONObject json = new JSONObject();
		int res = attentionService.addAttention(attention);
		if (res!=0) {
			json.put("status", "200");
		}else {
			json.put("status", "500");
		}
		return json.toString();
	}

	/**
	 * @Description:TODO描述：根据当前用户id和博主id查询   
	 * @author: wzh
	 * @date:   2019年5月27日 下午10:08:20    
	 * @param attention
	 * @return
	 */
	@RequestMapping(value="/selectByIds",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectByIds(Attention attention){
		JSONObject json = new JSONObject();
		Attention attentions = attentionService.selectByIds(attention);
		if (attentions!=null&&!"".equals(attentions)) {
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述：取消关注   
	 * @author: wzh
	 * @date:   2019年5月27日 下午10:08:32    
	 * @param attention
	 * @return
	 */
	@RequestMapping(value="/delAttention",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String delAttention(Attention attention){
		JSONObject json = new JSONObject();
		int delAttention = attentionService.delAttention(attention);
		if (delAttention != 0) {
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述：根据用户id查询关注    
	 * @author: wzh
	 * @date:   2019年5月27日 下午10:07:55    
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/selectByUid",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectByUid(Integer userId){
		JSONObject json = new JSONObject();
		List<Attention> list = attentionService.selAttention(userId);
		if (list.size()!=0) {
			json.put("res", list);
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述：根据ids取关
	 * @author: wzh
	 * @date:   2019年5月27日 下午10:09:41    
	 * @param ids
	 * @return
	 */
	@RequestMapping(value="/delByIds",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String delByIds(String ids){
		JSONObject json = new JSONObject();
		String[] split = ids.split(",");
		List<Object> list = new ArrayList<>();
		for (int i = 0; i < split.length; i++) {
			list.add(split[i]);
		}
		int res = attentionService.delByKeys(list);
		if (res!=0) {
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述：根据用户id，关注用户名字，模糊查询    
	 * @author: wzh
	 * @date:   2019年5月27日 下午10:07:15    
	 * @param attention
	 * @return
	 */
	@RequestMapping(value="/selByAu",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectByTitAndUserId(Attention attention){
		JSONObject json = new JSONObject();
		List<Attention> list = attentionService.selectByAnAndUid(attention);
		if (list.size()!=0) {
			json.put("res", list);
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述：查询该用户的粉丝数与关注数 
	 * @author: wzh
	 * @date:   2019年5月27日 下午10:09:59    
	 * @param attentionUserId
	 * @return
	 */
	@RequestMapping(value="/selAnum",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectAt(Integer attentionUserId){
		JSONObject json = new JSONObject();
		int atNum = attentionService.selectAt(attentionUserId);//关注用户数
		int fansNum = attentionService.selctFans(attentionUserId);//粉丝数
		json.put("atNum", atNum);
		json.put("fansNum", fansNum);
		json.put("code", "200");
		return json.toString();
	}
}
