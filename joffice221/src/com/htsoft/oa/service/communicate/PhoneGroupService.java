package com.htsoft.oa.service.communicate;
/*
 *  杭州梦德软件有限公司 OA办公管理系统   -- http://www.Mendersoft.com
 *  2017/1/21
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.communicate.PhoneGroup;

public interface PhoneGroupService extends BaseService<PhoneGroup>{
	public Integer findLastSn(Long userId);
	public PhoneGroup findBySn(Integer sn,Long userId,Short isPublic);
	public List<PhoneGroup> findBySnUp(Integer sn,Long userId, short isPublic);
	public List<PhoneGroup> findBySnDown(Integer sn,Long userId,short isPublic);
	public List<PhoneGroup> getAll(Long userId);
	
	public Integer findPublicLastSn();
	public PhoneGroup findPublicBySn(Integer sn);
	public List<PhoneGroup> findPublicBySnUp(Integer sn);
	public List<PhoneGroup> findPublicBySnDown(Integer sn);
	public List<PhoneGroup> getPublicAll();
}


