package com.own.yuer;

import android.os.Bundle;
import android.os.Handler;

public class SplashActivity extends BaseActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.splash);
		new Handler().postDelayed(new Runnable() {
			@Override
			public void run() {
				goHome();
			}
		}, 2);
	}

	public void goHome() {
		openActivity(IndexActivity.class);
		defaultFinish();
	}
}
