package com.mdoa.work.controller;

import java.util.ArrayList;
import java.util.List;

import javax.management.RuntimeErrorException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.constant.Constant;
import com.mdoa.constant.DocumentModelConstant;
import com.mdoa.user.model.UserInfo;
import com.mdoa.work.bo.WorkOfficeDocForm;
import com.mdoa.work.model.DTreeModel;
import com.mdoa.work.service.DocumentService;

@RestController
@RequestMapping("/document")
public class DocumentController extends BaseController{

	@Autowired
	private DocumentService documentService;
	//根目录
	private static final String ROOT = "0";
	
	/**
	 * 实现文件树结构
	 * @return
	 */
	@RequestMapping("/deptTree.do")
	public String deptTree(){
		
		if (DocumentModelConstant.treeList == null) {
			List<DTreeModel> list = new ArrayList<>();
			DTreeModel dTreeModel = new DTreeModel();
			dTreeModel.setThisId(ROOT);
			dTreeModel.setId(ROOT);
			dTreeModel.setIconCls("icon-directory");
			dTreeModel.setAttributes("0");
			dTreeModel.setText("总目录");
			list.add(dTreeModel);
			list.get(0).setChildren(documentService.deptTree(ROOT));
			DocumentModelConstant.treeList = list;
		}
		Gson gson = new Gson();
		String jsonString = gson.toJson(DocumentModelConstant.treeList);
		return jsonString;
		
	}
	/**
	 * 添加目录或者文件
	 */
	@RequestMapping("/addDocument.do")
	public String addDocument(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setCreateUserId(userInfo.getUserId());
			workOfficeDocForm.setCreateUserName(userInfo.getUserName());
			documentService.addDocument(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 删除文件或目录
	 */
	@RequestMapping("/removeDocument.do")
	public String removeDocument(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setUpdateUserId(userInfo.getUserId());
			workOfficeDocForm.setUpdateUserName(userInfo.getUserName());
			documentService.removeDocument(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改文件名或者目录名
	 */
	@RequestMapping("/updateDocument.do")
	public String updateDocument(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setUpdateUserId(userInfo.getUserId());
			workOfficeDocForm.setUpdateUserName(userInfo.getUserName());
			documentService.updateDocument(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 拖动
	 */
	@RequestMapping("/dragDocument.do")
	public String dragDocument(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setUpdateUserId(userInfo.getUserId());
			workOfficeDocForm.setUpdateUserName(userInfo.getUserName());
			documentService.dragDocument(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 伸展和合拢
	 */
	@RequestMapping("/updateTreeState.do")
	public String updateTreeState(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			documentService.updateTreeState(workOfficeDocForm,DocumentModelConstant.treeList);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 保存编辑的内容
	 */
	@RequestMapping("/updateText.do")
	public String updateText(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setUpdateUserId(userInfo.getUserId());
			workOfficeDocForm.setUpdateUserName(userInfo.getUserName());
			documentService.updateText(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询信息
	 */
	@RequestMapping("/selectDocumentText.do")
	public String selectDocumentText(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			List<WorkOfficeDocForm> list = documentService.selectDocumentText(workOfficeDocForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(list);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 发布公文
	 */
	@RequestMapping("/publishOffice.do")
	public String publishOffice(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setCreateUserId(userInfo.getUserId());
			workOfficeDocForm.setCreateUserName(userInfo.getUserName());
			documentService.publishOffice(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
