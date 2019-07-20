package com.ncwu.controller;

import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;

@Controller
@RequestMapping(value = "/upload")
public class UploadImageController {
	@ResponseBody 
	@RequestMapping(value = "/uploadimage", method = RequestMethod.POST) 
	public JSONObject hello(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "editormd-image-file", required = true) MultipartFile attach) { 
		JSONObject jsonObject=new JSONObject(); 
		try { 
			request.setCharacterEncoding("utf-8"); 
			response.setHeader("Content-Type", "text/html"); 
			String rootPath = request.getSession().getServletContext().getRealPath("/static/upload/"); 
			System.err.println("editormd上传图片："+rootPath);
			/**
			 * 文件路径不存在则需要创建文件路径
			 */ 
			File filePath = new File(rootPath); 
			if (!filePath.exists()) { 
				filePath.mkdirs(); 
				} 
			// 最终文件名
			File realFile = new File(rootPath + File.separator + attach.getOriginalFilename()); 
			FileUtils.copyInputStreamToFile(attach.getInputStream(), realFile); 
			// 下面response返回的json格式是editor.md所限制的，规范输出就OK 
			jsonObject.put("success",1); 
			jsonObject.put("message","上传成功"); 
			jsonObject.put("url","/myblog/static/upload/"+attach.getOriginalFilename()); 
			} catch (Exception e) { 
				jsonObject.put("success",0); 
			} 
				return jsonObject; 
			}
}
