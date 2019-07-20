package com.ncwu.mapper;

import java.util.List;

import com.github.abel533.mapper.Mapper;
import com.ncwu.dto.ArticleTandNum;
import com.ncwu.pojo.Article;

/**
 * @ClassName:  ArticleMapper   
 * @Description:TODO描述：Article类继承通用Mapper
 * @author: wzh
 * @date:   2019年4月23日 下午7:19:01
 */
public interface ArticleMapper extends Mapper<Article> {
	List<Article> selectByTitAndUserId(Article article);
	List<ArticleTandNum> selectByAtype(Article article);
}
