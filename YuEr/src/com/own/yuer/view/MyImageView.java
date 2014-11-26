package com.own.yuer.view;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.own.yuer.R;

public class MyImageView extends View {

	View view;
	ImageView img;
	TextView title;
	int ID;

	public MyImageView(Context context) {
		super(context);
		LayoutInflater inflater = (LayoutInflater) context
				.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		view = inflater.inflate(R.layout.myimage, null);
		img = (ImageView) view.findViewById(R.id.myimg);
		title = (TextView) view.findViewById(R.id.mytitle);
	}

	public View getView() {
		return view;
	}

	public void setImg(int id) {
		img.setImageResource(id);
	}

	public void setImg(Drawable d) {

		img.setImageDrawable(d);
	}

	public void setTitle(String title) {
		this.title.setText(title);
	}

	public void setId(int id) {
		ID = id;
	}

	public int getId() {
		return ID;
	}
}
