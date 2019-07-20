package com.ncwu.mapper;

import java.util.List;

import com.github.abel533.mapper.Mapper;
import com.ncwu.pojo.Artype;

public interface ArtypeMapper extends Mapper<Artype> {
	List<Artype> selectByTnAndUserId(Artype artype);
}
