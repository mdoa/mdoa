package com.htsoft.oa.service.admin;
/*
 *  杭州梦德软件有限公司 OA办公管理系统   -- http://www.Mendersoft.com
 *  2017/1/21
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.admin.BookSn;

public interface BookSnService extends BaseService<BookSn>{
	//通过bookId找到图书的boonSn
	public List<BookSn> findByBookId(Long bookId);
	//通过bookId找到还没有借出去的图书的boonSn
	public List<BookSn> findBorrowByBookId(Long bookId);
	//通过bookId找到已借出去还未归还的图书的boonSn
	public List<BookSn> findReturnByBookId(Long bookId);
	
	public void updateBookSn(String newBookIsbn,Long bookId);
	
}


