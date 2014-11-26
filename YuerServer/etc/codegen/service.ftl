package ${packageName}.service;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import java.util.Collection;
import org.hibernate.criterion.Order;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import cn.quickj.hibernate.Paginate;
import cn.quickj.annotation.Transaction;
import cn.quickj.hibernate.HibernateTemplate;
import ${packageName}.model.${className};

import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class ${className}Service {
	@Inject
	private HibernateTemplate ht;

	public ${className} get${className}(Serializable id) {
		return (${className}) ht.getSession().get(${className}.class, id);
	}

	@SuppressWarnings("unchecked")
	public Collection<${className}> find${className}ByExample(${className} searchForm,
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
	
	private Criteria createCriteria(${className} searchForm) {
		Criteria criteria = ht.getSession().createCriteria(${className}.class);
	<#list columns?values as column>
	<#if column.searchable>
		<#if column.displayType=='日期'>
		if (searchForm.${column.getterName}Start() != null){
			criteria = criteria.add(Restrictions.ge("${column.javaName}",searchForm.${column.getterName}Start()));
		}
		if (searchForm.${column.getterName}End() != null){
			criteria = criteria.add(Restrictions.le("${column.javaName}",searchForm.${column.getterName}End()));
		}
		<#elseif column.javaType=='String'>
		if (searchForm.${column.getterName}() != null && searchForm.${column.getterName}().length()>0){
			criteria = criteria.add(Restrictions.ilike("${column.javaName}","%" + searchForm.${column.getterName}() + "%"));
		}
		<#else>
		if (searchForm.${column.getterName}() != null){
			criteria = criteria.add(Restrictions.eq("${column.javaName}",searchForm.${column.getterName}()));
		}
		</#if>
	</#if>
	</#list>		
		return criteria;
	}

	@Transaction
	public void save(${className} ${javaName}) {
		ht.save(${javaName});
	}

	@Transaction
	public void delete(String ids) {
		if(ids.endsWith(",")){
			ids = ids.substring(0,ids.length()-1);
		}
	
		ht.getSession().createQuery(
				"delete from ${className} where id in ("+ids+")").executeUpdate();
	}
	
}
