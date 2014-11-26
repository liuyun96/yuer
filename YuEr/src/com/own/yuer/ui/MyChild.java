package com.own.yuer.ui;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.own.yuer.R;

public class MyChild extends BaseActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		Bundle bundle = getIntent().getExtras();
		init(bundle.getInt("view_id"));
	}

	private void init(int viewId) {
		int i = 0;
		switch (viewId) {
		case R.id.my_fav:
			setContentView(R.layout.my_article_item);
			i = R.string.my_fav;
			break;
		case R.id.my_comment:
			setContentView(R.layout.my_article_item);
			i = R.string.my_comment;
			break;
		case R.id.my_share:
			setContentView(R.layout.my_article_item);
			i = R.string.my_share;
			break;
		case R.id.my_like:
			setContentView(R.layout.my_article_item);
			i = R.string.my_like;
			break;
		case R.id.my_address:
			setContentView(R.layout.my_address);
			break;
		case R.id.my_introduction:
			setContentView(R.layout.my_introduction);
			break;
		case R.id.my_suggest:
			setContentView(R.layout.my_suggest);
			break;
		case R.id.my_order:
			setContentView(R.layout.my_order);
			break;
		case R.id.my_contact:
			setContentView(R.layout.my_contact);
			break;
		default:
			break;
		}
		TextView text = (TextView) findViewById(R.id.head_text);
		if (text != null & i != 0) {
			text.setText(i);
		}
	}

	/**
	 * 一定要加 view 否则会出现异常
	 * 
	 * @param view
	 */
	public void backMy(View view) {
		this.finish();
	}
	
	@Override
	public void goHome(View view) {
		// TODO Auto-generated method stub
		this.finish();
	}
}
