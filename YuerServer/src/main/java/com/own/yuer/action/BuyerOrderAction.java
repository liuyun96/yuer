package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.BuyerOrder;
import com.own.yuer.service.BuyerOrderService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class BuyerOrderAction extends ExtBaseAction {
	@Inject
	private BuyerOrderService buyerOrderService;
	@Inject 
	private BuyerOrder buyerOrder;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<BuyerOrder> buyerOrders = buyerOrderService.findBuyerOrderByExample(buyerOrder, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("buyerOrders", buyerOrders);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			buyerOrder = buyerOrderService.getBuyerOrder(Integer.parseInt(id));
		return toJson(buyerOrder);
	}

	public String save() {
		buyerOrderService.save(buyerOrder);
		return toJson(null);
	}

	public String delete(String ids) {
		buyerOrderService.delete(ids);
		return toJson(null);
	}

	
}
