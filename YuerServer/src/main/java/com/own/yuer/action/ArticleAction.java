package com.own.yuer.action;

import java.io.File;
import java.util.Collection;
import java.util.HashMap;

import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;
import com.own.yuer.model.Article;
import com.own.yuer.service.ArticleService;
import com.own.yuer.uitls.Constant;
import com.own.yuer.uitls.ImgUtil;

public class ArticleAction extends BaseAction {
	@Inject
	private ArticleService articleService;
	@Inject
	private Article article;

	private File imgFile;

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
		if (article.getLikeTimes() == null) {
			article.setLikeTimes(0);
		}
		if (article.getClickTimes() == null) {
			article.setClickTimes(0);
		}
		if (imgFile != null && imgFile.getName() != null) {
			String path = config.webRoot + Constant.path_article;// 优惠券上传路径
			String filename = ImgUtil.uploadimgFile(imgFile, path);
			if (!"false".equals(filename)) {
				article.setImg(Constant.path_article + filename);
			}
		}
		articleService.save(article);
		return toJson(null);
	}

	public String editContent() {
		if (article.getId() != null) {
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

	public File getImgFile() {
		return imgFile;
	}

}
