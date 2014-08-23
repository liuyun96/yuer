package com.own.yuer.action;

import java.util.Collection;
import java.util.HashMap;

import com.own.yuer.model.Columns;
import com.own.yuer.service.ColumnsService;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class ColumnsAction extends ExtBaseAction {
	@Inject
	private ColumnsService columnsService;
	@Inject 
	private Columns columns;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<Columns> columnss = columnsService.findColumnsByExample(columns, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("columnss", columnss);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			columns = columnsService.getColumns(Integer.parseInt(id));
		return toJson(columns);
	}

	public String save() {
		columnsService.save(columns);
		return toJson(null);
	}

	public String delete(String ids) {
		columnsService.delete(ids);
		return toJson(null);
	}

	
}
