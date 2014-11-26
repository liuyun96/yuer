package com.own.yuer.adapter;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.graphics.BitmapFactory;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.own.yuer.R;
import com.own.yuer.bean.Article;
import com.own.yuer.bean.URLs;
import com.own.yuer.common.BitmapManager;
import com.own.yuer.common.StringUtils;

public class ArticleListViewAdapter extends BaseAdapter {
	LayoutInflater inflater;
	// 定义Context
	private ViewHolder holder;
	List<Article> list = new ArrayList<Article>();
	private BitmapManager bmpManager;
	public ArticleListViewAdapter(Activity activity, List<Article> listViewList) {
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

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		// TODO Auto-generated method stub
		if (convertView == null) {
			holder = new ViewHolder();
			convertView = inflater.inflate(R.layout.article_item, null);
			holder.title = (TextView) convertView
					.findViewById(R.id.article_title);
			holder.img = (ImageView) convertView.findViewById(R.id.article_img);
			holder.likeCount = (TextView) convertView
					.findViewById(R.id.article_likeCount);
			holder.readCount = (TextView) convertView
					.findViewById(R.id.article_readCount);
			convertView.setTag(holder);
		} else {
			// 优化了ui 避免加载过得的view
			holder = (ViewHolder) convertView.getTag();
		}
		holder.title.setText(list.get(position).getTitle());
		holder.likeCount.setText(list.get(position).getLikeCount().toString());
		holder.readCount.setText(list.get(position).getReadCount().toString());
		String imgURL = list.get(position).getImg();
		if (imgURL.endsWith("portrait.gif") || StringUtils.isEmpty(imgURL)) {
			holder.img.setImageResource(R.drawable.umeng_socialize_share_pic);
		} else {
			if (!imgURL.contains("http")) {
				imgURL = URLs.HTTP + URLs.HOST + "/" + imgURL;
			}
			bmpManager.loadBitmap(imgURL, holder.img);
		}
		convertView.setId(list.get(position).getId());
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
		TextView likeCount;
		TextView readCount;
		ImageView img;
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return list.size();
	}

}
