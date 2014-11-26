package com.own.yuer.db;

import java.util.ArrayList;
import java.util.List;

import android.content.Context;
import android.database.Cursor;

import com.own.yuer.bean.Article;

public class ArticleService {
	DBHelper dbHelper;

	public ArticleService(Context context) {
		// TODO Auto-generated constructor stub
		this.dbHelper = DBHelper.getInstance(context);
	}

	public List<Article> queryArticle(int page, Integer pagesize) {
		List<Article> list = new ArrayList<Article>();
		Cursor cursor = dbHelper.getAllItems("article", page*pagesize, pagesize);
		for (cursor.moveToFirst(); !(cursor.isAfterLast()); cursor.moveToNext()) {
			Article article = new Article();
			article.setTitle(cursor.getString(cursor.getColumnIndex("title")));
			article.setImg(cursor.getString(cursor.getColumnIndex("img_url")));
			article.setReadCount(cursor.getInt(cursor
					.getColumnIndex("read_count")));
			article.setLikeCount(cursor.getInt(cursor
					.getColumnIndex("like_count")));
			article.setId(cursor.getInt(cursor.getColumnIndex("_id")));
			list.add(article);
		}
		return list;
	}

}
