package ${packageName}.action;

import java.util.Collection;
import java.util.HashMap;

import ${packageName}.model.${className};
import ${packageName}.service.${className}Service;
import cn.quickj.extui.action.ExtBaseAction;
import cn.quickj.hibernate.Paginate;

import com.google.inject.Inject;

public class ${className}Action extends ExtBaseAction {
	@Inject
	private ${className}Service ${javaName}Service;
	@Inject 
	private ${className} ${javaName};
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String list() {
		Paginate paginate = new Paginate(start, limit);
		Collection<${className}> ${javaName}s = ${javaName}Service.find${className}ByExample(${javaName}, paginate, sort, dir);
		HashMap data = new HashMap();
		data.put("total", paginate.getTotal());
		data.put("${javaName}s", ${javaName}s);
		return toJson(data);
	}

	public String load(String id) {
		if(id!=null)
			${javaName} = ${javaName}Service.get${className}(Integer.parseInt(id));
		return toJson(${javaName});
	}

	public String save() {
		${javaName}Service.save(${javaName});
		return toJson(null);
	}

	public String delete(String ids) {
		${javaName}Service.delete(ids);
		return toJson(null);
	}

	
}
