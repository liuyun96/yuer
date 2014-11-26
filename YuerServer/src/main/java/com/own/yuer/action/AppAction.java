package com.own.yuer.action;

import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;
import com.own.yuer.model.Article;
import com.own.yuer.service.AppService;

public class AppAction extends ExtBaseAction {

	/**
	 * app 数据访问
	 */

	@Inject
	AppService appService;
	@Inject
	Article article;
	private String pagePath = "yuer/";
	String imgPath = "/images/web/";
	private int page = 0;
	/**
	 * 栏目编号
	 */
	private String columnId;
	private String subjectName;
	
	private String buyerId;

	public void load() {
		render("web/load.html");
	}

	public void article(String articleId) {
		article = (Article) appService.load(Article.class,
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

	/**
	 * 保存用户信息
	 * 
	 * @param json
	 */
	public void saveBuyer(String json) {

	}

	// 加载头部广告数据
	public String loadAD() {
		return appService.loadAD();
	}

	// 加载推荐文章
	public String loadRecoArticles() {
		Paginate paginate = new Paginate(10 * page, 10);
		paginate.setPage(page);
		return appService.loadRecoArticles(paginate);
	}

	/**
	 * 获取团购信息
	 */
	public String loadTuan() {
		return null;
	}

	/**
	 * 根据栏目编号获取文章
	 * 
	 * @param columnId
	 * @return
	 */
	public String loadArticlesByColumnId(String columnId) {
		return null;
	}

	/**
	 * 根据栏目的编号获取专题及相关的文章
	 * 
	 * @param columnId
	 * @return
	 */
	public String loadSubjectAndActicleByColumnId() {
		return appService.loadSubjectAndActicleByColumnId(columnId);
	}

	/**
	 * 根据关键字搜索文章
	 * 
	 * @param key
	 * @return
	 */
	public String searchActicle(String key) {
		return null;
	}

	/**
	 * 根据专题的编号获取文章
	 * 
	 * @param subjectId
	 * @return
	 */
	public String loadArticleBySubjectName(String subjectName) {
		Paginate paginate = new Paginate(10 * page, 10);
		paginate.setPage(page);
		return appService.loadArticleBySubjectName(paginate, subjectName);
	}

	/**
	 * 加载买家收藏信息
	 * 
	 * @param buyreId
	 * @param type
	 * @return
	 */
	public String loadFavorite(String type) {
		return appService.loadFavorite(buyerId,type);
	}

	public String getPagePath() {
		return pagePath;
	}

	public Article getArticle() {
		return article;
	}

	public int getPage() {
		return page;
	}

	public String getColumnId() {
		return columnId;
	}

	public String getSubjectName() {
		return subjectName;
	}
	
	public String getBuyerId() {
		return buyerId;
	}

}
