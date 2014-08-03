package com.own.yuer.service;

import java.io.Serializable;

import cn.quickj.Setting;
import cn.quickj.annotation.Transaction;
import cn.quickj.hibernate.HibernateTemplate;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.own.yuer.Config;

@Singleton
public class BaseService {
	@Inject
	protected
	HibernateTemplate ht;
	public Config wc = (Config) Setting.appconfig;

	@Transaction
	public void updateStatus(String ids, Integer status, String tName) {
		if (ids.endsWith(",")) {
			ids = ids.substring(0, ids.length() - 1);
		}
		if (status != null) {
			String sql = " update " + tName + " set status = ? where id in ("
					+ ids + ")";
			ht.querySql(sql).setInteger(0, status).executeUpdate();
		}
	}
	
	@Transaction
	public void saveObj(Serializable classz) {
		ht.save(classz);
	}

	public Object load(Class<?> classz, Serializable id) {
		return ht.load(classz, id);
	}

	@Transaction
	public void delObj(Class<?> classz, Serializable id) {
		ht.delete(classz, id);
	}
	
	
}
