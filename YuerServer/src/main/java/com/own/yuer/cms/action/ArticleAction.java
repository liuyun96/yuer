package com.own.yuer.cms.action;

import com.google.inject.Inject;
import com.own.yuer.action.BaseAction;
//import cn.quickj.simpleui.service.MenuService;
import com.own.yuer.model.Article;

public class ArticleAction extends BaseAction {

	@Inject
	Article article;

	public void load() {
		if (article.getId() != null) {
			
		}
		render("article.html");
	}

	public Article getArticle() {
		return article;
	}

}
