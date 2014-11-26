package com.own.yuer.service;

// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import java.util.Collection;

import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;

import cn.quickj.hibernate.Paginate;
import cn.quickj.annotation.Transaction;
import cn.quickj.hibernate.HibernateTemplate;

import com.own.yuer.model.PageData;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class PageDataService extends BaseService {
	@Inject
	private HibernateTemplate ht;

	public PageData getPageData(Serializable id) {
		return (PageData) ht.getSession().get(PageData.class, id);
	}

	@SuppressWarnings("unchecked")
	public Collection<PageData> findPageDataByExample(PageData searchForm,
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

	private Criteria createCriteria(PageData searchForm) {
		Criteria criteria = ht.getSession().createCriteria(PageData.class);
		if (searchForm.getDictId() != null) {
			criteria = criteria.add(Restrictions.eq("dictId",
					searchForm.getDictId()));
		}
		return criteria;
	}

	@Transaction
	public void save(PageData pageData) {
		ht.save(pageData);
	}

	@Transaction
	public void delete(String ids) {
		if (ids.endsWith(",")) {
			ids = ids.substring(0, ids.length() - 1);
		}

		ht.getSession()
				.createQuery("delete from PageData where id in (" + ids + ")")
				.executeUpdate();
	}

}
