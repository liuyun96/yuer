package com.own.yuer.test;

import com.own.yuer.db.DBHelper;

import android.test.AndroidTestCase;

public class TestSqlLite extends AndroidTestCase {

	public void createTable() {
		DBHelper dbHelper = DBHelper.getInstance(this.getContext());
		dbHelper.ExecSQL(" drop table if exists user ");
		String sql = " create table user (id integer primary key autoincrement,username text,password text)";
		dbHelper.ExecSQL(sql);
		dbHelper.closeDb();
	}
}
