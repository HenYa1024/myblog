package com.ncwu.service;

import com.ncwu.pojo.User;

/**
 * @ClassName:  UserService   
 * @Description:TODO描述：   
 * @author: wzh
 * @date:   2019年4月20日 下午2:11:03
 */
public interface UserService {
	/**
	 * @Description:TODO描述：用户登录
	 * @author: wzh
	 * @date:   2019年5月27日 下午1:21:31    
	 * @param user
	 * @return
	 * @throws RuntimeException
	 */
	User login(User user) throws RuntimeException;
	/**
	 * @Description:TODO描述： 用户  注册
	 * @author: wzh
	 * @date:   2019年5月27日 下午1:21:41    
	 * @param user
	 * @return
	 * @throws RuntimeException
	 */
	int add(User user ) throws RuntimeException;
	/**
	 * @Description:TODO描述：修改用户信息   
	 * @author: wzh
	 * @date:   2019年5月27日 下午1:22:55    
	 * @param user
	 * @return
	 */
	int update(User user);
	/**
	 * @Description:TODO描述：根据用户id查询   
	 * @author: wzh
	 * @date:   2019年5月27日 下午1:23:06    
	 * @param id
	 * @return
	 */
	User selectByUserId(Integer id);
}
