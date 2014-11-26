package com.own.yuer.bean;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.own.yuer.AppException;

public class NewsList extends Base {
	private int catalog;
	private int pageSize;
	private int newsCount;
	private List<News> newslist = new ArrayList<News>();

	public int getCatalog() {
		return catalog;
	}

	public int getPageSize() {
		return pageSize;
	}

	public int getNewsCount() {
		return newsCount;
	}

	public List<News> getNewslist() {
		return newslist;
	}

	public static NewsList parse(JSONArray obj) throws IOException,
			AppException, JSONException {
		NewsList newslist = new NewsList();
		if (null != obj) {
			newslist.newsCount = obj.length();
			for (int i = 0; i < obj.length(); i++) {
				JSONObject newsJson = obj.getJSONObject(i);
				News news = new News();
				news.setId(newsJson.getString("ID"));
				news.setTitle(newsJson.getString("Title"));
				news.setFirstPicUrl(newsJson.getString("FirstPicUrl"));
				news.setPublishTime(newsJson.getString("PublishTime"));
				newslist.newslist.add(news);
			}
		}
		return newslist;
	}
}
