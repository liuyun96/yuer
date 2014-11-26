package com.own.yuer.ui;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.own.yuer.R;

public class SearchDetailActivity extends BaseActivity {

	// »∑»œ∞¥≈•
	Button btn;
	TextView searchTextView;
	ImageView backView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.search_detail);

		if (getIntent().getExtras() != null) {
			CharSequence searchText = (CharSequence) getIntent().getExtras().get(
					"searchText");
			if (searchText != null) {
				searchTextView = (TextView) findViewById(R.id.searchText);
				searchTextView.setText(searchText);
			}
		}

	}

	public void backSearch(View view) {
		this.finish();
	}

}
