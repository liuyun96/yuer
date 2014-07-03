package com.own.yuer.action;

import cn.quickj.extui.action.ExtBaseAction;

public class WebAction extends ExtBaseAction {

	private String pagePath = "yuer/";
	String imgPath = "/images/web/";

	public void load() {
		render(pagePath + "load.html");
	}

	public void index() {
		render(pagePath + "index.html");
	}

	public void login() {
		render(pagePath + "login.html");
	}

	public String getImgPath() {
		return imgPath;
	}

}
