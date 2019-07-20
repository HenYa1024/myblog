package com.ncwu.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * @ClassName:  Article   
 * @Description:TODO描述:文章实体类
 * @author: wzh
 * @date:   2019年4月23日 下午7:12:09
 */
public class Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer articleId;
	private Integer userId;
	private String articleTitle;
	private String articleContent;
	private String articleTime;
	private String articleType;
	private Integer articleNum;
	private String articleStates;
	public Integer getArticleId() {
		return articleId;
	}
	
	public void setArticleId(Integer articleId) {
		this.articleId = articleId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getArticleTitle() {
		return articleTitle;
	}
	public void setArticleTitle(String articleTitle) {
		this.articleTitle = articleTitle;
	}
	public String getArticleContent() {
		return articleContent;
	}
	public void setArticleContent(String articleContent) {
		this.articleContent = articleContent;
	}
	public String getArticleTime() {
		return articleTime;
	}
	public void setArticleTime(String articleTime) {
		this.articleTime = articleTime;
	}
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
	public String getArticleStates() {
		return articleStates;
	}
	public void setArticleStates(String articleStates) {
		this.articleStates = articleStates;
	}
	@Override
	public String toString() {
		return "Article [articleId=" + articleId + ", userId=" + userId + ", articleTitle=" + articleTitle
				+ ", articleContent=" + articleContent + ", articleTime=" + articleTime + ", articleType=" + articleType
				+ ", articleNum=" + articleNum + ", articleStates=" + articleStates + "]";
	}
}
