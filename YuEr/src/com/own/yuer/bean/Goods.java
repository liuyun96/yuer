package com.own.yuer.bean;

public class Goods {

	/**
	 * 编号
	 */
	private Integer id;
	private String title;// 主标题
	private String subhead;// 副标题
	private String img;// 图片
	private String price;// 原价
	/**
	 * 促销价
	 */
	private String barginPrice;
	/**
	 * 折扣
	 */
	private String discount;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSubhead() {
		return subhead;
	}

	public void setSubhead(String subhead) {
		this.subhead = subhead;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getBarginPrice() {
		return barginPrice;
	}

	public void setBarginPrice(String barginPrice) {
		this.barginPrice = barginPrice;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

}
