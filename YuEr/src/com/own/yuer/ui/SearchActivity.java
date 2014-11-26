package com.own.yuer.ui;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.own.yuer.R;

public class SearchActivity extends BaseActivity {

	// 确认按钮
	Button btn;
	TextView searchTextView;
	ImageView backView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		init();
	}

	public void init() {
		setContentView(R.layout.search);
		btn = (Button) findViewById(R.id.searchBtn);
		btn.setVisibility(View.VISIBLE);
		backView = (ImageView) findViewById(R.id.back_search);
		backView.setVisibility(View.INVISIBLE);
		btn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				clickSearch(arg0);
			}
		});
	}

	public void backSearch(View view) {
		init();
	}

	/**
	 * 点确定搜索
	 * 
	 * @param view
	 */
	public void clickSearch(View view) {
		TextView textView = (TextView) findViewById(R.id.searchText);
		setContentView(R.layout.search_detail);
		searchTextView = (TextView) findViewById(R.id.searchText);
		searchTextView.setText(textView.getText());
		btn = (Button) findViewById(R.id.searchBtn);
		// 确认按钮隐藏
		btn.setVisibility(View.INVISIBLE);
		backView.setVisibility(View.VISIBLE);
	}

	/**
	 * 点击关键字搜索
	 * 
	 * @param view
	 */
	public void clickKey(View view) {
		TextView keyTV = (TextView) view;
		setContentView(R.layout.search_detail);
		searchTextView = (TextView) findViewById(R.id.searchText);
		searchTextView.setText(keyTV.getText());
		btn = (Button) findViewById(R.id.searchBtn);
		// 确认按钮隐藏
		btn.setVisibility(View.INVISIBLE);
		backView.setVisibility(View.VISIBLE);
	}
}
