package com.own.yuer;

import java.util.Timer;
import java.util.TimerTask;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.CompoundButton.OnCheckedChangeListener;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;
import android.widget.TabHost;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends FragmentActivity implements
		OnCheckedChangeListener {

	RadioGroup radioGroup;
	ImageView img;
	TabHost tabHost;
	int startLeft;
	RelativeLayout bottom_layout;
	private RadioButton[] mRadioButtons;
	private MyFragmentTabManager tabManager;
	private int keyBackClickCount = 0;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		setupIntent();
		initMainTabsBottomUI();

	}

	private void setupIntent() {
		tabHost = (TabHost) findViewById(android.R.id.tabhost);
		tabHost.setup();
		tabManager = new MyFragmentTabManager(this, tabHost,
				android.R.id.tabcontent);

		tabManager.addTab(
				tabHost.newTabSpec("index").setIndicator("首页",
						getResources().getDrawable(R.drawable.index_menu_1)),
				HomeFragment.class, null);

		tabManager.addTab(
				tabHost.newTabSpec("search").setIndicator("搜索",
						getResources().getDrawable(R.drawable.index_menu_2)),
				SearchFragment.class, null);

		tabManager.addTab(
				tabHost.newTabSpec("tuan").setIndicator("团购",
						getResources().getDrawable(R.drawable.index_menu_3)),
				TuanFragment.class, null);

		tabManager.addTab(
				tabHost.newTabSpec("my").setIndicator("我的",
						getResources().getDrawable(R.drawable.index_menu_4)),
				MyFragment.class, null);

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}

	private void initMainTabsBottomUI() {
		RadioGroup localRadioGroup = (RadioGroup) findViewById(R.id.radiogroup);
		this.mRadioButtons = new RadioButton[4];
		int i = 0;
		while (i < 4) {
			String str = "radio_button" + i;
			this.mRadioButtons[i] = (RadioButton) localRadioGroup
					.findViewWithTag(str);
			this.mRadioButtons[i].setOnCheckedChangeListener(this);
			i += 1;
		}
		mRadioButtons[0].setChecked(true);
	}

	@Override
	public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
		int location = -1;
		for (int i = 0; i < mRadioButtons.length; i++) {
			if (buttonView == mRadioButtons[i]) {
				location = i;
			} else {
				mRadioButtons[i].setChecked(false);
			}
		}
		tabHost.setCurrentTab(location);
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
		Intent intent = new Intent(this, ArticleListActivity.class);
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

}
