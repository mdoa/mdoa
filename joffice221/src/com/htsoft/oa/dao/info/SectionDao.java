package com.htsoft.oa.dao.info;
/*
 *  杭州梦德软件有限公司 J.Office协同办公管理系统   -- http://www.Mendersoft.com
 *  Copyright (C) 2008-2010 GuangZhou HongTian Software Limited Company.
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.info.Section;

/**
 * 
 * @author 
 *
 */
public interface SectionDao extends BaseDao<Section>{
	public Integer getLastColumn();
}