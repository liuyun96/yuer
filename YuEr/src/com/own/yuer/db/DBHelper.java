package com.own.yuer.db;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;
import android.database.sqlite.SQLiteOpenHelper;
import android.provider.BaseColumns;

public class DBHelper extends SQLiteOpenHelper {

	private static final String DB_NAME = "yuer";
	private static final int DB_VERSION = 4;
	private SQLiteDatabase db;
	private static DBHelper mdbHelper;

	/**
	 * ����ģʽ
	 * 
	 * @param context
	 * @return
	 */
	public static DBHelper getInstance(Context context) {
		if (mdbHelper == null) {
			mdbHelper = new DBHelper(context);
		}
		return mdbHelper;
	}

	private DBHelper(Context context) {
		// �������ݿ�
		super(context, DB_NAME, null, DB_VERSION);
	}

	private DBHelper(Context context, String name, CursorFactory factory,
			int version) {
		super(context, name, factory, version);
		// TODO Auto-generated constructor stub
	}

	/**
	 * �����ݿ��״δ���ʱִ�и÷�����һ�㽫������ȳ�ʼ���������ڸ÷�����ִ��. ��дonCreate����������execSQL����������
	 * */
	@Override
	public void onCreate(SQLiteDatabase db) {
		this.db = db;
		operateTable(db, "");
		if (!checkisExistData("article"))
			initData();
	}
	
	// �������ݿ�ʱ����İ汾���뵱ǰ�İ汾�Ų�ͬʱ����ø÷���
	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
		// TODO Auto-generated method stub
		if (oldVersion == newVersion) {
			return;
		}
		operateTable(db, "DROP TABLE IF EXISTS ");
		onCreate(db);
	}

	public void initData() {
		for (int i = 0; i < 50; i++) {
			ContentValues values = new ContentValues();
			values.put(ArticleColumn.TITLE, "��ϱ����ɳ� ��Ҫ  ����������֪�̶��ƶ�ѧϰ���ݴٽ��ۺϷ�չ");
			values.put(
					ArticleColumn.IMG_URL,
					"http://img1.bitautoimg.com/wapimg-66-44/bitauto/2014/07/19/bd6dab65-c23a-4004-8194-720993aaf143_630.jpg");
			values.put(ArticleColumn.like_COUNT, 100);
			values.put(ArticleColumn.READ_COUNT, 50);
			values.put(ArticleColumn.UPDATE_TIME, "2014-07-19");
			values.put(ArticleColumn._ID, i);
			this.insert("article", values);
		}
	}

	public boolean checkisExistData(String tableName) {
		Cursor cursor = this.rawQuery(" select count(*) from  " + tableName,
				null);
		cursor.moveToFirst();
		if (cursor.getLong(0) != 0) {
			return true;
		}
		cursor.close();
		return false;
	}

	// ��ѯ��¼������
	public long getCount(String tableName) {
		if (db == null)
			db = getWritableDatabase();
		String sql = "select count(*) from " + tableName;
		Cursor c = db.rawQuery(sql, null);
		c.moveToFirst();
		long length = c.getLong(0);
		c.close();
		return length;
	}

	/**
	 * �õ����еļ�¼����
	 * 
	 * @param firstResult
	 *            �ӵڼ������ݿ�ʼ��ѯ��
	 * @param maxResult
	 *            ÿҳ��ʾ��������¼��
	 * @return ��ǰҳ�ļ�¼
	 */
	public Cursor getAllItems(String tableName, int firstResult, int maxResult) {
		if (db == null) {
			db = getWritableDatabase();
		}
		String sql = "select * from " + tableName + " limit ?,?";
		Cursor mCursor = db.rawQuery(
				sql,
				new String[] { String.valueOf(firstResult),
						String.valueOf(maxResult) });
		return mCursor;
	}


	public void operateTable(SQLiteDatabase db, String actionString) {
		Class<DatabaseColumn>[] columnsClasses = DatabaseColumn.getSubClasses();
		DatabaseColumn columns = null;
		for (int i = 0; i < columnsClasses.length; i++) {
			try {
				columns = columnsClasses[i].newInstance();
				if ("".equals(actionString) || actionString == null) {
					db.execSQL(columns.getTableCreateor());
				} else {
					db.execSQL(actionString + columns.getTableName());
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

	}

	public long insert(String Table_Name, ContentValues values) {
		if (db == null)
			db = getWritableDatabase();
		return db.insert(Table_Name, null, values);
	}

	/**
	 * 
	 * @param Table_Name
	 * @param id
	 * @return 影响行数
	 */
	public int delete(String Table_Name, int id) {
		if (db == null)
			db = getWritableDatabase();
		return db.delete(Table_Name, BaseColumns._ID + "=?",
				new String[] { String.valueOf(id) });
	}

	/**
	 * @param Table_Name
	 * @param values
	 * @param WhereClause
	 * @param whereArgs
	 * @return 影响行数
	 */
	public int update(String Table_Name, ContentValues values,
			String WhereClause, String[] whereArgs) {
		if (db == null) {
			db = getWritableDatabase();
		}
		return db.update(Table_Name, values, WhereClause, whereArgs);
	}

	public Cursor query(String Table_Name, String[] columns, String whereStr,
			String[] whereArgs) {
		if (db == null) {
			db = getReadableDatabase();
		}
		return db.query(Table_Name, columns, whereStr, whereArgs, null, null,
				null);
	}

	public Cursor rawQuery(String sql, String[] args) {
		if (db == null) {
			db = getReadableDatabase();
		}
		return db.rawQuery(sql, args);
	}

	public void ExecSQL(String sql) {
		if (db == null) {
			db = getWritableDatabase();
		}
		db.execSQL(sql);
	}

	public void closeDb() {
		if (db != null && db.isOpen()) {
			db.close();
			db = null;
		}
	}

}
