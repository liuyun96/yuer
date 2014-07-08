package com.own.yuer;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

public class MyActivity extends BaseActivity {

	private MyActivity myActivity;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.my);
		myActivity = this;
	}

	/*****
	 * �����
	 * 
	 * @param view
	 */
	public void clickRow(View view) {
		Intent intent = new Intent(myActivity, MyChild.class);
		Bundle bundle = new Bundle();
		bundle.putInt("view_id", view.getId());
		intent.putExtras(bundle);
		startActivity(intent);
	}

	@Override
	public void goHome(View view) {
		setContentView(R.layout.my);
	}

}
