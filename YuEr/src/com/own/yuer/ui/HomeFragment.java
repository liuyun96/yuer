package com.own.yuer.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
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

import com.own.yuer.AppContext;
import com.own.yuer.AppException;
import com.own.yuer.R;
import com.own.yuer.adapter.MainListViewAdapter;
import com.own.yuer.bean.News;
import com.own.yuer.bean.NewsList;
import com.own.yuer.common.UIHelper;
import com.own.yuer.view.MyImageView;
import com.own.yuer.widget.MyListView;

public class HomeFragment extends ListFragment {

	// �ڶ���ui
	private MainListViewAdapter listViewAdapter;
	private ProgressDialog selectorDialog;
	private List<News> newsList;
	private MyListView listview;
	private AppContext appContext;// ȫ��Context

	// ��һ��ui
	private ListView lv;
	// ListView�ײ�View
	private View moreView;
	// ListView��Adapter
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
		View view = inflater.inflate(R.layout.activity_main, container, false);
		appContext = (AppContext) getActivity().getApplication();
		// initData(view, inflater);
		init(view);
		initData();
		return view;
	}

	private void init(View view) {
		lv = (ListView) view.findViewById(android.R.id.list);
		selectorDialog = ProgressDialog.show(getActivity(), null,
				"���ڼ��أ����Ժ�...", true, false);
		handler = new Handler() {
			public void handleMessage(Message msg) {
				selectorDialog.cancel();
				if (msg.what == 1) {
					newsList = (List<News>) msg.obj;
					listViewAdapter = new MainListViewAdapter(getActivity(),
							newsList);
					lv.setAdapter(listViewAdapter);
				} else if (msg.what == -1) {
					UIHelper.ToastMessage(getActivity(), "û������");
				} else if (msg.what == -2) {
					UIHelper.ToastMessage(getActivity(),
							R.string.xml_parser_failed);
				}
			}
		};
	}

	private void initData() {
		selectorDialog.show();
		new Thread() {
			public void run() {
				Message msg = new Message();
				boolean isRefresh = false;
				try {
					NewsList list = appContext.getNewsList();
					if (list.getNewsCount() > 0) {
						msg.what = 1;
						msg.obj = list.getNewslist();
						appContext.saveObject(list, "newslist_");
					} else {
						msg.what = -1;
					}
				} catch (AppException e) {
					e.printStackTrace();
					msg.what = -2;
					msg.obj = e;
				}
				handler.sendMessage(msg);
			}
		}.start();
	}

	public void initData(View view, LayoutInflater inflater) {
		TextView headView = (TextView) view.findViewById(R.id.head_text);
		headView.setText(R.string.app_name);
		MaxDateNum = 22; // ���������������
		lv = (ListView) view.findViewById(android.R.id.list);
		// ʵ�����ײ�����
		moreView = inflater.inflate(R.layout.moredata, null);

		bt = (Button) moreView.findViewById(R.id.bt_load);
		pg = (ProgressBar) moreView.findViewById(R.id.pg);
		handler = new Handler();
		loadArticles(10);
		mSimpleAdapter = new SimpleAdapter(getActivity(), list, R.layout.item,
				new String[] { "img", "title", "readCount", "likeCount" },
				new int[] { R.id.article_img, R.id.article_title,
						R.id.article_readCount, R.id.article_likeCount });
		// ���ϵײ�View��ע��Ҫ����setAdapter����ǰ
		initViewFilppper(lv);
		lv.addFooterView(moreView);
		lv.setAdapter(mSimpleAdapter);
		// �󶨼�����
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

	@Override
	public void onListItemClick(ListView l, View v, int position, long id) {
		// TODO Auto-generated method stub

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
	 * �����Ƽ�λ
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
