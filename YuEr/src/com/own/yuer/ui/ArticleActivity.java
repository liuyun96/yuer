package com.own.yuer.ui;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.GestureDetector;
import android.view.GestureDetector.OnGestureListener;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnTouchListener;
import android.widget.ImageButton;
import android.widget.ViewFlipper;

import com.own.yuer.R;

public class ArticleActivity extends Activity implements OnGestureListener,
		OnTouchListener {

	private ViewFlipper mViewFlipper;
	private ImageButton button;
	private GestureDetector mGestureDetector;
	private String tag = "ArticleActivity";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_detail);
		button = (ImageButton) findViewById(R.id.article_back);
		button.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				finish();
			}
		});
		mGestureDetector = new GestureDetector(this);
		mViewFlipper = (ViewFlipper) findViewById(R.id.viewflipper);
		mViewFlipper.setOnTouchListener(this);
		mViewFlipper.startFlipping();
	}

	@Override
	public boolean onDown(MotionEvent e) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onShowPress(MotionEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean onSingleTapUp(MotionEvent e) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
			float distanceY) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void onLongPress(MotionEvent e) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
			float velocityY) {
		Log.e(tag, "x:" + velocityX + "y:" + velocityY);
		if (e2.getX() - e1.getX() > 50 && Math.abs(velocityX) > 0) {
			finish();
			//overridePendingTransition(R.anim.push_left_in, R.anim.push_left_out);
		}
		return false;
	}

	@Override
	public boolean onTouch(View v, MotionEvent event) {
		// TODO Auto-generated method stub
		mGestureDetector.onTouchEvent(event);
		return true;
	}

}
