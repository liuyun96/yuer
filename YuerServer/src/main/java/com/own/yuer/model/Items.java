package com.own.yuer.model;
// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
* 商品表 
*/

@Entity
@Table(name="ITEMS")
public class Items implements Serializable {
	private static final long serialVersionUID = 17713264224L;

	/**
	*商品编号
	*/
	private Integer id;
	/**
	*商品名称
	*/
	private String name;
	/**
	*原价
	*/
	private Double price;
	/**
	*现价
	*/
	private Double currentPrice;
	/**
	*广告标题
	*/
	private String title;
	/**
	*副标题
	*/
	private String subhead;
	/**
	*商品宣传文字
	*/
	private String detail;
	/**
	*商品图片
	*/
	private String img;
	/**
	*状态
	*/
	private Boolean status;
	/**
	*点击量
	*/
	private Integer clickNum;
	/**
	*购买量
	*/
	private Integer orderNum;
	/**
	*创建时间
	*/
	private Date createTime;
	/**
	*修改时间
	*/
	private Date updateTime;
	/**
	* 关联的商品评价表集合
	*/
	private Set<ItemComment> itemComments;
	/**
	* 关联的订单商品关联表集合
	*/
	private Set<BuyerOrderItemMap> buyerOrderItemMaps;
	/**
	* 关联的我的收藏集合
	*/
	private Set<MyFavorite> myFavorites;
		
	public Items(){
	}
	/**
	* 获取商品编号
	*/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@Column(name="ITEM_ID",nullable=false)
	public Integer getId(){
		return id;
	}
	/**
	* 设置商品编号
	*/	
	public void setId(Integer id){
		this.id = id;
	} 
	/**
	* 获取商品名称
	*/
	
	@Column(name="NAME",length=100)
	public String getName(){
		return name;
	}
	/**
	* 设置商品名称
	*/	
	public void setName(String name){
		this.name = name;
	} 
	/**
	* 获取原价
	*/
	
	@Column(name="PRICE")
	public Double getPrice(){
		return price;
	}
	/**
	* 设置原价
	*/	
	public void setPrice(Double price){
		this.price = price;
	} 
	/**
	* 获取现价
	*/
	
	@Column(name="CURRENT_PRICE")
	public Double getCurrentPrice(){
		return currentPrice;
	}
	/**
	* 设置现价
	*/	
	public void setCurrentPrice(Double currentPrice){
		this.currentPrice = currentPrice;
	} 
	/**
	* 获取广告标题
	*/
	
	@Column(name="TITLE",length=100)
	public String getTitle(){
		return title;
	}
	/**
	* 设置广告标题
	*/	
	public void setTitle(String title){
		this.title = title;
	} 
	/**
	* 获取副标题
	*/
	
	@Column(name="SUBHEAD",length=200)
	public String getSubhead(){
		return subhead;
	}
	/**
	* 设置副标题
	*/	
	public void setSubhead(String subhead){
		this.subhead = subhead;
	} 
	/**
	* 获取商品宣传文字
	*/
	
	@Column(name="DETAIL")
	public String getDetail(){
		return detail;
	}
	/**
	* 设置商品宣传文字
	*/	
	public void setDetail(String detail){
		this.detail = detail;
	} 
	/**
	* 获取商品图片
	*/
	
	@Column(name="IMG",length=100)
	public String getImg(){
		return img;
	}
	/**
	* 设置商品图片
	*/	
	public void setImg(String img){
		this.img = img;
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
	/**
	* 获取点击量
	*/
	
	@Column(name="CLICK_NUM")
	public Integer getClickNum(){
		return clickNum;
	}
	/**
	* 设置点击量
	*/	
	public void setClickNum(Integer clickNum){
		this.clickNum = clickNum;
	} 
	/**
	* 获取购买量
	*/
	
	@Column(name="ORDER_NUM")
	public Integer getOrderNum(){
		return orderNum;
	}
	/**
	* 设置购买量
	*/	
	public void setOrderNum(Integer orderNum){
		this.orderNum = orderNum;
	} 
	/**
	* 获取创建时间
	*/
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATE_TIME")
	public Date getCreateTime(){
		return createTime;
	}
	/**
	* 设置创建时间
	*/	
	public void setCreateTime(Date createTime){
		this.createTime = createTime;
	} 
	/**
	* 获取修改时间
	*/
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="UPDATE_TIME")
	public Date getUpdateTime(){
		return updateTime;
	}
	/**
	* 设置修改时间
	*/	
	public void setUpdateTime(Date updateTime){
		this.updateTime = updateTime;
	} 
	
	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, targetEntity = ItemComment.class, mappedBy = "items")
	public Set<ItemComment> getItemComments(){
		return this.itemComments;
	}
	public void setItemComments(Set<ItemComment> itemComments){
		this.itemComments = itemComments;
	}
	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, targetEntity = BuyerOrderItemMap.class, mappedBy = "items")
	public Set<BuyerOrderItemMap> getBuyerOrderItemMaps(){
		return this.buyerOrderItemMaps;
	}
	public void setBuyerOrderItemMaps(Set<BuyerOrderItemMap> buyerOrderItemMaps){
		this.buyerOrderItemMaps = buyerOrderItemMaps;
	}
	@OneToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY, targetEntity = MyFavorite.class, mappedBy = "items")
	public Set<MyFavorite> getMyFavorites(){
		return this.myFavorites;
	}
	public void setMyFavorites(Set<MyFavorite> myFavorites){
		this.myFavorites = myFavorites;
	}
}