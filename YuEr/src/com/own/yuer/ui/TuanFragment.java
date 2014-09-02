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
import android.widget.ListView;
import android.widget.ProgressBar;

import com.own.yuer.R;
import com.own.yuer.adapter.TuanListViewAdapter;
import com.own.yuer.bean.Goods;
import com.own.yuer.common.UIHelper;

public class TuanFragment extends ListFragment implements OnScrollListener {

	private ListView lv;
	// ListView�ײ�View
	private View moreView;
	// ListView��Adapter
	private Button bt;
	private ProgressBar pg;
	private Handler handler;
	private List<Goods> articleList;
	// �ڶ���ui
	private TuanListViewAdapter listViewAdapter;
	private ProgressDialog selectorDialog;

	String tag = "TuanFragment";

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		View view = inflater.inflate(R.layout.tuan_fragment, container, false);
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
		lv.addFooterView(moreView);
		lv.setOnScrollListener(this);
		articleList = new ArrayList<Goods>();
		handler = new Handler() {
			public void handleMessage(Message msg) {
				selectorDialog.cancel();
				if (msg.what == 1) {
					// newsList = (List<News>) msg.obj;
					if (articleList.size() == 0) {
						articleList = (List<Goods>) msg.obj;
						listViewAdapter = new TuanListViewAdapter(
								getActivity(), articleList);
						lv.setAdapter(listViewAdapter);
					} else {
						articleList.addAll((List<Goods>) msg.obj);
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

	private void initData() {
		selectorDialog.show();
		new Thread() {
			public void run() {
				Message msg = new Message();
				List<Goods> list = new ArrayList<Goods>();
				for (int i = 0; i < 3; i++) {
					Goods goods = new Goods();
					goods.setId(i);
					goods.setTitle("��Ӥ");
					goods.setSubhead("���������� �ϴ�󷢵ķ������ɰ����򰮷谮�ķ����Ǵ�������");
					goods.setBarginPrice("��36");
					goods.setDiscount("7.5��");
					goods.setPrice("ԭ��:48");
					goods.setImg("http://img04.taobaocdn.com/imgextra/T1hD7gFpldXXb1upjX.jpg_400x400");
					list.add(goods);
				}
				msg.what = 1;
				msg.obj = list;
				handler.sendMessage(msg);
			}
		}.start();
	}

	@Override
	public void onListItemClick(ListView l, View v, int position, long id) {
		// TODO Auto-generated method stub
		Log.i(tag, "goods_id" + id);
		Intent intent = new Intent(getActivity(), TuanActivity.class);
		startActivity(intent);
	}

	@Override
	public void onScroll(AbsListView arg0, int arg1, int arg2, int arg3) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onScrollStateChanged(AbsListView arg0, int arg1) {
		// TODO Auto-generated method stub

	}

}
