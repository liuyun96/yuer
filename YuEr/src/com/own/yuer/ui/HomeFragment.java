package com.own.yuer.ui;

import java.util.ArrayList;
import java.util.List;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.ListFragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.AbsListView.OnScrollListener;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.ViewFlipper;

import com.own.yuer.R;
import com.own.yuer.adapter.ArticleListViewAdapter;
import com.own.yuer.bean.Article;
import com.own.yuer.common.UIHelper;
import com.own.yuer.db.ArticleService;
import com.own.yuer.util.ConnectServer;
import com.own.yuer.util.Constant;
import com.own.yuer.view.MyImageView;

public class HomeFragment extends ListFragment implements OnScrollListener {

	// �ڶ���ui
	private ArticleListViewAdapter listViewAdapter;
	private ProgressDialog selectorDialog;
	private List<Article> articleList;

	// ��һ��ui
	private ListView lv;
	// ListView�ײ�View
	private View moreView;
	// ListView��Adapter
	private Button bt;
	private ProgressBar pg;
	private Handler handler;
	private ViewFlipper flipper;
	private Integer page = 0;
	private ArticleService articleService;
	// ���ɼ���Ŀ������
	private int lastVisibleIndex;
	private String tag = "HomeFragment";

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		View view = inflater.inflate(R.layout.home, container, false);
		articleService = new ArticleService(getActivity());
		init(view, inflater);
		initData();
		return view;
	}

	private void init(View view, LayoutInflater inflater) {
		lv = (ListView) view.findViewById(android.R.id.list);
		selectorDialog = ProgressDialog.show(getActivity(), null,
				"���ڼ��أ����Ժ�...", true, false);
		moreView = inflater.inflate(R.layout.moredata, null);
		bt = (Button) moreView.findViewById(R.id.bt_load);
		pg = (ProgressBar) moreView.findViewById(R.id.pg);
		initViewFilppper(lv, inflater, view);
		lv.addFooterView(moreView);
		lv.setOnScrollListener(this);
		articleList = new ArrayList<Article>();
		handler = new Handler() {
			public void handleMessage(Message msg) {
				selectorDialog.cancel();
				if (msg.what == 1) {
					// newsList = (List<News>) msg.obj;
					if (articleList.size() == 0) {
						articleList = (List<Article>) msg.obj;
						listViewAdapter = new ArticleListViewAdapter(
								getActivity(), articleList);
						lv.setAdapter(listViewAdapter);
					} else {
						articleList.addAll((List<Article>) msg.obj);
						listViewAdapter.notifyDataSetChanged();
					}
					bt.setVisibility(View.VISIBLE);// ��ť���ɼ�
					pg.setVisibility(View.GONE);// ������
				} else if (msg.what == -1) {
					UIHelper.ToastMessage(getActivity(), "û������");
					pg.setVisibility(View.GONE);// ������
					bt.setVisibility(View.GONE);// ��ť���ɼ�
				} else if (msg.what == -2) {
					pg.setVisibility(View.GONE);// ������
					bt.setVisibility(View.VISIBLE);// ��ť���ɼ�
					UIHelper.ToastMessage(getActivity(),
							R.string.xml_parser_failed);
				}
			}
		};
		bt.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				pg.setVisibility(View.VISIBLE);// ���������ɼ�
				bt.setVisibility(View.GONE);// ��ť���ɼ�
				initData();
			}
		});
	}

	@Override
	public void onScroll(AbsListView view, int firstVisibleItem,
			int visibleItemCount, int totalItemCount) {
		// �������ɼ���Ŀ������
		lastVisibleIndex = firstVisibleItem + visibleItemCount - 2;
		// ���е���Ŀ�Ѿ������������ȣ����Ƴ��ײ���View
	}

	@Override
	public void onScrollStateChanged(AbsListView view, int scrollState) {
		// �����ײ����Զ����أ��ж�listview�Ѿ�ֹͣ�������������ӵ���Ŀ����adapter����Ŀ
		if (scrollState == OnScrollListener.SCROLL_STATE_IDLE
				&& lastVisibleIndex == listViewAdapter.getCount()) {
			initData();
		}

	}
	
	private void initData() {
		selectorDialog.show();
		new Thread() {
			public void run() {
				Message msg = new Message();
				List<Article> list = ConnectServer.loadRecoArticles(page);
				if (list != null) {
					if (list.size() > 0) {
						msg.obj = list;
						msg.what = 1;
						page++;
					} else {
						msg.what = -1;
					}
				} else {
					msg.what = -1;
				}
				handler.sendMessage(msg);

			}
		}.start();
	}

	@Override
	public void onListItemClick(ListView l, View v, int position, long id) {
		// TODO Auto-generated method stub
		Log.i(tag, "article_id" + v.getId());
		Intent intent = new Intent(getActivity(), ArticleActivity.class);
		Bundle bundle = new Bundle();    
	    bundle.putInt(Constant.extra_article_id, v.getId());   
	    intent.putExtras(bundle);
		startActivity(intent);
	}

	/**
	 * �����Ƽ�λ
	 * 
	 * @param lv
	 */
	private void initViewFilppper(ListView lv, LayoutInflater inflater,
			View view) {
		LinearLayout listTop = (LinearLayout) inflater.inflate(
				R.layout.viewfillper, null);
		flipper = (ViewFlipper) listTop.findViewById(R.id.mflipper);
		Log.d("debug", flipper.getTop() + "");
		if (flipper != null) {
			flipper.setFlipInterval(1000*60);
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