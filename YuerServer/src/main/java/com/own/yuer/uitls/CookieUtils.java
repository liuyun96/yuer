package com.own.yuer.uitls;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieUtils {

	/**
	 * 设置cookie
	 * 
	 * @param cooName
	 *            cookie名称
	 * @param time
	 *            Cookie过期时间 单位 分钟
	 * @param request
	 * @param response
	 * @param vName
	 * @param vValue
	 */
	public static void setCookie(String name, String value, int time,
			HttpServletRequest request, HttpServletResponse response) {
		if (name != null && value != null) {
			Cookie cookie = new Cookie(name, value);
			cookie.setPath("/");
			//cookie.setDomain(request.getServerName());
			cookie.setMaxAge(60 * time);
			response.addCookie(cookie);
		}

	}

	/**
	 * 获取cookie
	 * 
	 * @param cooName
	 * @param request
	 * @param response
	 * @param vName
	 * @return
	 */
	public static String getCookie(String name, HttpServletRequest request,
			HttpServletResponse response) {
		if (name != null) {
			Cookie[] cookies = request.getCookies();
			if (cookies != null) {
				for (Cookie cookie : cookies) {
					String cookieName = cookie.getName();
					if (cookieName.equals(name)) {
						String value = cookie.getValue();
						try {
							return value;
						} catch (Exception e) {
							return null;
						}
					}
				}
			}
		}
		return null;
	}

	/**
	 * 销毁cookie
	 * 
	 * @param cooName
	 * @param request
	 * @param response
	 * @param vName
	 * @return
	 */
	public static void deleteCookie(String cooName, HttpServletRequest request,
			HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				String cookieName = cookie.getName();
				if (cookieName.equals(cooName)) {
					cookie.setMaxAge(0);
					cookie.setPath("/");
					response.addCookie(cookie);
				}
			}
		}
	}
}
