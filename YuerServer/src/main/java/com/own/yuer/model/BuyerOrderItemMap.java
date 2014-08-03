package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 订单商品关联表 
*/

@Entity
@Table(name="BUYER_ORDER_ITEM_MAP")
public class BuyerOrderItemMap implements Serializable {
	private static final long serialVersionUID = 12277415287L;

	/**
	*关联编号
	*/
	private Integer id;
	/**
	*购买编号
	*/
	private BuyerOrder buyerOrder;
	/**
	*商品编号
	*/
	private Items items;
		
	public BuyerOrderItemMap(){
	}
	/**
	* 获取关联编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="MAP_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置关联编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取购买编号
	*/
	@ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST })
	@JoinColumn(name = "ORDER_ID")
	public BuyerOrder getBuyerOrder(){
		return buyerOrder;
	}
	/**
	* 设置购买编号
	*/	
	public void setBuyerOrder(BuyerOrder buyerOrder){
		this.buyerOrder = buyerOrder;
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
	
}