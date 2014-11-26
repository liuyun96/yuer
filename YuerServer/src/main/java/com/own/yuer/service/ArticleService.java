package com.own.yuer.service;

// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;

import cn.quickj.hibernate.Paginate;
import cn.quickj.annotation.Transaction;
import cn.quickj.hibernate.HibernateTemplate;

import com.own.yuer.model.Article;
import com.own.yuer.uitls.YuerUtils;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class ArticleService {
	@Inject
	private HibernateTemplate ht;

	public Article getArticle(Serializable id) {
		return (Article) ht.getSession().get(Article.class, id);
	}

	@SuppressWarnings("unchecked")
	public Collection<Article> findArticleByExample(Article searchForm,
			Paginate paginate, String sort, String dir) {
		Criteria criteria;
		if (paginate != null) {
			criteria = createCriteria(searchForm);
			criteria.setProjection(Projections.rowCount());
			paginate.setTotal(Integer.parseInt(criteria.list().get(0)
					.toString()));
		}
		criteria = createCriteria(searchForm);
		if (paginate != null) {
			criteria.setFirstResult(paginate.getOffset());
			criteria.setMaxResults(paginate.getCount());
			if (dir != null && sort != null && !"".equals(sort)) {
				if ("ASC".equals(dir.toUpperCase())) {
					criteria.addOrder(Order.asc(sort));
				} else {
					criteria.addOrder(Order.desc(sort));
				}
			}
		}
		return criteria.list();
	}

	private Criteria createCriteria(Article searchForm) {
		Criteria criteria = ht.getSession().createCriteria(Article.class);
		criteria = criteria.add(Restrictions.like("title",
				"%" + searchForm.getTitle() + "%"));
		return criteria;
	}

	@Transaction
	public void save(Article article) {
		if (article.getCreateTime() == null) {
			article.setCreateTime(new Date());
		}
		article.setUpdateTime(new Date());
		article.setContent(YuerUtils.uploadImgs(article.getContent()));
		ht.save(article);
	}

	@Transaction
	public void delete(String ids) {
		if (ids.endsWith(",")) {
			ids = ids.substring(0, ids.length() - 1);
		}

		ht.getSession()
				.createQuery("delete from Article where id in (" + ids + ")")
				.executeUpdate();
	}

}
