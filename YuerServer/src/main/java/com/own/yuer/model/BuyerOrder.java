package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 买家购买记录 
*/

@Entity
@Table(name="BUYER_ORDER")
public class BuyerOrder implements Serializable {
	private static final long serialVersionUID = 12767884128L;

	/**
	*购买编号
	*/
	private Integer id;
	/**
	*买家编号
	*/
	private Buyer buyer;
	/**
	*购买的时间
	*/
	private Date orderTime;
	/**
	*状态
	*/
	private Boolean status;
	/**
	* 关联的订单商品关联表集合
	*/
	private Set<BuyerOrderItemMap> buyerOrderItemMaps;
		
	public BuyerOrder(){
	}
	/**
	* 获取购买编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="ORDER_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置购买编号
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
	* 获取购买的时间
	*/
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="ORDER_TIME")
	public Date getOrderTime(){
		return orderTime;
	}
	/**
	* 设置购买的时间
	*/	
	public void setOrderTime(Date orderTime){
		this.orderTime = orderTime;
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
	
	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, targetEntity = BuyerOrderItemMap.class, mappedBy = "buyerOrder")
	public Set<BuyerOrderItemMap> getBuyerOrderItemMaps(){
		return this.buyerOrderItemMaps;
	}
	public void setBuyerOrderItemMaps(Set<BuyerOrderItemMap> buyerOrderItemMaps){
		this.buyerOrderItemMaps = buyerOrderItemMaps;
	}
}