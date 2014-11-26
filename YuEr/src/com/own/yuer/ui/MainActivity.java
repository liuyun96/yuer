package com.own.yuer.ui;

import java.util.Timer;
import java.util.TimerTask;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.widget.ImageView;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.TabHost;
import android.widget.TextView;
import android.widget.Toast;

import com.own.yuer.AppContext;
import com.own.yuer.R;
import com.own.yuer.common.UIHelper;
import com.own.yuer.db.DBHelper;

public class MainActivity extends FragmentActivity {
	private AppContext appContext;// 全局Context
	RadioGroup radioGroup;
	ImageView img;
	TabHost tabHost;
	int startLeft;
	RelativeLayout bottom_layout;
	private MyFragmentTabManager tabManager;
	private int keyBackClickCount = 0;

	private String tag = "MainActivity";

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		// 获取应用
		appContext = (AppContext) getApplication();
		if (!appContext.isNetworkConnected())
			UIHelper.ToastMessage(this, R.string.network_not_connected);
		setupIntent();
		//getPhoneNumber();
	}

	private void getPhoneNumber() {
		TelephonyManager tm = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
		String imei = tm.getDeviceId();
		String tel = tm.getLine1Number();
		String imsi = tm.getSubscriberId();
		Log.e(tag, "tel" + tel + "imei" + imei+"imsi"+imsi);
	}

	private void setupIntent() {
		tabHost = (TabHost) findViewById(android.R.id.tabhost);
		tabHost.setup();
		tabManager = new MyFragmentTabManager(this, tabHost,
				android.R.id.tabcontent);

		tabManager.addTab(
				createTabSpec("index", "首页", R.drawable.index_menu_1),
				HomeFragment.class, null);
		tabManager.addTab(
				createTabSpec("search", "搜索", R.drawable.index_menu_2),
				SearchFragment.class, null);
		tabManager.addTab(createTabSpec("tuan", "团购", R.drawable.index_menu_3),
				TuanFragment.class, null);
		tabManager.addTab(createTabSpec("my", "我的", R.drawable.index_menu_4),
				MyFragment.class, null);

	}

	// 返回单个选项
	private TabHost.TabSpec createTabSpec(String tabSpec, String text, int resid) {
		TabHost.TabSpec index = tabHost.newTabSpec(tabSpec);
		View view = LayoutInflater.from(this).inflate(R.layout.tabwidget, null,
				false);
		TextView tv_name = (TextView) view.findViewById(R.id.tab_text);
		ImageView iv_icon = (ImageView) view.findViewById(R.id.tab_img);
		tv_name.setText(text);
		iv_icon.setBackgroundResource(resid);
		index.setIndicator(view);
		return index;
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}

	/*****
	 * 点击行
	 * 
	 * @param view
	 */
	public void clickRow(View view) {
		Intent intent = new Intent(this, MyChild.class);
		Bundle bundle = new Bundle();
		bundle.putInt("view_id", view.getId());
		intent.putExtras(bundle);
		startActivity(intent);
	}

	public void clickBtn(View view) {
		switch (view.getId()) {
		case R.id.index_menu_1:
			break;
		case R.id.index_menu_2:
			break;
		case R.id.index_menu_3:
			break;
		case R.id.index_menu_4:
			break;
		default:
			break;
		}
		Intent intent = new Intent(this, SubjectActivity.class);
		startActivity(intent);
	}

	/**
	 * 按钮返回页面
	 */
	public void goHome(View view) {
		switch (view.getId()) {
		case R.id.tuan_back:
			tabHost.setCurrentTab(0);
			break;
		case R.id.back_search:
			tabHost.setCurrentTab(1);
			break;
		default:
			break;
		}
	}

	public void back(View view) {
		switch (view.getId()) {
		case R.id.back_search:
			tabHost.setCurrentTab(1);
			setContentView(R.layout.search_fragment);
			break;
		default:
			break;
		}
	}

	/**
	 * 点击关键字搜索
	 * 
	 * @param view
	 */
	public void clickKey(View view) {
		TextView keyTV = (TextView) view;
		// 确认按钮隐藏
		Intent intent = new Intent(this, SearchDetailActivity.class);
		Bundle bundle = new Bundle();
		bundle.putCharSequence("searchText", keyTV.getText());
		// bundle.putString("searchText",textView.getText());
		intent.putExtras(bundle);
		startActivity(intent);
	}

	public void loadItem(View view) {
		Intent localIntent = new Intent();
		// /localIntent.setClass(this, ItemActivity.class);
		localIntent.setClass(this, ViewFlipperActivity.class);
		localIntent.putExtra("id", view.getId());
		startActivity(localIntent);
	}

	/**
	 * 退出应用
	 */
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			switch (keyBackClickCount++) {
			case 0:
				// showToast(this.getApplication().getApplicationContext(), "");
				Toast.makeText(this, "再点一下退出", Toast.LENGTH_SHORT).show();
				Timer timer = new Timer();
				timer.schedule(new TimerTask() {
					@Override
					public void run() {
						keyBackClickCount = 0;
					}
				}, 3000);
				break;
			case 1:
				finish();
			default:
				break;
			}
		}
		return true;
	}

	@Override
	protected void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		// 关闭数据库操作
		try {
			DBHelper dbHelper = DBHelper.getInstance(this);
			dbHelper.closeDb();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

}
