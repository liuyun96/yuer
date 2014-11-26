package com.own.yuer.util;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.client.ClientProtocolException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.own.yuer.api.JSONProvider;
import com.own.yuer.bean.ADBean;
import com.own.yuer.bean.Article;
import com.own.yuer.bean.SubjectBean;

public class ConnectServer {
	public static String ip = "http://127.0.0.1";
	//public static String ip = "http://121.40.150.11:9003/";
	public static String ip_app = ip + "app/";
	public static ObjectMapper jsonObjectMapper = new ObjectMapper();

	public List<ADBean> loadAD(Integer curPage) {
		// jObjectMapper
		// ObjectMapper
		try {
			String json = JSONProvider.getJSONData(ip_app + "loadAD?curPage="
					+ curPage);
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static List<Article> loadRecoArticles(int page) {
		try {
			String json = HttpUtils.HttpGetApache(ip_app + "loadRecoArticles",
					"page", page + "");
			if (json != null) {
				List<Article> list = new ArrayList<Article>();
				Object[] arr = jsonObjectMapper.readValue(json, Object[].class);
				for (Object obj : arr) {
					@SuppressWarnings("unchecked")
					ArrayList<Object> art = (ArrayList<Object>) obj;
					Integer id = (Integer) art.get(0);
					String title = (String) art.get(1);
					Article article = new Article();
					article.setId(id);
					article.setTitle(title);
					article.setImg(ip + (String) art.get(2));
					article.setReadCount((Integer) art.get(3));
					article.setLikeCount((Integer) art.get(4));
					list.add(article);
				}
				return list;
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static SubjectBean loadSubjectAndActicleByColumnId(String columnId) {
		try {
			String json = HttpUtils.HttpGetApache(ip_app
					+ "loadSubjectAndActicleByColumnId", "columnId", columnId);
			if (json != null) {
				SubjectBean bean= jsonObjectMapper.readValue(json, SubjectBean.class);
				return bean;
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void main(String[] args) {
		loadSubjectAndActicleByColumnId("1");
	}

}
