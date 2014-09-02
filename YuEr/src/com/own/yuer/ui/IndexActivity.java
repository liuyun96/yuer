package com.own.yuer.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AbsListView;
import android.widget.AbsListView.OnScrollListener;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.RadioGroup;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ViewFlipper;

import com.own.yuer.R;
import com.own.yuer.view.MyImageView;

public class IndexActivity extends BaseActivity implements OnScrollListener {

	// ListView��Adapter
	private SimpleAdapter mSimpleAdapter;
	private ListView lv;
	private Button bt;
	private ProgressBar pg;
	private ArrayList<HashMap<String, Object>> list;
	// ListView�ײ�View
	private View moreView;
	private Handler handler;
	// ����һ�������������������������ټ���
	private int MaxDateNum;
	// ���ɼ���Ŀ������
	private int lastVisibleIndex;
	private int keyBackClickCount = 0;
	private ViewFlipper flipper;
	private Activity mActivity;

	RadioGroup radioGroup;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.index);
		this.mActivity = this;
		// initData();
	}

	public void initData() {
		TextView headView = (TextView) findViewById(R.id.head_text);
		headView.setText(R.string.app_name);
		MaxDateNum = 22; // ���������������
		lv = (ListView) findViewById(R.id.lv);
		// ʵ�����ײ�����
		moreView = getLayoutInflater().inflate(R.layout.moredata, null);

		bt = (Button) moreView.findViewById(R.id.bt_load);
		pg = (ProgressBar) moreView.findViewById(R.id.pg);
		handler = new Handler();
		loadArticles(10);
		// ʵ����SimpleAdapter
		mSimpleAdapter = new SimpleAdapter(this, list, R.layout.article_item,
				new String[] { "img", "title", "readCount", "likeCount" },
				new int[] { R.id.article_img, R.id.article_title,
						R.id.article_readCount, R.id.article_likeCount });
		initViewFilppper(lv);
		// ���ϵײ�View��ע��Ҫ����setAdapter����ǰ
		lv.addFooterView(moreView);
		lv.setAdapter(mSimpleAdapter);
		// �󶨼�����
		lv.setOnScrollListener(this);
		bt.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				pg.setVisibility(View.VISIBLE);// ���������ɼ�
				bt.setVisibility(View.GONE);// ��ť���ɼ�
				handler.postDelayed(new Runnable() {
					@Override
					public void run() {
						loadArticles(5);// ���ظ�������
						bt.setVisibility(View.VISIBLE);
						pg.setVisibility(View.GONE);
						mSimpleAdapter.notifyDataSetChanged();// ֪ͨlistViewˢ������
					}

				}, 2000);
			}
		});
	}

	public void loadArticles(int count) {
		int num = 0;
		if (mSimpleAdapter != null) {
			num = mSimpleAdapter.getCount();
		}
		// ��map��װ�����ݣ���ʼ��10������
		if (list == null) {
			list = new ArrayList<HashMap<String, Object>>();
		}
		if (num <= MaxDateNum) {
			for (int i = 0; i < count; i++) {
				num += 1;
				HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("title", num + "��ϱ����ɳ� ��Ҫ  ����������֪�̶��ƶ�ѧϰ���ݴٽ��ۺϷ�չ");
				map.put("img", R.drawable.article_img);
				map.put("readCount", 100);
				map.put("likeCount", 50);
				list.add(map);
			}
		}

	}

	/**
	 * ����q����
	 */
	@Override
	protected void onResume() {
		// TODO Auto-generated method stub
		super.onResume();
	}

	public void init() {

	}

	/**
	 * �����Ƽ�λ
	 * 
	 * @param lv
	 */
	private void initViewFilppper(ListView lv) {

		/*LinearLayout listTop = (LinearLayout) LayoutInflater.from(mActivity)
				.inflate(R.layout.viewfillper, null);
		flipper = (ViewFlipper) listTop.findViewById(R.id.mflipper);
		// flipper.setBackgroundColor(Color.RED);
		Log.d("debug", flipper.getTop() + "");
		if (flipper != null) {
			flipper.setFlipInterval(3000);
			flipper.startFlipping();
		}
		for (int i = 0; i < 3; i++) {
			final MyImageView img = new MyImageView(mActivity);
			img.setId(i);
			img.setTitle("test" + i);
			img.setImg(R.drawable.index_flip);
			flipper.addView(img.getView());
		}
		lv.addHeaderView(listTop);*/
	}

	public void loadItem(View view) {
		Intent localIntent = new Intent();
		// /localIntent.setClass(this, ItemActivity.class);
		localIntent.setClass(this, ViewFlipperActivity.class);
		localIntent.putExtra("id", view.getId());
		startActivity(localIntent);
	}

	@Override
	public void onScroll(AbsListView view, int firstVisibleItem,
			int visibleItemCount, int totalItemCount) {
		// �������ɼ���Ŀ������
		lastVisibleIndex = firstVisibleItem + visibleItemCount - 1;
		// ���е���Ŀ�Ѿ������������ȣ����Ƴ��ײ���View
		if (totalItemCount == MaxDateNum + 1) {
			lv.removeFooterView(moreView);
			Toast.makeText(this, "����ȫ��������ɣ�û�и������ݣ�", Toast.LENGTH_LONG).show();
		}

	}

	@Override
	public void onScrollStateChanged(AbsListView view, int scrollState) {
		// �����ײ����Զ����أ��ж�listview�Ѿ�ֹͣ�������������ӵ���Ŀ����adapter����Ŀ
		if (scrollState == OnScrollListener.SCROLL_STATE_IDLE
				&& lastVisibleIndex == mSimpleAdapter.getCount()) {
			System.out.println("�Ѿ����ײ��ˣ��Զ������µ�����");
			// �������ײ�ʱ�Զ�����
			pg.setVisibility(View.VISIBLE);
			bt.setVisibility(View.GONE);
			handler.postDelayed(new Runnable() {
				@Override
				public void run() {
					loadArticles(5);
					bt.setVisibility(View.VISIBLE);
					pg.setVisibility(View.GONE);
					mSimpleAdapter.notifyDataSetChanged();
				}

			}, 2000);
		}

	}

	public void clickBtn(View view) {
		switch (view.getId()) {
		case R.id.index_menu_1:
			break;
		case R.id.index_menu_2:
			break;
		case R.id.index_menu_3:
			break;
		case R.id.index_menu_4:
			break;
		default:
			break;
		}
		openActivity(ArticleListActivity.class);
	}

	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			switch (keyBackClickCount++) {
			case 0:
				// showToast(this.getApplication().getApplicationContext(), "");
				Toast.makeText(this, "�ٵ�һ���˳�", Toast.LENGTH_SHORT).show();
				Timer timer = new Timer();
				timer.schedule(new TimerTask() {
					@Override
					public void run() {
						keyBackClickCount = 0;
					}
				}, 3000);
				break;
			case 1:
				finish();
			default:
				break;
			}
		}
		return true;
	}
}
