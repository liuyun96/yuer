package com.own.yuer.cms.action;

import java.util.HashMap;
import java.util.Map;

import cn.quickj.security.model.User;
import cn.quickj.security.service.UserService;

import com.google.inject.Inject;
import com.own.yuer.action.BaseAction;
import com.own.yuer.uitls.Constant;
//import cn.quickj.simpleui.service.MenuService;
import com.own.yuer.uitls.CookieUtils;

public class IndexAction extends BaseAction {

	// @Inject
	// private MenuService menuService;
	@Inject
	private UserService userService;
	@Inject
	private User user;

	private String username;
	private String password;
	//private Integer pwdUselessNum;// 密码失效天数

	public void logout() {
		getSession().remove("USER_IN_SESSION_KEY");
		getRequest().getSession().invalidate();
		getSession().remove(Constant.session_shop);
		getSession().remove("itvIp");
		CookieUtils.deleteCookie("USER_ID", getRequest(), getResponse());
		render("index.html");
	}

	/**
	 * 登录界面 index.html
	 */
	public void index() {
		render("index.html");
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String login() {
		user = userService.login(username, password);
		Map data = new HashMap();
		if (user != null) {
			if (!"admin".equals(username) && user.getDeadLogin() != null
					&& user.getDeadLogin().getTime() < getDate().getTime()) {
				data.put("targetUrl", "");
				data.put("msgs", "密码已失效");
			} else {
				if ("admin".equals(username)){
					// 可以保留一个月
					CookieUtils.setCookie(Constant.cookie_USER_ID, user.getId().toString(),
							60 * 24 * 30, getRequest(), getResponse());
				}else{
					CookieUtils.deleteCookie(Constant.cookie_USER_ID,getRequest(), getResponse());
				}
				// 修改登入时间
				user.setLastLogin(getDate());
				getSession().set(Constant.session_user, userService.getSessionUser(user));
				userService.update(user);
				data.put("msgs", "true");
				data.put("targetUrl", "extui/main/index");
			}
		} else {
			data.put("targetUrl", "");
			data.put("msgs", "密码错误");
		}
		return toJson(data);
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

}
