package com.htsoft.oa.action.info;

/*
 *  杭州梦德软件有限公司 OA办公管理系统   --  http://www.Mendersoft.com
 *  2017/1/21
 */

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.DateFormatUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.info.InMessageService;
import com.htsoft.oa.service.info.ShortMessageService;

/**
 * 内部信息
 * 
 * 
 */
public class InMessageAction extends BaseAction {

	static short HAVE_DELETE = (short) 1;
	private InMessage inMessage;
	private ShortMessage shortMessage;
	private Date from;
	private Date to;

	public InMessage getInMessage() {
		return inMessage;
	}

	public void setInMessage(InMessage inMessage) {
		this.inMessage = inMessage;
	}

	public ShortMessage getShortMessage() {
		return shortMessage;
	}

	public void setShortMessage(ShortMessage shortMessage) {
		this.shortMessage = shortMessage;
	}

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}

	@Resource
	private InMessageService inMessageService;
	@Resource
	private ShortMessageService shortMessageService;

	/**
	 * 收信息列表
	 */
	public String list() {
		AppUser user = ContextUtil.getCurrentUser();
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addSorted("shortMessage.sendTime", "Desc");
		filter.addFilter("Q_userId_L_EQ", user.getId());
		filter.addFilter("Q_delFlag_SN_EQ", "0");
		List<InMessage> list = inMessageService.getAll(filter);
		jsonString = mapper.toPageJson(list, filter.getPagingBean()
				.getTotalItems());
		return SUCCESS;
	}

	/**
	 * 读信息
	 * 
	 * @return
	 */
	public String know() {
		String strReceiveId = getRequest().getParameter("receiveId");
		Long receiveId = null;
		if (StringUtils.isNotEmpty(strReceiveId)) {
			receiveId = Long.parseLong(strReceiveId);
		}
		InMessage in = inMessageService.get(receiveId);
		in.setReadFlag((short) 1); // 1标志为读
		inMessageService.save(in);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 单个或多个删除
	 * 
	 * @return
	 */
	public String multiRemove() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				inMessage = inMessageService.get(Long.parseLong(id));
				inMessage.setDelFlag(HAVE_DELETE);
				inMessageService.save(inMessage);
			}
		}
		jsonString = "{success:true}";
		return SUCCESS;
	}

	/**
	 * 回复
	 * 
	 * @return
	 */
	public String reply() {
		String strReplyId = getRequest().getParameter("receiveId");
		if (StringUtils.isNotEmpty(strReplyId)) {
			Long replyId = Long.parseLong(strReplyId);
			inMessage = inMessageService.get(replyId);
			StringBuffer buff = new StringBuffer("{success:true,data:[");
			buff.append(
					"{'messageId':"
							+ inMessage.getShortMessage().getMessageId()
							+ ",'senderId':'"
							+ inMessage.getShortMessage().getSenderId()
							+ "','sender':'"
							+ inMessage.getShortMessage().getSender() + "'}")
					.append("]}");
			setJsonString(buff.toString());
		} else
			setJsonString("{success:false}");

		return SUCCESS;
	}

	/**
	 * 点击阅读
	 * 
	 * @return
	 */
	public String read() {
		Long userId = ContextUtil.getCurrentUser().getUserId();
		boolean flag = false;
		if (userId != null) {
			inMessage = inMessageService.findByRead(userId);
			if (inMessage == null) {
				flag = true;
				inMessage = inMessageService.findLatest(userId);
			}
			if (inMessage != null) {
				inMessage.setReadFlag(InMessage.FLAG_READ);
				inMessageService.save(inMessage);
				shortMessage = inMessage.getShortMessage();
				String date = DateFormatUtil.formatTime(shortMessage
						.getSendTime());
				StringBuffer buff = new StringBuffer("{success:true,message:");
				buff.append("{'receiveId':" + inMessage.getReceiveId()
						+ ",'messageId':" + shortMessage.getMessageId()
						+ ",'senderId':" + shortMessage.getSenderId()
						+ ",'sender':'" + shortMessage.getSender()
						+ "','content':'"
						+ shortMessage.getContent().replace("\n", " ")
						+ "','sendTime':'" + date + "','msgType':"
						+ shortMessage.getMsgType());
				if (!flag) {
					InMessage in = inMessageService.findByRead(userId);
					if (in != null) {
						buff.append(",haveNext:true");
					} else {
						buff.append(",haveNext:false");
					}
				} else {
					buff.append(",haveNext:false");
				}
				buff.append("}}");
				setJsonString(buff.toString());
			} else {
				setJsonString("{success:false}");
			}
		} else {
			setJsonString("{success:true}");
		}
		return SUCCESS;
	}

	public String count() {
		Integer in = inMessageService.findByReadFlag(ContextUtil
				.getCurrentUser().getUserId());
		setJsonString("{success:true,count:'" + in + "'}");
		return SUCCESS;
	}

	/**
	 * 首页读取详细信息内容
	 * 
	 * 
	 */
	public String detail() {
		String strReceiveId = getRequest().getParameter("receiveId");
		if (StringUtils.isNotEmpty(strReceiveId)) {
			Long receiveId = new Long(strReceiveId);
			inMessage = inMessageService.get(receiveId);
			inMessage.setReadFlag((short) 1); // 标识为已读
			inMessageService.save(inMessage);
		}
		return "detail";
	}

	/**
	 * 首页显示信息列表
	 */
	@SuppressWarnings({ "unused", "unchecked" })
	public String display() {
		List<Object[]> list;
		PagingBean pb = new PagingBean(0, 8);
		AppUser appUser = ContextUtil.getCurrentUser();
		// 获取排序的列表信息
		String sort = getRequest().getParameter("sort");
		String dir = getRequest().getParameter("dir");

		list = shortMessageService.searchShortMessage(appUser.getUserId(),
				null, null, null, pb, InMessage.FLAG_UNREAD, sort, dir);
		List<InMessage> inList = new ArrayList<InMessage>();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':"
				+ pb.getTotalItems() + ",result:");
		for (int i = 0; i < list.size(); i++) {
			InMessage inMessage = (InMessage) list.get(i)[0];
			inList.add(inMessage);
		}

		getRequest().setAttribute("messageList", inList);
		return "display";
	}

	public String multiRead() {
		String[] ids = getRequest().getParameterValues("ids");
		if (ids != null) {
			for (String id : ids) {
				inMessage = inMessageService.get(Long.parseLong(id));
				inMessage.setReadFlag(InMessage.FLAG_READ);
				inMessageService.save(inMessage);
			}
		}
		jsonString = JSON_SUCCESS;
		return SUCCESS;
	}
}
