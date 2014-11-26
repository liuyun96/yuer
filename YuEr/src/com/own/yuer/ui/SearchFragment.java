package com.own.yuer.ui;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import com.own.yuer.R;
import com.own.yuer.util.Constant;

public class SearchFragment extends Fragment {

	// 确认按钮
	Button btn;
	View view;
	// ListView的Adapter
	private SimpleAdapter navAdapter;
	private ListView nav_list;
	ArrayList<HashMap<String, Object>> list;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {
		// TODO Auto-generated method stub

		view = inflater.inflate(R.layout.search_fragment, container, false);
		btn = (Button) view.findViewById(R.id.searchBtn);
		btn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View arg0) {
				// TODO Auto-generated method stub
				clickSearch(view);
			}
		});
		initNav(view);
		return view;

	}

	private void initNav(View view) {
		nav_list = (ListView) view.findViewById(R.id.nav_list);
		list = getList("备 孕");
		navAdapter = new SimpleAdapter(getActivity(), list,
				R.layout.search_navigation, new String[] { "img", "text" },
				new int[] { R.id.search_love_img, R.id.search_love_text });
		nav_list.setAdapter(navAdapter);
		nav_list.setOnItemClickListener(new OnItemClickListener() {
			@Override
			@SuppressLint("ResourceAsColor")
			public void onItemClick(AdapterView<?> arg0, View arg1, int arg2,
					long arg3) {
				/*ImageView img = (ImageView) arg1
						.findViewById(R.id.search_love_img);
				img.setImageResource(R.drawable.love_red);
				TextView text = (TextView) arg1
						.findViewById(R.id.search_love_text);
				text.setTextColor(R.color.red);*/
				// HashMap<String, Object> map = list.get(arg2);
				// list = getList(map.get("text").toString());
				// navAdapter.notifyDataSetChanged();// 通知listView刷新数据
			}
		});
	}

	private ArrayList<HashMap<String, Object>> getList(String cate) {
		ArrayList<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
		for (String text : Constant.cate) {
			HashMap<String, Object> map = new HashMap<String, Object>();
			if (text.equals(cate)) {
				map.put("img", R.drawable.love_red);
				map.put("text", text);
			} else {
				map.put("img", R.drawable.love_gray);
				map.put("text", text);
			}
			list.add(map);
		}
		return list;
	}

	/**
	 * 点确定搜索
	 * 
	 * @param view
	 */
	public void clickSearch(View view) {
		TextView textView = (TextView) view.findViewById(R.id.searchText);
		// 确认按钮隐藏
		Intent intent = new Intent(getActivity(), SearchDetailActivity.class);
		if (textView != null) {
			Bundle bundle = new Bundle();
			bundle.putCharSequence("searchText", textView.getText());
			// bundle.putString("searchText",textView.getText());
			intent.putExtras(bundle);
		}
		startActivity(intent);
	}

}
