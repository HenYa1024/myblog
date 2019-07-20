package com.ncwu.service;

import java.util.List;

import com.ncwu.dto.ArticleTandNum;
import com.ncwu.pojo.Article;

public interface ArticleService {
	/**
	 * @Description:TODO描述：发布文章 
	 * @author: wzh
	 * @date:   2019年4月23日 下午7:22:52    
	 * @param article
	 * @return
	 */
	int AddArticle(Article article);
	/**
	 * @Description:TODO描述： 根据搜索条件模糊查询
	 * @author: wzh
	 * @date:   2019年5月4日 下午8:19:50    
	 * @param name
	 * @return
	 */
	List<Article> selectBlog(String name);
	
	/**
	 * @Description:TODO描述：根据文章id查询
	 * @author: wzh
	 * @date:   2019年5月4日 下午8:20:16    
	 * @param id
	 * @return
	 */
	Article selectByAid(Integer id);
	
	/**
	 * @Description:TODO描述： 根据文章id，更新文章阅读量
	 * @author: wzh
	 * @date:   2019年5月4日 下午8:21:18    
	 * @param id
	 * @return
	 */
	int updateArticle(Article article);
	
	/**
	 * @Description:TODO描述： 根据id(id集合)，查询文章列表
	 * @author: wzh
	 * @date:   2019年5月6日 下午7:02:04    
	 * @param articleIds 
	 * @return
	 */
	List<Article> selectByids(List<Object> articleIds);
	/**
	 * @Description:TODO描述：   根据文章id(一个集合)删除文章
	 * @author: wzh
	 * @date:   2019年5月8日 下午7:40:57    
	 * @param ids
	 * @return
	 */
	int delArticleByIds(List<Object> ids);
	
	/**
	 * @Description:TODO描述：根据用户id，文章标题 模糊查询   
	 * @author: wzh
	 * @date:   2019年5月8日 下午9:42:09    
	 * @param article
	 * @return
	 */
	List<Article> selectByTitAndUserId(Article article);
	
	/**
	 * @Description:TODO描述：   根据用户id查询博客
	 * @author: wzh
	 * @date:   2019年5月10日 下午4:18:52    
	 * @param userId
	 * @return
	 */
	List<Article> selectByUserId(Integer userId);
	
	/**
	 * @Description:TODO描述：查询该用户所有类型的博客以及数量  
	 * @author: wzh
	 * @date:   2019年5月17日 上午9:54:51    
	 * @return
	 */
	List<ArticleTandNum> selectByAtype(Article article);
}
