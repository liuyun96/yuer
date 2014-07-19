package com.own.yuer.db;

import java.util.HashMap;
import java.util.Map;

import android.net.Uri;

/**
 * news
 * 
 * @author wangxin
 * 
 */
public class ArticleColumn extends DatabaseColumn {

	public static final String TABLE_NAME = "article";
	public static final String UPDATE_TIME = "update_time";
	public static final String TITLE = "title";
	public static final String READ_COUNT = "read_count";
	public static final String like_COUNT = "like_count";
	public static final String IMG_URL = "img_url";// 图片链接

	/**
	 * 表的存放路径
	 */
	public static final Uri CONTENT_URI = Uri.parse("content://" + AUTHORITY
			+ "/" + TABLE_NAME);
	private static final Map<String, String> mColumnMap = new HashMap<String, String>();
	static {

		mColumnMap.put(_ID, "integer primary key");
		mColumnMap.put(UPDATE_TIME, "timestamp");
		mColumnMap.put(TITLE, "VARCHAR(60)");
		mColumnMap.put(READ_COUNT, "integer");
		mColumnMap.put(like_COUNT, "integer");
		mColumnMap.put(IMG_URL, "varchar(100)");
	}

	@Override
	public String getTableName() {
		// TODO Auto-generated method stub
		return TABLE_NAME;
	}

	@Override
	public Uri getTableContent() {
		// TODO Auto-generated method stub
		return CONTENT_URI;
	}

	@Override
	protected Map<String, String> getTableMap() {
		// TODO Auto-generated method stub
		return mColumnMap;
	}

}
