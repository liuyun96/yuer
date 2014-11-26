package ${packageName}.action.bean;
// Generated from PowerDesigner file ,Written by lbj.
import java.util.Date;

/**
* ${name} 查询Bean
*/
public class ${className}SearchForm {
	<#list columns?values as column>
	<#if column.searchable>
	<#if column.displayType=='日期'>
	/**
	*${column.name}开始日期查询
	*/
	private ${column.javaType} ${column.javaName}Start;
	/**
	*${column.name}结束日期查询
	*/
	private ${column.javaType} ${column.javaName}End;
	<#else>
	/**
	*${column.name}
	*/
	private ${column.javaType} ${column.javaName};
	</#if>
	</#if>
	</#list>
		
	public ${className}SearchForm(){
	}
	<#list columns?values as column>
	<#if column.searchable>
	<#if column.displayType=='日期'>
	/**
	* 获取${column.name}开始日期
	*/
	public ${column.javaType} ${column.getterName}Start(){
		return ${column.javaName}Start;
	}
	/**
	* 设置${column.name}开始日期
	*/	
	public void ${column.setterName}Start(${column.javaType} ${column.javaName}Start){
		this.${column.javaName}Start = ${column.javaName}Start;
	} 
	/**
	* 获取${column.name}结束日期
	*/
	public ${column.javaType} ${column.getterName}End(){
		return ${column.javaName}End;
	}
	/**
	* 设置${column.name}结束日期
	*/	
	public void ${column.setterName}End(${column.javaType} ${column.javaName}End){
		this.${column.javaName}End = ${column.javaName}End;
	} 
	<#else>
	/**
	* 获取${column.name}
	*/
	public ${column.javaType} ${column.getterName}(){
		return ${column.javaName};
	}
	/**
	* 设置${column.name}
	*/	
	public void ${column.setterName}(${column.javaType} ${column.javaName}){
		this.${column.javaName} = ${column.javaName};
	} 
	</#if>
	</#if>
	</#list>
}