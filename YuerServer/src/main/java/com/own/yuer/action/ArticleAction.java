package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;
import com.own.yuer.model.Article;
import com.own.yuer.service.ArticleService;

public class ArticleAction extends ExtBaseAction {
	@Inject
	private ArticleService articleService;
	@Inject
	private Article article;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<Article> articles = articleService.findArticleByExample(
				article, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("articles", articles);
		return toJson(data);
	}

	public String load(String id) {
		if (id != null)
			article = articleService.getArticle(Integer.parseInt(id));
		return toJson(article);
	}

	public String save() {
		articleService.save(article);
		return toJson(null);
	}

	public String editContent() {
		if (article.getId() != null){
			Article art = articleService.getArticle(article.getId());
			art.setContent(article.getContent());
			articleService.save(art);
		}
		return toJson(null);
	}

	public String delete(String ids) {
		articleService.delete(ids);
		return toJson(null);
	}

}
