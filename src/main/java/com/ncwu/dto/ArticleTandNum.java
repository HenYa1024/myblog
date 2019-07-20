package com.ncwu.dto;

/**
 * @ClassName:  ArticleTandNum   
 * @Description:TODO描述：   自定义实体类
 * @author: wzh
 * @date:   2019年5月16日 下午9:06:32
 */
public class ArticleTandNum {
	private String articleType;//文章类型
	private Integer articleNum;//文章篇数
	public String getArticleType() {
		return articleType;
	}
	public void setArticleType(String articleType) {
		this.articleType = articleType;
	}
	public Integer getArticleNum() {
		return articleNum;
	}
	public void setArticleNum(Integer articleNum) {
		this.articleNum = articleNum;
	}
}
