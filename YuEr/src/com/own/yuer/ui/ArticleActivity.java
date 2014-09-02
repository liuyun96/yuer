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
import android.widget.Toast;
import android.widget.ViewFlipper;

import com.own.yuer.R;

public class ArticleActivity extends Activity implements OnGestureListener,
		OnTouchListener {

	private ViewFlipper viewFlipper;
	private ImageButton button;
	private String tag = "ArticleActivity";
	private GestureDetector mGestureDetector;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.article_detail);
		button = (ImageButton) findViewById(R.id.article_back);
		button.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View arg0) {
				finish();
			}
		});
		mGestureDetector = new GestureDetector(this);
		viewFlipper = (ViewFlipper) findViewById(R.id.viewflipper);
		viewFlipper.setOnTouchListener(this);
		viewFlipper.startFlipping();
	}

	@Override
	public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
			float velocityY) {
		Log.e(tag, "x:" + velocityX + "y:" + velocityY);
		if (e1.getX() - e2.getX() > 50 && Math.abs(velocityX) > 0) {
			Toast.makeText(this, "Ïò×óÊÖÊÆ", Toast.LENGTH_SHORT).show();
			overridePendingTransition(R.anim.in_from_right, R.anim.out_to_left);
		} else if (e2.getX() - e1.getX() > 50 && Math.abs(velocityX) > 0) {
			overridePendingTransition(R.anim.in_from_right, R.anim.out_to_left);
			finish();
		}
		return false;
	}

	@Override
	public boolean onTouch(View v, MotionEvent event) {
		// TODO Auto-generated method stub
		mGestureDetector.onTouchEvent(event);
		return true;
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

}
