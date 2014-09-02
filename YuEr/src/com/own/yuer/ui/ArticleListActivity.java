package com.own.yuer.ui;

import java.util.ArrayList;
import java.util.HashMap;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AbsListView;
import android.widget.AbsListView.OnScrollListener;
import android.widget.Button;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.SimpleAdapter;
import android.widget.Toast;

import com.own.yuer.R;

public class ArticleListActivity extends BaseActivity implements
		OnScrollListener {

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

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.article_list);
		initData();
	}

	public void initData() {
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
	
	@Override
	public void goHome(View view) {
		// TODO Auto-generated method stub
		this.finish();
	}

}
