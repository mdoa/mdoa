package com.htsoft.test.flow;
/*
 *  杭州梦德软件有限公司 J.Office协同办公管理系统   -- http://www.Mendersoft.com
 *  Copyright (C) 2008-2010 GuangZhou HongTian Software Limited Company.
*/
import javax.annotation.Resource;

import org.junit.Test;
import org.springframework.test.annotation.Rollback;

import com.htsoft.test.BaseTestCase;
import com.htsoft.oa.dao.flow.FormFieldDao;
import com.htsoft.oa.model.flow.FormField;

public class FormFieldDaoTestCase extends BaseTestCase {
	@Resource
	private FormFieldDao formFieldDao;
	
	@Test
	@Rollback(false)
	public void add(){		
		FormField formField=new FormField();
//		TODO

		formFieldDao.save(formField);
	}
}