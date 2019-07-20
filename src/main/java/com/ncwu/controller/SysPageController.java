package com.ncwu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * @ClassName:  SysPageController   
 * @Description:TODO描述：系统页面视图   
 * @author: wzh
 * @date:   2019年4月27日 上午11:35:16
 */
@Controller
public class SysPageController {
	
	@RequestMapping("{module}/{url}.html")
	public String module(@PathVariable("module") String module, @PathVariable("url") String url){
		return  module + "/" + url + ".html";
	}

	@RequestMapping("{url}.html")
	public String url(@PathVariable("url") String url){
		return url + ".html";
	}

	@RequestMapping("/")
	public String index(){
		return "index.html";
	}
}
