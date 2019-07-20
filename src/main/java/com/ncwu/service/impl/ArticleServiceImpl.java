package com.ncwu.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.abel533.entity.Example;
import com.github.abel533.entity.Example.Criteria;
import com.ncwu.dto.ArticleTandNum;
import com.ncwu.mapper.ArticleMapper;
import com.ncwu.pojo.Article;
import com.ncwu.service.ArticleService;

@Service("ArticleService")
public class ArticleServiceImpl implements ArticleService{

	@Autowired
	private ArticleMapper articleMapper;
	
	@Override
	public int AddArticle(Article article) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");//设置日期格式
		String date = df.format(new Date());
		article.setArticleTime(date);
		article.setArticleStates("checked");
		return articleMapper.insertSelective(article);
	}
	
	@Override
	public List<Article> selectBlog(String name) {
		Example example = new Example(Article.class);
		Criteria criteria = example.createCriteria();
		if (name!=null && !"".equals(name)) {
			criteria.andLike("articleContent", "%"+name+"%");
		}
		return articleMapper.selectByExample(example);
	}
	
	@Override
	public Article selectByAid(Integer id) {
		return articleMapper.selectByPrimaryKey(id);
	}
	
	@Override
	public int updateArticle(Article article) {
		return articleMapper.updateByPrimaryKeySelective(article);
	}
	
	@Override
	public List<Article> selectByids(List<Object> articleIds) {
		List<Article> list = new ArrayList<>();
		Example example = new Example(Article.class);
		Criteria criteria = example.createCriteria();
		criteria.andIn("articleId", articleIds);
		List<Article> listArticle = articleMapper.selectByExample(example);
		// 查询结果，会按照参数，从小到大排列，
		// 双重循环目的是为了将我的足迹按照后访问，先展示的顺序显示
		for (int i = 0; i < articleIds.size(); i++) {
			for (int j = 0; j < listArticle.size(); j++) {
				if(articleIds.get(i).toString().equals(listArticle.get(j).getArticleId().toString())){
					list.add(listArticle.get(j));
					break;
				}
			}
		}
		return list;
	}
	
	@Override
	public int delArticleByIds(List<Object> ids) {
		Example example = new Example(Article.class);
		Criteria criteria = example.createCriteria();
		criteria.andIn("articleId", ids);
		return articleMapper.deleteByExample(example);
	}
	
	@Override
	public List<Article> selectByTitAndUserId(Article article) {
		return articleMapper.selectByTitAndUserId(article);
	}
	
	@Override
	public List<Article> selectByUserId(Integer userId) {
		Example example = new Example(Article.class);
		Criteria criteria = example.createCriteria();
		criteria.andEqualTo("userId", userId);
		return articleMapper.selectByExample(example);
	}
	
	@Override
	public List<ArticleTandNum> selectByAtype(Article article) {
		return articleMapper.selectByAtype(article);
	}
	
}
