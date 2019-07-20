package com.ncwu.pojo;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * @ClassName:  Attention 关注用户实体类 
 * @Description:TODO描述：   
 * @author: wzh
 * @date:   2019年5月3日 下午11:24:49
 */
public class Attention {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer attentionId;
	
	private Integer userId;
	
	private Integer attentionUserId;
	
	private String attentionUserName;

	public Integer getAttentionId() {
		return attentionId;
	}

	public void setAttentionId(Integer attentionId) {
		this.attentionId = attentionId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getAttentionUserId() {
		return attentionUserId;
	}

	public void setAttentionUserId(Integer attentionUserId) {
		this.attentionUserId = attentionUserId;
	}

	public String getAttentionUserName() {
		return attentionUserName;
	}

	public void setAttentionUserName(String attentionUserName) {
		this.attentionUserName = attentionUserName;
	}

	@Override
	public String toString() {
		return "Attention [attentionId=" + attentionId + ", userId=" + userId + ", attentionUserId=" + attentionUserId
				+ ", attentionUserName=" + attentionUserName + "]";
	}
}
