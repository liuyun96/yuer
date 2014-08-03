package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.BuyerOrderItemMap;
import com.own.yuer.service.BuyerOrderItemMapService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class BuyerOrderItemMapAction extends ExtBaseAction {
	@Inject
	private BuyerOrderItemMapService buyerOrderItemMapService;
	@Inject 
	private BuyerOrderItemMap buyerOrderItemMap;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<BuyerOrderItemMap> buyerOrderItemMaps = buyerOrderItemMapService.findBuyerOrderItemMapByExample(buyerOrderItemMap, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("buyerOrderItemMaps", buyerOrderItemMaps);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			buyerOrderItemMap = buyerOrderItemMapService.getBuyerOrderItemMap(Integer.parseInt(id));
		return toJson(buyerOrderItemMap);
	}

	public String save() {
		buyerOrderItemMapService.save(buyerOrderItemMap);
		return toJson(null);
	}

	public String delete(String ids) {
		buyerOrderItemMapService.delete(ids);
		return toJson(null);
	}

	
}
