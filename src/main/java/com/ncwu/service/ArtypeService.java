package com.ncwu.service;

import java.util.List;

import com.ncwu.pojo.Artype;

public interface ArtypeService {
	/**
	 * @Description:TODO描述：   根据用户ID查询博客类型
	 * @author: wzh
	 * @date:   2019年5月11日 下午6:25:32    
	 * @param userId
	 * @return
	 */
	List<Artype> selectTypeByUid(Integer userId);
	
	/**
	 * @Description:TODO描述：根据类型id删除类型   
	 * @author: wzh
	 * @date:   2019年5月13日 下午12:07:04    
	 * @param ids
	 * @return
	 */
	int delTypeByIds(List<Object> ids);
	
	/**
	 * @Description:TODO描述： 根据类型名字和用户id模糊查找
	 * @author: wzh
	 * @date:   2019年5月13日 下午5:14:28    
	 * @param artype
	 * @return
	 */
	List<Artype> selectByTnAndUserId(Artype artype);
	
	/**
	 * @Description:TODO描述：添加类型   
	 * @author: wzh
	 * @date:   2019年5月13日 下午6:11:10    
	 * @param artype
	 * @return
	 */
	int addType(Artype artype);
	
	/**
	 * @Description:TODO描述：修改类型   
	 * @author: wzh
	 * @date:   2019年5月27日 下午1:06:34    
	 * @param artype
	 * @return
	 */
	int updateType(Artype artype);
}
