package com.own.yuer;

import android.os.Bundle;
import android.view.View;

public class MyActivity extends BaseActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.my);
	}

	public void clickRow(View view) {
		switch (view.getId()) {
		case R.id.my_fav:
			setContentView(R.layout.my_article);
			break;
		default:
			break;
		}
	}

	@Override
	public void goHome(View view) {
		setContentView(R.layout.my);
	}

}
