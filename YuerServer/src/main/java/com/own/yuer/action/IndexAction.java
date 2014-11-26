package com.own.yuer.action;

import com.google.inject.Inject;
import com.own.yuer.model.Article;
import com.own.yuer.service.WebService;

import cn.quickj.extui.action.ExtBaseAction;

public class IndexAction extends ExtBaseAction {
	
	/**
	 * app 数据访问
	 */

	@Inject
	WebService webService;
	@Inject
	Article article;
	private String pagePath = "yuer/";
	String imgPath = "/images/web/";

	public void load() {
		render("web/load.html");
	}

	public void article(String articleId) {
		article = (Article) webService.load(Article.class,
				Integer.valueOf(articleId));
		render(pagePath + "article.html");
	}

	public void index() {
		// redirect(getCtx()+"web/login");
		// render("web/ex1.html");
		redirect(getCtx() + "web/load");
	}

	public void login() {

	}
	
	

	public String getPagePath() {
		return pagePath;
	}

	public Article getArticle() {
		return article;
	}

}
