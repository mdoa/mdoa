package com.htsoft.oa.action.admin;

/*
 *  杭州梦德软件有限公司 OA办公管理系统   --  http://www.Mendersoft.com
 *  2017/1/21
 */
import javax.annotation.Resource;

import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.admin.Conference;
import com.htsoft.oa.service.admin.ConferenceService;

/**
 * @description 会议内容详细信息展示
 * @author YHZ
 * @datetime : 2010-10-29AM
 */
public class ConferenceDetailAction extends BaseAction {

	@Resource
	private ConferenceService conferenceService;

	private Long confId;
	private Conference conference;

	public Conference getConference() {
		return conference;
	}

	public void setConference(Conference conference) {
		this.conference = conference;
	}

	public Long getConfId() {
		return confId;
	}

	public void setConfId(Long confId) {
		this.confId = confId;
	}

	@Override
	public String execute() throws Exception {
			conference = conferenceService.get(confId);
		return SUCCESS;
	}

}
