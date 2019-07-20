package com.ncwu.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.ncwu.dto.ArticleTandNum;
import com.ncwu.pojo.Article;
import com.ncwu.pojo.User;
import com.ncwu.service.ArticleService;
import com.ncwu.service.UserService;

import redis.clients.jedis.Jedis;

@Controller
@RequestMapping(value = "/article")
public class ArticleController {

	@Autowired
	private ArticleService articleService;
	@Autowired
	private UserService userService;
	
	private Integer id;
	private Jedis jedis;
	@RequestMapping(value="/addArticle",method = RequestMethod.POST,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String addArticle(Article article) {
		JSONObject json = new JSONObject();
		if (article.getArticleId() != null) {
			int res = articleService.updateArticle(article);
			if (res == 1) {
				id = article.getArticleId();
				json.put("id", id);
				json.put("status", "200");
			} else {
				json.put("status", "201");
			}
			return json.toString();
		}
		int res = articleService.AddArticle(article);
		if (res == 1) {
			id = article.getArticleId();
			json.put("id", id);
			json.put("status", "200");
		} else {
			json.put("status", "201");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述：根据输入的内容，进行模糊查找   
	 * @author: wzh
	 * @date:   2019年5月25日 下午4:52:50    
	 * @param name
	 * @return
	 */
	@RequestMapping(value="/query",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String query(String name){
		JSONObject json = new JSONObject();
		List<Article> list=articleService.selectBlog(name);
		if(list.size()!=0){
			json.put("res", list);
			json.put("status", "200");
		}else{
			json.put("status", "500");
		}
		return json.toString();
	}
	/**
	 * @Description:TODO描述：   根据文章id查询
	 * @author: wzh
	 * @date:   2019年5月15日 下午12:13:24    
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/queryById",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String queryByid(Integer id){
		JSONObject json = new JSONObject();
		Article selectByAid = articleService.selectByAid(id);
		if (selectByAid!=null && !"".equals(selectByAid)) {
			// 为了显示每篇博客对应的博主
			User articleUser = userService.selectByUserId(selectByAid.getUserId());
			Integer articleNum = selectByAid.getArticleNum()+1;
			selectByAid.setArticleNum(articleNum);
			articleService.updateArticle(selectByAid);
			json.put("status", "200");
			json.put("res", selectByAid);
			json.put("articleUser", articleUser);
		}else {
			json.put("status", "500");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述：redis我的足迹   
	 * @author: wzh
	 * @date:   2019年5月16日 上午9:41:21    
	 * @param articleId
	 * @param userName
	 * @return
	 */
	@RequestMapping(value="/queryByIds",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String queryByids(Integer articleId,String userName){
		JSONObject json = new JSONObject();
		try {
			jedis = new Jedis("localhost");
			//返回存储在value键中的前10个元素，即我的足迹存储10条记录
			List<String> lrange = jedis.lrange(userName, 0, 9);
			// 用于存储文章id
			List<Object> articleIds = new ArrayList<>();
			
			if (userName==null || "".equals(userName)) {
				json.put("code", "201");
				return json.toJSONString();
			}

			if (articleId==0) {//说明访问我的足迹页面，获取我的足迹
				if (lrange.size()==0) {
					json.put("code", "201");
					return json.toJSONString();
				}else{
					// 不为空，则将缓存中的文章id添加至articleIds
					for (String lranges : lrange) {
						articleIds.add(lranges);
					}
				}
			}else if (lrange.size()==0) {
				//若为用户第一次浏览博客，即lrange为空，直接将articleId添加至存储列表的头部
				jedis.lpush(userName, articleId.toString());
				json.put("code", "200");
				return json.toJSONString();
			}else {
				// 若lrange不为空，说明用户已有历史足迹
				for (String lranges : lrange) {// 剔除已经访问过的记录，将新纪录添加进去，防止重复
					if (articleId.toString().equals(lranges)) {
						/*从关键字为key的列表中删除value元素的第一次计数。
						 如果count为零，则删除所有元素。
						 如果count是负数元素从尾部到头部移除.
						 如果count是正数元素从头部到尾部移除.
						 返回值为：操作成功时删除的元素数。
						jedis.lrem(key, count, value)*/
						jedis.lrem(userName, 0, lranges);
						break;
					}
				}
				jedis.lpush(userName, articleId.toString());//将非重复的文章id添加至集合中
				json.put("code", "200");
				return json.toJSONString();
			}
			List<Article> articles = articleService.selectByids(articleIds);
			json.put("code", "200");
			//将顺序的结果返回前台
			json.put("articles", articles);
		} catch (Exception e) {
			json.put("code", "500");
		}
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述： 根据文章id批量删除 
	 * @author: wzh
	 * @date:   2019年5月27日 下午7:23:48    
	 * @param ids
	 * @return
	 */
	@RequestMapping(value="/delByIds",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String delArticleByIds(String ids){
		JSONObject json = new JSONObject();
		String[] split = ids.split(",");
		List<Object> list = new ArrayList<>();
		for (int i = 0; i < split.length; i++) {
			list.add(split[i]);
		}
		int res = articleService.delArticleByIds(list);
		if (res == 1) {
			json.put("code", "200");
		}
		return json.toJSONString();
	}
	
	/**
	 * @Description:TODO描述：根据文章标题模糊查询
	 * @author: wzh
	 * @date:   2019年5月27日 下午7:19:00    
	 * @param article
	 * @return
	 */
	@RequestMapping(value="/selBytu",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectByTitAndUserId(Article article){
		JSONObject json = new JSONObject();
		List<Article> list = articleService.selectByTitAndUserId(article);
		json.put("res", list);
		json.put("code", "200");
		return json.toString();
	}
	
	/**
	 * @Description:TODO描述:根据用户id，查看该用户的博客列表
	 * @author: wzh
	 * @date:   2019年5月25日 下午5:12:25    
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/selectByUid",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectByUid(Integer userId){
		JSONObject json = new JSONObject();
		List<Article> list = articleService.selectByUserId(userId);
		User user = userService.selectByUserId(userId);
		String userName = user.getUserName();
		if(list.size()!=0){
			json.put("res", list);
			json.put("userName", userName);
			json.put("code", "200");
		}else {
			json.put("userName", userName);
			json.put("code", "500");
		}
		return json.toJSONString();
	}
	
	/**
	 * @Description:TODO描述：   更改文章评论状态
	 * @author: wzh
	 * @date:   2019年5月10日 下午9:00:35    
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/upstates",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String upArticleStates(Integer articleId,String articleStates){
		JSONObject json = new JSONObject();
		Article article = new Article();
		article.setArticleId(articleId);
		article.setArticleStates(articleStates);
		int res = articleService.updateArticle(article);
		if(res==1){
			json.put("res", res);
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toJSONString();
	}
	
	/**
	 * @Description:TODO描述：  根据博主id查询所有的博客类型以及数量 
	 * @author: wzh
	 * @date:   2019年5月17日 上午10:08:35    
	 * @param userId
	 * @return
	 */
	@RequestMapping(value="/selectTAN",method = RequestMethod.GET,produces = "application/json;charset=utf-8")
	@ResponseBody
	public String selectByAtype(Article article){
		JSONObject json = new JSONObject();
		List<ArticleTandNum> ArticleTandNum = articleService.selectByAtype(article);
		if(ArticleTandNum.size()!=0){
			json.put("res", ArticleTandNum);
			json.put("code", "200");
		}else {
			json.put("code", "500");
		}
		return json.toJSONString();
	}
}
