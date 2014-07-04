package com.own.yuer;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class BaseActivity extends Activity {

	public void defaultFinish() {
		super.finish();
	}

	protected void openActivity(Class<?> pClass) {
		openActivity(pClass, null);
	}

	protected void openActivity(Class<?> pClass, Bundle pBundle) {
		Intent intent = new Intent(this, pClass);
		if (pBundle != null) {
			intent.putExtras(pBundle);
		}
		startActivity(intent);
	}

	/**
	 * ∞¥≈•∑µªÿ“≥√Ê
	 */
	public void goHome(View view) {
		switch (view.getId()) {
		case R.id.tuan_back:
			openActivity(IndexActivity.class);
			break;
		default:
			break;
		}
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
}
