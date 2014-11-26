package com.own.yuer.filter;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import cn.quickj.AbstractApplication;
import cn.quickj.Setting;
import cn.quickj.action.Action;
import cn.quickj.extui.action.bean.SessionUser;
import cn.quickj.filter.ActionFilter;
import cn.quickj.security.model.User;
import cn.quickj.security.service.UserService;

import com.own.yuer.Config;
import com.own.yuer.uitls.Constant;
import com.own.yuer.uitls.CookieUtils;

public class LoginCheckFilter implements ActionFilter {
	/**
	 * 如果不指定页面，则使用缺省的登录页面.
	 */
	private String page = "cms/index";
	/**
	 * 需要跳过的uri
	 */
	private String[] ignores = {};
	/**
	 * 买家直接访问
	 */
	private String[] buyerArr = { "/login", "/test", "/mobile", "/itv", "/pic",
			"/v1" };
	/**
	 * /** 存储user信息的session key的名称
	 */
	private String userKey = Constant.session_user;

	public int after(Action action) {
		return 0;
	}

	public int before(Action action) {
		HttpServletRequest request = action.getRequest();
		String uri = (String) action.getRequest().getAttribute("uri");
		String ip = request.getHeader("X-Real-IP");
		if (ip == null) {
			ip = request.getRemoteAddr();
		}
		// 用户领券
		if (uri.startsWith("/index/") || uri.startsWith("/web/")) {
			return ActionFilter.NEED_PROCESS;
		}
		// 判断是否买家操作
		if (uri.startsWith("/index") || uri.startsWith("/vitv")
				|| uri.startsWith("/game")) {
			for (String ignore : buyerArr) {
				if (uri.endsWith(ignore)) {
					return ActionFilter.NEED_PROCESS;
				}
			}
			return ActionFilter.NEED_PROCESS;
		}
		for (String ignore : ignores) {
			if (uri.startsWith(ignore)) {
				return ActionFilter.NEED_PROCESS;
			}
		}
		// 后台登入，如果没有登入跳转到登入页面
		if (action.getAttribute(Constant.session_user) != null) {
			return ActionFilter.NEED_PROCESS;
		} else {
			UserService userService = AbstractApplication.injector
					.getInstance(UserService.class);
			String userId = CookieUtils.getCookie("USER_ID",
					action.getRequest(), action.getResponse());
			// cookie里面存在就直接到取出
			if (userId != null) {
				Config config = (Config) Setting.appconfig;
				User user = userService.getUser(Integer.valueOf(userId));
				SessionUser sessionUser = userService.getSessionUser(user);
				action.setAttribute(Constant.session_user, sessionUser);
				action.setAttribute(Constant.session_ipNomal, config.ipNomal);
				return ActionFilter.NEED_PROCESS;
			} else {
				// 卖家过期了
				action.redirect(action.getCtx() + "/cms/index");
				return ActionFilter.NO_PROCESS;
			}
		}
	}

	public void init(HashMap<String, String> params) {
		page = params.get("page");
		String ignore = params.get("ignore");
		userKey = params.get("userKey");
		if (page == null)
			page = "index";
		if (ignore != null) {
			ignores = ignore.split("\\u007C");
		}
		if (userKey == null)
			userKey = Constant.session_user;
	}

}
