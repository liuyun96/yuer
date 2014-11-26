package com.own.yuer.action;

import java.io.Serializable;

import javax.servlet.http.HttpServletRequest;

import cn.quickj.Setting;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;
import cn.quickj.manager.CacheManager;
import cn.quickj.security.model.OperateAuditLog;
import cn.quickj.security.model.User;
import cn.quickj.security.service.OperateAuditLogService;

import com.google.inject.Inject;
import com.own.yuer.Config;
import com.own.yuer.service.BaseService;

public class BaseAction extends ExtBaseAction {
	@Inject
	private OperateAuditLogService operateAuditLogService;
	@Inject
	private BaseService baseService;
	@Inject
	HttpServletRequest req;

	// 缓存
	public CacheManager manager = CacheManager.getCacheManager();

	private Paginate paginate;
	public Integer pagesize;
	public Integer page;
	public Integer status;
	public String tName;

	public String uri = "";


	public Config config = (Config) Setting.appconfig;

	/**
	 * 更新表数据状态
	 */
	public String updateStatus(String ids) {
		baseService.updateStatus(ids, status, tName);
		return toJson(null);
	}

	public void saveObj(Serializable classz) {
		baseService.saveObj(classz);
	}

	public void delObj(Class<?> classz, Serializable id) {
		baseService.delObj(classz, id);
	}

	public void saveAuditLog(String mark) {
		User user = (User) getAttribute("USER_IN_SESSION_KEY");
		OperateAuditLog oal = new OperateAuditLog();
		oal.setOperateTime(getDate());
		oal.setUserId(user.getId());
		oal.setUsername(user.getName());
		oal.setRemark(mark);
		operateAuditLogService.save(oal);
	}

	public Paginate getPaginate() {
		if (pagesize == null)
			pagesize = 1;
		if (paginate == null)
			paginate = new Paginate(pagesize);
		if (page == null) {
			page = 0;
		}
		paginate.setPage(page);
		return paginate;
	}

	/**
	 * flash请求url 0：本地；1：现网
	 * 
	 * @return
	 */
	public Integer getDomain() {
		HttpServletRequest request = getRequest();
		String requesUrl = request.getRequestURL().toString();
		if (requesUrl.startsWith("http://localhost")
				|| requesUrl.startsWith("http://127.0.0.1"))
			return 0;
		else
			return 1;
	}

	
}
