package com.own.yuer.service;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import java.util.Collection;
import org.hibernate.criterion.Order;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import cn.quickj.hibernate.Paginate;
import cn.quickj.annotation.Transaction;
import cn.quickj.hibernate.HibernateTemplate;
import com.own.yuer.model.Columns;

import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class ColumnsService {
	@Inject
	private HibernateTemplate ht;

	public Columns getColumns(Serializable id) {
		return (Columns) ht.getSession().get(Columns.class, id);
	}

	@SuppressWarnings("unchecked")
	public Collection<Columns> findColumnsByExample(Columns searchForm,
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
			if(dir != null && sort != null && !"".equals(sort)){
				if("ASC".equals(dir.toUpperCase())){
					criteria.addOrder(Order.asc(sort));
				}else{
					criteria.addOrder(Order.desc(sort));
				}
			}
		}
		return criteria.list();
	}
	
	private Criteria createCriteria(Columns searchForm) {
		Criteria criteria = ht.getSession().createCriteria(Columns.class);
		return criteria;
	}

	@Transaction
	public void save(Columns columns) {
		ht.save(columns);
	}

	@Transaction
	public void delete(String ids) {
		if(ids.endsWith(",")){
			ids = ids.substring(0,ids.length()-1);
		}
	
		ht.getSession().createQuery(
				"delete from Columns where id in ("+ids+")").executeUpdate();
	}
	
}
