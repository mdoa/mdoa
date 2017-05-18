package com.htsoft.oa.model.communicate;

/*
 *  杭州梦德软件有限公司 OA办公管理系统   --  http://www.Mendersoft.com
 *  2017/1/21
 */

import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.google.gson.annotations.Expose;

/**
 * MailFolder Base Java Bean, base class for the.oa.model, mapped directly to
 * database table
 * 
 * Avoid changing this file if not necessary, will be overwritten.
 * 
 * TODO: add class/table comments 内部邮箱文件夹
 */
public class MailFolder extends com.htsoft.core.model.BaseModel {

	/***/
	private static final long serialVersionUID = 1L;

	/** 收件箱 */
	public static final Short FOLDER_TYPE_RECEIVE = 1;
	/** 发件箱 */
	public static final Short FOLDER_TYPE_SEND = 2;
	/** 草稿箱 */
	public static final Short FOLDER_TYPE_DRAFT = 3;
	/** 垃圾箱 */
	public static final Short FOLDER_TYPE_DELETE = 4;
	/** 其它类型箱（文件夹） */
	public static final Short FOLDER_TYPE_OTHER = 10;

	/** 第一层 */
	public static final Integer FIRST_LEVEL = 1;
	/** 第一层文件夹的parentId */
	public static final Long FIRST_PARENTID = 0L;

	@Expose
	protected Long folderId;
	@Expose
	protected String folderName;
	@Expose
	protected Long parentId;
	@Expose
	protected Integer depLevel;
	@Expose
	protected String path;
	@Expose
	protected Short isPublic;
	@Expose
	protected Short folderType;
	@Expose
	@JsonManagedReference
	protected com.htsoft.oa.model.system.AppUser appUser;

	// 用不到的 一对多关系
	// protected java.util.Set mailBoxs = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class MailFolder
	 */
	public MailFolder() {
		super();
	}

	/**
	 * Default Key Fields Constructor for class MailFolder
	 */
	public MailFolder(Long in_folderId) {
		this.setFolderId(in_folderId);
	}

	public com.htsoft.oa.model.system.AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(com.htsoft.oa.model.system.AppUser in_appUser) {
		this.appUser = in_appUser;
	}

	// public java.util.Set getMailBoxs () {
	// return mailBoxs;
	// }
	//
	// public void setMailBoxs (java.util.Set in_mailBoxs) {
	// this.mailBoxs = in_mailBoxs;
	// }

	/**
	 * 文件夹编号 * @return Long
	 * 
	 * @hibernate.id column="folderId" type="java.lang.Long"
	 *               generator-class="native"
	 */
	public Long getFolderId() {
		return this.folderId;
	}

	/**
	 * Set the folderId
	 */
	public void setFolderId(Long aValue) {
		this.folderId = aValue;
	}

	/**
	 * 主键 * @return Long
	 */
	public Long getUserId() {
		return this.getAppUser() == null ? null : this.getAppUser().getUserId();
	}

	/**
	 * Set the userId
	 */
	public void setUserId(Long aValue) {
		if (aValue == null) {
			appUser = null;
		} else if (appUser == null) {
			appUser = new com.htsoft.oa.model.system.AppUser(aValue);
			appUser.setVersion(new Integer(0));// set a version to cheat
												// hibernate only
		} else {
			appUser.setUserId(aValue);
		}
	}

	/**
	 * 文件夹名称 * @return String
	 * 
	 * @hibernate.property column="folderName" type="java.lang.String"
	 *                     length="128" not-null="true" unique="false"
	 */
	public String getFolderName() {
		return this.folderName;
	}

	/**
	 * Set the folderName
	 * 
	 * @spring.validator type="required"
	 */
	public void setFolderName(String aValue) {
		this.folderName = aValue;
	}

	/**
	 * 父目录 * @return Long
	 * 
	 * @hibernate.property column="parentId" type="java.lang.Long" length="19"
	 *                     not-null="false" unique="false"
	 */
	public Long getParentId() {
		return this.parentId;
	}

	/**
	 * Set the parentId
	 */
	public void setParentId(Long aValue) {
		this.parentId = aValue;
	}

	/**
	 * 目录层 * @return Integer
	 * 
	 * @hibernate.property column="depLevel" type="java.lang.Integer"
	 *                     length="10" not-null="true" unique="false"
	 */
	public Integer getDepLevel() {
		return this.depLevel;
	}

	/**
	 * Set the depLevel
	 * 
	 * @spring.validator type="required"
	 */
	public void setDepLevel(Integer aValue) {
		this.depLevel = aValue;
	}

	/**
	 * 1=表示共享，则所有的员工均可以使用该文件夹 0=私人文件夹 * @return Short
	 * 
	 * @hibernate.property column="isPublic" type="java.lang.Short" length="5"
	 *                     not-null="true" unique="false"
	 */
	public Short getIsPublic() {
		return this.isPublic;
	}

	/**
	 * Set the isPublic
	 * 
	 * @spring.validator type="required"
	 */
	public void setIsPublic(Short aValue) {
		this.isPublic = aValue;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	/**
	 * 文件夹类型 1=收信箱 2=发信箱 3=草稿箱 4=删除箱 10=其他 * @return Short
	 * 
	 * @hibernate.property column="folderType" type="java.lang.Short" length="5"
	 *                     not-null="true" unique="false"
	 */
	public Short getFolderType() {
		return this.folderType;
	}

	/**
	 * Set the folderType
	 * 
	 * @spring.validator type="required"
	 */
	public void setFolderType(Short aValue) {
		this.folderType = aValue;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof MailFolder)) {
			return false;
		}
		MailFolder rhs = (MailFolder) object;
		return new EqualsBuilder().append(this.folderId, rhs.folderId)
				.append(this.folderName, rhs.folderName)
				.append(this.parentId, rhs.parentId)
				.append(this.depLevel, rhs.depLevel)
				.append(this.isPublic, rhs.isPublic)
				.append(this.folderType, rhs.folderType).isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973).append(this.folderId)
				.append(this.folderName).append(this.parentId)
				.append(this.depLevel).append(this.isPublic)
				.append(this.folderType).toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("folderId", this.folderId)
				.append("folderName", this.folderName)
				.append("parentId", this.parentId)
				.append("depLevel", this.depLevel)
				.append("isPublic", this.isPublic)
				.append("folderType", this.folderType).toString();
	}

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "folderId";
	}

	/**
	 * Return the Id (pk) of the entity, must be Integer
	 */
	public Long getId() {
		return folderId;
	}

}