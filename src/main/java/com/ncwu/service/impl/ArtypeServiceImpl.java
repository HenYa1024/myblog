package com.ncwu.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.abel533.entity.Example;
import com.github.abel533.entity.Example.Criteria;
import com.ncwu.mapper.ArtypeMapper;
import com.ncwu.pojo.Artype;
import com.ncwu.service.ArtypeService;

@Service("ArtypeService")
public class ArtypeServiceImpl implements ArtypeService {

	@Autowired
	private ArtypeMapper artypeMapper;
	
	@Override
	public List<Artype> selectTypeByUid(Integer userId) {
		Example example = new Example(Artype.class);
		Criteria criteria = example.createCriteria();
		criteria.andEqualTo("userId", userId);
		return artypeMapper.selectByExample(example);
	}

	@Override
	public int delTypeByIds(List<Object> ids) {
		Example example = new Example(Artype.class);
		Criteria criteria = example.createCriteria();
		criteria.andIn("typeId", ids);
		return artypeMapper.deleteByExample(example);
	}

	@Override
	public List<Artype> selectByTnAndUserId(Artype artype) {
		return artypeMapper.selectByTnAndUserId(artype);
	}

	@Override
	public int addType(Artype artype) {
		return artypeMapper.insertSelective(artype);
	}

	@Override
	public int updateType(Artype artype) {
		return artypeMapper.updateByPrimaryKeySelective(artype);
	}

}
