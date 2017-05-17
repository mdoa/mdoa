package com.htsoft.oa.dao.archive;
/*
 *  杭州梦德软件有限公司 JOffice协同办公管理系统   -- http://www.Mendersoft.com
 *  Copyright (C) 2008-2011 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.archive.ArchFlowConf;

/**
 * 
 * @author 
 *
 */
public interface ArchFlowConfDao extends BaseDao<ArchFlowConf>{
	/**
	 * 根据类型来查找配置
	 * @param archType
	 * @return
	 */
	public ArchFlowConf getByFlowType(Short archType);
}