package com.htsoft.oa.service.hrm;
/*
 *  杭州梦德软件有限公司 JOffice协同办公管理系统   -- http://www.Mendersoft.com
 *  Copyright (C) 2008-2011 GuangZhou HongTian Software Limited company.
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.hrm.SalaryItem;

public interface SalaryItemService extends BaseService<SalaryItem>{

	public List<SalaryItem> getAllExcludeId(String excludeIds,PagingBean pb);
	
}

