package com.own.yuer;

import java.util.ArrayList;
import java.util.HashMap;

import com.own.yuer.view.MyImageView;

import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.ListFragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.widget.ViewFlipper;

public class HomeFragment extends ListFragment {

	private ListView lv;
	// ListView底部View
	private View moreView;
	// ListView的Adapter
	private SimpleAdapter mSimpleAdapter;
	private Button bt;
	private ProgressBar pg;
	private Handler handler;
	private ArrayList<HashMap<String, Object>> list;
	private int MaxDateNum;
	private ViewFlipper flipper;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		View view = inflater.inflate(R.layout.home, container, false);
		initData(view, inflater);
		return view;

	}

	public void initData(View view, LayoutInflater inflater) {
		TextView headView = (TextView) view.findViewById(R.id.head_text);
		headView.setText(R.string.app_name);
		MaxDateNum = 22; // 设置最大数据条数
		lv = (ListView) view.findViewById(android.R.id.list);
		// 实例化底部布局
		moreView = inflater.inflate(R.layout.moredata, null);

		bt = (Button) moreView.findViewById(R.id.bt_load);
		pg = (ProgressBar) moreView.findViewById(R.id.pg);
		handler = new Handler();
		loadArticles(10);
		mSimpleAdapter = new SimpleAdapter(getActivity(), list, R.layout.item,
				new String[] { "img", "title", "readCount", "likeCount" },
				new int[] { R.id.article_img, R.id.article_title,
						R.id.article_readCount, R.id.article_likeCount });
		// 加上底部View，注意要放在setAdapter方法前
		initViewFilppper(lv);
		lv.addFooterView(moreView);
		lv.setAdapter(mSimpleAdapter);
		// 绑定监听器
		bt.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				pg.setVisibility(View.VISIBLE);// 将进度条可见
				bt.setVisibility(View.GONE);// 按钮不可见
				handler.postDelayed(new Runnable() {
					@Override
					public void run() {
						loadArticles(5);// 加载更多数据
						bt.setVisibility(View.VISIBLE);
						pg.setVisibility(View.GONE);
						mSimpleAdapter.notifyDataSetChanged();// 通知listView刷新数据
					}

				}, 2000);
			}
		});
	}

	@Override
	public void onListItemClick(ListView l, View v, int position, long id) {
		// TODO Auto-generated method stub

	}

	public void loadArticles(int count) {
		int num = 0;
		if (mSimpleAdapter != null) {
			num = mSimpleAdapter.getCount();
		}
		// 用map来装载数据，初始化10条数据
		if (list == null) {
			list = new ArrayList<HashMap<String, Object>>();
		}
		if (num <= MaxDateNum) {
			for (int i = 0; i < count; i++) {
				num += 1;
				HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("title", num + "配合宝宝成长 需要  针对年龄段认知程度制定学习内容促进综合发展");
				map.put("img", R.drawable.article_img);
				map.put("readCount", 100);
				map.put("likeCount", 50);
				list.add(map);
			}
		}

	}

	/**
	 * 加载推荐位
	 * 
	 * @param lv
	 */
	private void initViewFilppper(ListView lv) {

		LinearLayout listTop = (LinearLayout) LayoutInflater
				.from(getActivity()).inflate(R.layout.viewfillper, null);
		flipper = (ViewFlipper) listTop.findViewById(R.id.mflipper);
		// flipper.setBackgroundColor(Color.RED);
		Log.d("debug", flipper.getTop() + "");
		if (flipper != null) {
			flipper.setFlipInterval(3000);
			flipper.startFlipping();
		}
		for (int i = 0; i < 3; i++) {
			final MyImageView img = new MyImageView(getActivity());
			img.setId(i);
			img.setTitle("test" + i);
			img.setImg(R.drawable.index_flip);
			flipper.addView(img.getView());
		}
		lv.addHeaderView(listTop);
	}

}
