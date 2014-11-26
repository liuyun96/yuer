package com.own.yuer.ui;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.GestureDetector;
import android.view.GestureDetector.OnGestureListener;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.widget.Toast;
import android.widget.ViewFlipper;

import com.own.yuer.R;

public class ViewFlipperActivity extends Activity implements OnGestureListener,
		OnTouchListener {

	private ViewFlipper mViewFlipper;
	private GestureDetector mGestureDetector;
	private String tag = "ViewFlipperActivity";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.viewpager_layout);

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
		if (e1.getX() - e2.getX() > 50 && Math.abs(velocityX) > 0) {
			// 切换Activity
			// Intent intent = new Intent(ViewSnsActivity.this,
			// UpdateStatusActivity.class);
			// startActivity(intent);
			Toast.makeText(this, "向左手势", Toast.LENGTH_SHORT).show();
			overridePendingTransition(R.anim.in_from_right, R.anim.out_to_left);
		} else if (e2.getX() - e1.getX() > 50 && Math.abs(velocityX) > 0) {
			// 切换Activity
			// Intent intent = new Intent(this, MoreDateListActivity.class);
			// startActivity(intent);
			// Toast.makeText(this, "向右手势", Toast.LENGTH_SHORT).show();
			finish();
			overridePendingTransition(R.anim.in_from_right, R.anim.out_to_left);
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
