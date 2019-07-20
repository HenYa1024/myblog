package com.ncwu.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.ncwu.pojo.Artype;
import com.ncwu.service.ArtypeService;

@Controller
@RequestMapping(value="/artype")
public class ArtypeController {

	@Autowired
	private ArtypeService artypeService;

	/**
	 * @Description:TODO描述：根据userId查询所对应的类型   
	 * @author: wzh
	 * @date:   2019年5月27日 下午7:48:00    
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/selByUid",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectTypeByUid(Integer userId){
		JSONObject json = new JSONObject();
		List<Artype> list = artypeService.selectTypeByUid(userId);
		if (list.size()!=0) {
			json.put("res", list);
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toString();
	}
	
	@RequestMapping(value="/delByIds",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String delTypeByIds(String ids){
		JSONObject json = new JSONObject();
		String[] split = ids.split(",");
		List<Object> list = new ArrayList<>();
		for (int i = 0; i < split.length; i++) {
			list.add(split[i]);
		}
		int res = artypeService.delTypeByIds(list);
		if (res == 1) {
			json.put("code", "200");
		}else{
			json.put("code", "500");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述： 根据类型名字和用户id模糊查找
	 * @author: wzh
	 * @date:   2019年5月27日 下午10:28:47    
	 * @param artype
	 * @return
	 */
	@RequestMapping(value="/selBynu",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectByTnAndUserId(Artype artype){
		JSONObject json = new JSONObject();
		List<Artype> list = artypeService.selectByTnAndUserId(artype);
		if (list.size()!=0) {
			json.put("res", list);
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述：添加类型
	 * @author: wzh
	 * @date:   2019年5月27日 下午10:28:19    
	 * @param artype
	 * @return
	 */
	@RequestMapping(value="/addType",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addType(Artype artype){
		JSONObject json = new JSONObject();
		int res = artypeService.addType(artype);
		if (res!=0) {
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toString();
	}
	
	@RequestMapping(value="/updateType",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String updateType(Artype artype){
		JSONObject json = new JSONObject();
		int res = artypeService.updateType(artype);
		if (res!=0) {
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toString();
	}
}
