package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 买家搜索记录 
*/

@Entity
@Table(name="BUYER_SEARCH")
public class BuyerSearch implements Serializable {
	private static final long serialVersionUID = 15627599187L;

	/**
	*搜索编号
	*/
	private Integer id;
	/**
	*买家编号
	*/
	private Buyer buyer;
	/**
	*搜索关键字
	*/
	private String searchKey;
		
	public BuyerSearch(){
	}
	/**
	* 获取搜索编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="SEARCH_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置搜索编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取买家编号
	*/
	@ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "BUYER_ID")
	public Buyer getBuyer(){
		return buyer;
	}
	/**
	* 设置买家编号
	*/	
	public void setBuyer(Buyer buyer){
		this.buyer = buyer;
	} 
	/**
	* 获取搜索关键字
	*/
	
	@Column(name="SEARCH_KEY",length=30)
	public String getSearchKey(){
		return searchKey;
	}
	/**
	* 设置搜索关键字
	*/	
	public void setSearchKey(String searchKey){
		this.searchKey = searchKey;
	} 
	
}