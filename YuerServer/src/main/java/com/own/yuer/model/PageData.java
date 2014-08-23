package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 页面数据 
*/

@Entity
@Table(name="PAGE_DATA")
public class PageData implements Serializable {
	private static final long serialVersionUID = 15903103675L;

	/**
	*编号
	*/
	private Integer id;
	/**
	*字典id
	*/
	private Integer dictId;
	/**
	*标题
	*/
	private String title;
	/**
	*链接
	*/
	private String url;
	/**
	*图片
	*/
	private String img;
	/**
	*位置
	*/
	private Boolean position;
	/**
	*状态
	*/
	private Boolean status;
		
	public PageData(){
	}
	/**
	* 获取编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取字典id
	*/
	
	@Column(name="DICT_ID")
	public Integer getDictId(){
		return dictId;
	}
	/**
	* 设置字典id
	*/	
	public void setDictId(Integer dictId){
		this.dictId = dictId;
	} 
	/**
	* 获取标题
	*/
	
	@Column(name="TITLE",length=100)
	public String getTitle(){
		return title;
	}
	/**
	* 设置标题
	*/	
	public void setTitle(String title){
		this.title = title;
	} 
	/**
	* 获取链接
	*/
	
	@Column(name="URL",length=150)
	public String getUrl(){
		return url;
	}
	/**
	* 设置链接
	*/	
	public void setUrl(String url){
		this.url = url;
	} 
	/**
	* 获取图片
	*/
	
	@Column(name="IMG",length=100)
	public String getImg(){
		return img;
	}
	/**
	* 设置图片
	*/	
	public void setImg(String img){
		this.img = img;
	} 
	/**
	* 获取位置
	*/
	
	@Column(name="POSITION")
	public Boolean getPosition(){
		return position;
	}
	/**
	* 设置位置
	*/	
	public void setPosition(Boolean position){
		this.position = position;
	} 
	/**
	* 获取状态
	*/
	
	@Column(name="STATUS")
	public Boolean getStatus(){
		return status;
	}
	/**
	* 设置状态
	*/	
	public void setStatus(Boolean status){
		this.status = status;
	} 
	
}