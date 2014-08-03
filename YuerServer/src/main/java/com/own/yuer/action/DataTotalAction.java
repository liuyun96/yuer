package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.DataTotal;
import com.own.yuer.service.DataTotalService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class DataTotalAction extends ExtBaseAction {
	@Inject
	private DataTotalService dataTotalService;
	@Inject 
	private DataTotal dataTotal;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<DataTotal> dataTotals = dataTotalService.findDataTotalByExample(dataTotal, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("dataTotals", dataTotals);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			dataTotal = dataTotalService.getDataTotal(Integer.parseInt(id));
		return toJson(dataTotal);
	}

	public String save() {
		dataTotalService.save(dataTotal);
		return toJson(null);
	}

	public String delete(String ids) {
		dataTotalService.delete(ids);
		return toJson(null);
	}

	
}
