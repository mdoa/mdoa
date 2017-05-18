package com.htsoft.oa.service.arch.impl;
/*
 *  杭州梦德软件有限公司 JOffice协同办公管理系统   -- http://www.Mendersoft.com
 *  Copyright (C) 2008-2011 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.arch.RollFileListDao;
import com.htsoft.oa.model.arch.RollFileList;
import com.htsoft.oa.service.arch.RollFileListService;

public class RollFileListServiceImpl extends BaseServiceImpl<RollFileList> implements RollFileListService{
	private RollFileListDao dao;
	
	public RollFileListServiceImpl(RollFileListDao dao) {
		super(dao);
		this.dao=dao;
	}

}