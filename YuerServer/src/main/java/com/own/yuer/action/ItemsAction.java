package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.Items;
import com.own.yuer.service.ItemsService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class ItemsAction extends ExtBaseAction {
	@Inject
	private ItemsService itemsService;
	@Inject 
	private Items items;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<Items> itemss = itemsService.findItemsByExample(items, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("itemss", itemss);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			items = itemsService.getItems(Integer.parseInt(id));
		return toJson(items);
	}

	public String save() {
		itemsService.save(items);
		return toJson(null);
	}

	public String delete(String ids) {
		itemsService.delete(ids);
		return toJson(null);
	}

	
}
