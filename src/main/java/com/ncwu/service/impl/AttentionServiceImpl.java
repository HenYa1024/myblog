package com.ncwu.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.abel533.entity.Example;
import com.github.abel533.entity.Example.Criteria;
import com.ncwu.mapper.AttentionMapper;
import com.ncwu.pojo.Attention;
import com.ncwu.service.AttentionService;

@Service("AttentionService")
public class AttentionServiceImpl implements AttentionService{

	@Autowired
	private AttentionMapper attentionMapper;
	
	@Override
	public int addAttention(Attention attention) {
		return attentionMapper.insert(attention);
	}

	@Override
	public Attention selectByIds(Attention attention) {
		return attentionMapper.selectByIds(attention);
	}

	@Override
	public int delAttention(Attention attention) {
		return attentionMapper.delAttention(attention);
	}

	@Override
	public List<Attention> selAttention(Integer userId) {
		Example example = new Example(Attention.class);
		Criteria criteria = example.createCriteria();
		criteria.andEqualTo("userId", userId);
		return attentionMapper.selectByExample(example);
	}

	@Override
	public int delByKeys(List<Object> ids) {
		Example example = new Example(Attention.class);
		Criteria criteria = example.createCriteria();
		criteria.andIn("attentionId", ids);
		return attentionMapper.deleteByExample(example);
	}

	@Override
	public List<Attention> selectByAnAndUid(Attention attention) {
		return attentionMapper.selectByAnAndUid(attention);
	}

	@Override
	public int selectAt(Integer userId) {
		Example example = new Example(Attention.class);
		Criteria criteria = example.createCriteria();
		criteria.andEqualTo("userId", userId);
		return attentionMapper.selectCountByExample(example);
	}

	@Override
	public int selctFans(Integer attUserId) {
		Example example = new Example(Attention.class);
		Criteria criteria = example.createCriteria();
		criteria.andEqualTo("attentionUserId", attUserId);
		return attentionMapper.selectCountByExample(example);
	}

}
