package com.own.yuer.bean;

public class Goods {

	/**
	 * ���
	 */
	private Integer id;
	private String title;// ������
	private String subhead;// ������
	private String img;// ͼƬ
	private String price;// ԭ��
	/**
	 * ������
	 */
	private String barginPrice;
	/**
	 * �ۿ�
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
