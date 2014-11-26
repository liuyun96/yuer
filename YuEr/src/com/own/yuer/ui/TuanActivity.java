package com.own.yuer.ui;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;

import com.own.yuer.R;

public class TuanActivity extends BaseActivity {

	private ImageButton button;
	private String tag = "TuanActivity";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		Log.i(tag, "onCreate");
		super.onCreate(savedInstanceState);
		setContentView(R.layout.tuan_detail);
		button = (ImageButton) findViewById(R.id.tuan_detail_back);
		button.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				finish();
			}
		});
	}

}
