package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.MyFavorite;
import com.own.yuer.service.MyFavoriteService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class MyFavoriteAction extends ExtBaseAction {
	@Inject
	private MyFavoriteService myFavoriteService;
	@Inject 
	private MyFavorite myFavorite;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<MyFavorite> myFavorites = myFavoriteService.findMyFavoriteByExample(myFavorite, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("myFavorites", myFavorites);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			myFavorite = myFavoriteService.getMyFavorite(Integer.parseInt(id));
		return toJson(myFavorite);
	}

	public String save() {
		myFavoriteService.save(myFavorite);
		return toJson(null);
	}

	public String delete(String ids) {
		myFavoriteService.delete(ids);
		return toJson(null);
	}

	
}
