package com.own.yuer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AbsListView;
import android.widget.AbsListView.OnScrollListener;
import android.widget.Button;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.SimpleAdapter;
import android.widget.Toast;

public class IndexActivity extends BaseActivity implements OnScrollListener {

	// ListView的Adapter
	private SimpleAdapter mSimpleAdapter;
	private ListView lv;
	private Button bt;
	private ProgressBar pg;
	private ArrayList<HashMap<String, String>> list;
	// ListView底部View
	private View moreView;
	private Handler handler;
	// 设置一个最大的数据条数，超过即不再加载
	private int MaxDateNum;
	// 最后可见条目的索引
	private int lastVisibleIndex;
	private int keyBackClickCount = 0;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		initData();
	}

	public void initData() {
		MaxDateNum = 22; // 设置最大数据条数
		lv = (ListView) findViewById(R.id.lv);
		// 实例化底部布局
		moreView = getLayoutInflater().inflate(R.layout.moredata, null);

		bt = (Button) moreView.findViewById(R.id.bt_load);
		pg = (ProgressBar) moreView.findViewById(R.id.pg);
		handler = new Handler();

		// 用map来装载数据，初始化10条数据
		list = new ArrayList<HashMap<String, String>>();
		for (int i = 0; i < 10; i++) {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("ItemTitle", "第" + i + "行标题");
			map.put("ItemText", "第" + i + "行内容");
			list.add(map);
		}
		// 实例化SimpleAdapter
		mSimpleAdapter = new SimpleAdapter(this, list, R.layout.item,
				new String[] { "ItemTitle", "ItemText" }, new int[] {
						R.id.tv_title, R.id.tv_content });

		// 加上底部View，注意要放在setAdapter方法前
		lv.addFooterView(moreView);
		lv.setAdapter(mSimpleAdapter);
		// 绑定监听器
		lv.setOnScrollListener(this);
		bt.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				pg.setVisibility(View.VISIBLE);// 将进度条可见
				bt.setVisibility(View.GONE);// 按钮不可见
				handler.postDelayed(new Runnable() {
					@Override
					public void run() {
						loadMoreDate();// 加载更多数据
						bt.setVisibility(View.VISIBLE);
						pg.setVisibility(View.GONE);
						mSimpleAdapter.notifyDataSetChanged();// 通知listView刷新数据
					}

				}, 2000);
			}
		});
	}

	public void loadItem(View view) {
		Intent localIntent = new Intent();
		// /localIntent.setClass(this, ItemActivity.class);
		localIntent.setClass(this, ViewFlipperActivity.class);
		localIntent.putExtra("id", view.getId());
		startActivity(localIntent);
	}

	private void loadMoreDate() {
		int count = mSimpleAdapter.getCount();
		if (count + 5 < MaxDateNum) {
			// 每次加载5条
			for (int i = count; i < count + 5; i++) {
				HashMap<String, String> map = new HashMap<String, String>();
				map.put("ItemTitle", "新增第" + i + "行标题");
				map.put("ItemText", "新增第" + i + "行内容");
				list.add(map);
			}
		} else {
			// 数据已经不足5条
			for (int i = count; i < MaxDateNum; i++) {
				HashMap<String, String> map = new HashMap<String, String>();
				map.put("ItemTitle", "新增第" + i + "行标题");
				map.put("ItemText", "新增第" + i + "行内容");
				list.add(map);
			}
		}

	}

	@Override
	public void onScroll(AbsListView view, int firstVisibleItem,
			int visibleItemCount, int totalItemCount) {
		// 计算最后可见条目的索引
		lastVisibleIndex = firstVisibleItem + visibleItemCount - 1;

		// 所有的条目已经和最大条数相等，则移除底部的View
		if (totalItemCount == MaxDateNum + 1) {
			lv.removeFooterView(moreView);
			Toast.makeText(this, "数据全部加载完成，没有更多数据！", Toast.LENGTH_LONG).show();
		}

	}

	@Override
	public void onScrollStateChanged(AbsListView view, int scrollState) {
		// 滑到底部后自动加载，判断listview已经停止滚动并且最后可视的条目等于adapter的条目
		if (scrollState == OnScrollListener.SCROLL_STATE_IDLE
				&& lastVisibleIndex == mSimpleAdapter.getCount()) {
			System.out.println("已经到底部了，自动加载新的内容");
			// 当滑到底部时自动加载
			pg.setVisibility(View.VISIBLE);
			bt.setVisibility(View.GONE);
			handler.postDelayed(new Runnable() {
				@Override
				public void run() {
					loadMoreDate();
					bt.setVisibility(View.VISIBLE);
					pg.setVisibility(View.GONE);
					mSimpleAdapter.notifyDataSetChanged();
				}

			}, 2000);
		}

	}


	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_BACK) {
			switch (keyBackClickCount++) {
			case 0:
				// showToast(this.getApplication().getApplicationContext(), "");
				Toast.makeText(this, "再点一下退出", Toast.LENGTH_SHORT).show();
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
