package com.ncwu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ncwu.mapper.UserMapper;
import com.ncwu.pojo.User;
import com.ncwu.service.UserService;

@Service("UserService")
public class UserServiceImpl implements UserService{

	@Autowired
	private UserMapper userMapper;
	/**
	 * 用户登录
	 */
	@Override
	public User login(User user) throws RuntimeException {
		return userMapper.selectOne(user);
	}

	/**
	 * 用户注册
	 */
	@Override
	public int add(User user) throws RuntimeException {
		return userMapper.insert(user);
	}

	/**
	 * 用户修改信息
	 */
	@Override
	public int update(User user){
		return userMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public User selectByUserId(Integer id) {
		return userMapper.selectByPrimaryKey(id);
	}

}
