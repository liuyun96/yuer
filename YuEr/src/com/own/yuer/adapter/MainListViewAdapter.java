package com.own.yuer.adapter;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.Context;
import android.graphics.BitmapFactory;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.own.yuer.R;
import com.own.yuer.bean.News;
import com.own.yuer.bean.URLs;
import com.own.yuer.common.BitmapManager;
import com.own.yuer.common.StringUtils;

public class MainListViewAdapter extends BaseAdapter {
	LayoutInflater inflater;
	// 定义Context
	private Context mContext;
	private ViewHolder holder;
	private int clickTemp = -1;
	List<News> list = new ArrayList<News>();
	private BitmapManager bmpManager;

	public MainListViewAdapter(Activity activity, List<News> listViewList) {
		inflater = activity.getLayoutInflater();
		list = listViewList;
		this.bmpManager = new BitmapManager(BitmapFactory.decodeResource(
				activity.getResources(), R.drawable.umeng_socialize_share_pic));
	}

	public Object getItem(int position) {
		return position;
	}

	public long getItemId(int position) {
		return position;
	}

	public void setSeclection(int position) {
		clickTemp = position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		// TODO Auto-generated method stub
		if (convertView == null) {
			holder = new ViewHolder();
			convertView = inflater.inflate(R.layout.listview_item, null);
			holder.title = (TextView) convertView
					.findViewById(R.id.textview_home_listview_title);
			holder.time = (TextView) convertView
					.findViewById(R.id.textview_home_listview_time);
			holder.img = (ImageView) convertView
					.findViewById(R.id.imageview_home_listview_thumb);
			convertView.setTag(holder);
		} else {
			// 优化了ui 避免加载过得的view
			holder = (ViewHolder) convertView.getTag();
		}
		holder.title.setText(list.get(position).getTitle());
		holder.time.setText(list.get(position).getPublishTime());

		String imgURL = list.get(position).getFirstPicUrl();
		if (imgURL.endsWith("portrait.gif") || StringUtils.isEmpty(imgURL)) {
			holder.img.setImageResource(R.drawable.umeng_socialize_share_pic);
		} else {
			if (!imgURL.contains("http")) {
				imgURL = URLs.HTTP + URLs.HOST + "/" + imgURL;
			}
			bmpManager.loadBitmap(imgURL, holder.img);
		}
		return convertView;
	}

	/**
	 * 引入一个新的类 存放已经加载过的 view
	 * 
	 * @author Administrator
	 * 
	 */
	private class ViewHolder {
		TextView title;
		TextView time;
		ImageView img;
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return list.size();
	}

}
