package com.ncwu.mapper;

import java.util.List;

import com.github.abel533.mapper.Mapper;
import com.ncwu.pojo.Attention;

public interface AttentionMapper extends Mapper<Attention> {
	Attention selectByIds(Attention attention);
	int delAttention(Attention attention);
	List<Attention> selectByAnAndUid(Attention attention);
}
