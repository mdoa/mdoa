package com.htsoft.oa.service.communicate;
/*
 *  杭州梦德软件有限公司 OA办公管理系统   -- http://www.Mendersoft.com
 *  2017/1/21
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.communicate.MailBox;

public interface MailBoxService extends BaseService<MailBox>{

	public Long CountByFolderId(Long folderId);
	
	public List<MailBox> findByFolderId(Long folderId);

}


