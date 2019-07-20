package com.ncwu.service;

import java.util.List;

import com.ncwu.pojo.Attention;

public interface AttentionService {
	/**
	 * @Description:TODO描述：   添加关注
	 * @author: wzh
	 * @date:   2019年5月4日 下午4:55:04    
	 * @param attention
	 * @return
	 */
	int addAttention(Attention attention);
	/**
	 * @Description:TODO描述：   根据当前用户id和博主id查询
	 * @author: wzh
	 * @date:   2019年5月4日 下午5:08:15    
	 * @param attention
	 * @return 空 未关注 否则已关注
	 */
	Attention selectByIds(Attention attention);
	
	/**
	 * @Description:TODO描述： 取消关注 
	 * @author: wzh
	 * @date:   2019年5月4日 下午7:49:06    
	 * @param attention
	 * @return 1成功 0失败
	 */
	int delAttention(Attention attention);
	
	/**
	 * @Description:TODO描述：根据用户id查询关注   
	 * @author: wzh
	 * @date:   2019年5月13日 下午6:39:51    
	 * @param userId
	 * @return
	 */
	List<Attention> selAttention(Integer userId);
	/**
	 * @Description:TODO描述：  根据ids取关
	 * @author: wzh
	 * @date:   2019年5月13日 下午7:02:54    
	 * @param attentionId
	 * @return
	 */
	int delByKeys(List<Object> ids);
	
	/**
	 * @Description:TODO描述： 根据用户id，关注用户名字，模糊查询  
	 * @author: wzh
	 * @date:   2019年5月13日 下午7:44:05    
	 * @param attention
	 * @return
	 */
	List<Attention> selectByAnAndUid(Attention attention);
	
	/**
	 * @Description:TODO描述：根据用户id查询用户关注数(即用户关注数量)   
	 * @author: wzh
	 * @date:   2019年5月14日 上午11:55:03    
	 * @param userId
	 * @return
	 */
	int selectAt(Integer userId);
	
	/**
	 * @Description:TODO描述： 查询该用户的粉丝数
	 * @author: wzh
	 * @date:   2019年5月14日 下午12:09:06    
	 * @param attUserId
	 * @return
	 */
	int selctFans(Integer attUserId);
}
