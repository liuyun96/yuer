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
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.own.yuer.R;
import com.own.yuer.bean.Goods;
import com.own.yuer.bean.URLs;
import com.own.yuer.common.BitmapManager;
import com.own.yuer.common.StringUtils;

public class TuanListViewAdapter extends BaseAdapter {
	LayoutInflater inflater;
	// 定义Context
	private ViewHolder holder;
	List<Goods> list = new ArrayList<Goods>();
	private BitmapManager bmpManager;

	public TuanListViewAdapter(Activity activity, List<Goods> listViewList) {
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
			convertView = inflater.inflate(R.layout.tuan_item, null);
			holder.title = (TextView) convertView
					.findViewById(R.id.tuan_title);
			holder.subhead = (TextView) convertView
					.findViewById(R.id.tuan_subhead);
			holder.barginPrice = (TextView) convertView
					.findViewById(R.id.tuan_barginPrice);
			holder.discount = (TextView) convertView
					.findViewById(R.id.tuan_discount);
			holder.price = (TextView) convertView.findViewById(R.id.tuan_price);
			holder.img = (ImageView) convertView.findViewById(R.id.tuan_img);
			
			holder.layout = (RelativeLayout)convertView.findViewById(R.id.tuan_layout);
			
			convertView.setTag(holder);
		} else {
			// 优化了ui 避免加载过得的view
			holder = (ViewHolder) convertView.getTag();
		}
		holder.title.setText(list.get(position).getTitle().toString());
		holder.subhead.setText(list.get(position).getSubhead().toString());
		holder.barginPrice.setText(list.get(position).getBarginPrice()
				.toString());
		holder.discount.setText(list.get(position).getDiscount().toString());
		holder.price.setText(list.get(position).getPrice().toString());
		String imgURL = list.get(position).getImg();
		if (imgURL.endsWith("portrait.gif") || StringUtils.isEmpty(imgURL)) {
			holder.img.setImageResource(R.drawable.umeng_socialize_share_pic);
		} else {
			if (!imgURL.contains("http")) {
				imgURL = URLs.HTTP + URLs.HOST + "/" + imgURL;
			}
			bmpManager.loadBitmap(imgURL, holder.img);
		}
		// 设置id
		//convertView.setId(list.get(position).getId());
		//holder.layout.getLayoutParams().height = holder.img.getMeasuredHeight();
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
		TextView subhead;
		TextView price;
		TextView barginPrice;
		TextView discount;
		ImageView img;
		RelativeLayout layout;
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return list.size();
	}

}
