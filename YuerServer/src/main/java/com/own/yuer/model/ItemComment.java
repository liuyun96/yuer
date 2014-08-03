package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 商品评价表 
*/

@Entity
@Table(name="ITEM_COMMENT")
public class ItemComment implements Serializable {
	private static final long serialVersionUID = 11567733247L;

	/**
	*评价编号
	*/
	private Integer id;
	/**
	*商品编号
	*/
	private Items items;
	/**
	*评价内容
	*/
	private String content;
		
	public ItemComment(){
	}
	/**
	* 获取评价编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="COM_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置评价编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取商品编号
	*/
	@ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "ITEM_ID")
	public Items getItems(){
		return items;
	}
	/**
	* 设置商品编号
	*/	
	public void setItems(Items items){
		this.items = items;
	} 
	/**
	* 获取评价内容
	*/
	
	@Column(name="CONTENT",length=500)
	public String getContent(){
		return content;
	}
	/**
	* 设置评价内容
	*/	
	public void setContent(String content){
		this.content = content;
	} 
	
}