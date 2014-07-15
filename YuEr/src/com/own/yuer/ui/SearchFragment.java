package com.own.yuer.ui;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.own.yuer.R;

public class SearchFragment extends Fragment {

	// 确认按钮
	Button btn;
	View view;

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
		return view;

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
			//bundle.putString("searchText",textView.getText());
			intent.putExtras(bundle);
		}
		startActivity(intent);
	}

}
