package com.own.yuer.action;

import cn.quickj.extui.action.ExtBaseAction;

public class IndexAction extends ExtBaseAction{
	public void load() {
		render("web/load.html");
	}
	
	
	public void index() {
		//redirect(getCtx()+"web/login");
		//render("web/ex1.html");
		redirect(getCtx()+"web/load");
	}
	
	public void login(){
		
	}
	
}
