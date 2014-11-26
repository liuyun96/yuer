package com.own.yuer.service;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import cn.quickj.dict.model.Dictionary;
import cn.quickj.hibernate.Paginate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.inject.Singleton;
import com.own.yuer.beans.SubjectBean;
import com.own.yuer.model.Article;
import com.own.yuer.model.PageData;
import com.own.yuer.uitls.Constant;

@Singleton
public class AppService extends BaseService {

	public static ObjectMapper objectMapper = new ObjectMapper();

	public String loadAD() {
		@SuppressWarnings("unchecked")
		List<PageData> list = ht
				.query(" select id,title,img,url from PageData where dictId =:dictId ")
				.setString("dictId",
						getDictIdByDictName(Constant.dict_value_ad).toString())
				.list();
		try {
			return objectMapper.writeValueAsString(list);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	private Integer getDictIdByDictName(String dictValue) {
		@SuppressWarnings("unchecked")
		List<Dictionary> list = ht.query(
				" from Dictionary where status = 1 and value='" + dictValue
						+ "'").list();
		if (!list.isEmpty()) {
			return list.get(0).getId();
		}
		return 0;
	}

	/**
	 * 取出好文推荐的文章
	 * 
	 * @param paginate
	 * @return
	 */
	public String loadRecoArticles(Paginate paginate) {

		String hql = " from Article where position = '"
				+ Constant.article_position_reco + "' order by id desc";
		@SuppressWarnings("unchecked")
		List<Article> list = ht
				.query(" select id,title,img,clickTimes,likeTimes " + hql)
				.setFirstResult(paginate.getOffset())
				.setMaxResults(paginate.getCount()).list();
		try {
			if (!list.isEmpty()) {
				Long count = (Long) ht.query(" select count(*)  " + hql)
						.uniqueResult();
				paginate.setTotal(count.intValue());
				String json = objectMapper.writeValueAsString(list);
				Object[] arr = objectMapper.readValue(json, Object[].class);
				ArrayList<Object> obj = (ArrayList<Object>) arr[0];
				System.out.println(obj.get(1));
				json = URLDecoder.decode(json, "UTF-8");
				return json;
			}
			return null;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 通过栏目编号获取专题和文章
	 * 
	 * @param columnId
	 * @return
	 */
	public String loadSubjectAndActicleByColumnId(String columnId) {
		@SuppressWarnings("unchecked")
		List<Object[]> subjects = ht
				.querySql(
						" select subject_id,subject_name from SUBJECTS where status = 1 and column_id = "
								+ columnId + " order by position desc ").list();
		if (!subjects.isEmpty()) {
			List<SubjectBean> beans = new ArrayList<SubjectBean>();
			for (Object[] arr : subjects) {
				Integer subjectId = (Integer) arr[0];
				String subjectName = (String) arr[1];
				String hql = " from Article where subjectName ='" + subjectName
						+ "'  and status = 1 order by id desc";
				@SuppressWarnings("rawtypes")
				List articles = ht.query(" select id,title,img " + hql).list();
				SubjectBean bean = new SubjectBean();
				bean.setSubjectId(subjectId);
				bean.setSubjectName(subjectName);
				bean.setArticles(articles);
				beans.add(bean);
				try {
					return objectMapper.writeValueAsString(bean);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	}

	/**
	 * 根据专题名称获取文章
	 * @param paginate
	 * @param subjectName
	 * @return
	 */
	public String loadArticleBySubjectName(Paginate paginate, String subjectName) {
		String hql = " from Article where subjectName ='" + subjectName
				+ "'  and status = 1 order by id desc";
		@SuppressWarnings("rawtypes")
		List articles = ht.query(" select id,title,img " + hql)
				.setFirstResult(paginate.getOffset())
				.setMaxResults(paginate.getCount()).list();
		try {
			return objectMapper.writeValueAsString(articles);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 加载收藏的文章及商品
	 * @param buyerId
	 * @param type
	 * @return
	 */
	public String loadFavorite(String buyerId, String type) {
		
		return null;
	}
}
