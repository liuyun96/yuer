package com.own.yuer.ui;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.own.yuer.R;

public class BaseActivity extends Activity {

	public void defaultFinish() {
		super.finish();
	}

	protected void openActivity(Class<?> pClass) {
		openActivity(pClass, null);
	}

	protected void openActivity(Class<?> pClass, Bundle pBundle) {
		Intent intent = new Intent(this, pClass);
		// 设置activity切换无效果
		intent.setFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
		if (pBundle != null) {
			intent.putExtras(pBundle);
		}
		startActivity(intent);
	}

	/**
	 * 按钮返回页面
	 */
	public void goHome(View view) {
		switch (view.getId()) {
		case R.id.tuan_back:
			break;
		default:
			break;
		}
		openActivity(IndexActivity.class);
	}

	public void clickMenu(View view) {

		switch (view.getId()) {
		case R.id.index_menu_1:
			openActivity(IndexActivity.class);
			break;
		case R.id.index_menu_2:
			openActivity(SearchActivity.class);
			break;
		case R.id.index_menu_3:
			openActivity(TuanActivity.class);
			break;
		case R.id.index_menu_4:
			openActivity(MyActivity.class);
			break;
		default:
			break;
		}
	}

	@Override
	public void finish() {
		// TODO Auto-generated method stub
		super.finish();
		overridePendingTransition(0, 0);
	}

	
}
