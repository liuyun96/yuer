package com.own.yuer.action;

import com.google.inject.Inject;
import com.own.yuer.model.Article;
import com.own.yuer.service.WebService;

public class WebAction extends BaseAction {
	@Inject
	WebService webService;
	@Inject
	Article art;
	private String pagePath = "yuer/";
	String imgPath = "/images/web/";

	public void load() {
		render(pagePath + "load.html");
	}

	public void index() {
		render(pagePath + "index.html");
	}

	public void article(String articleId) {
		art = (Article) webService.load(Article.class,
				Integer.valueOf(articleId));
		render(pagePath + "article.html");
	}

	public void login() {
		render(pagePath + "login.html");
	}

	public String getImgPath() {
		return imgPath;
	}

	public Article getArt() {
		return art;
	}

}
