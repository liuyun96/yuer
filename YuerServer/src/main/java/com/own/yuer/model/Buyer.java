package com.own.yuer.model;

// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;
import javax.persistence.*;
import java.util.*;

/**
 * 买家表
 */

@Entity
@Table(name = "BUYER")
public class Buyer implements Serializable {
	private static final long serialVersionUID = 19734336839L;

	/**
	 * 买家编号
	 */
	private Integer id;
	/**
	 * 身份
	 */
	private String identity;
	/**
	 * 手机号码
	 */
	private String mobile;
	/**
	 * 手机串号
	 */
	private String deviceId;
	/**
	 * 宝贝年龄
	 */
	private Integer age;
	/**
	 * 宝贝性别
	 */
	private String gender;
	/**
	 * 宝贝姓名
	 */
	private String name;
	/**
	 * 收货地址
	 */
	private String address;
	/**
	 * 支付宝账户
	 */
	private String alipayAccount;
	/**
	 * 微信账号
	 */
	private String weixinAccount;
	/**
	 * 城市
	 */
	private String city;
	/**
	 * 状态
	 */
	private Boolean status;
	/**
	 * 登入次数
	 */
	private Integer loginTimes;
	/**
	 * 创建时间
	 */
	private Date createTime;
	/**
	 * 最后登入时间
	 */
	private Date loginTime;

	public Buyer() {
	}

	/**
	 * 获取买家编号
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "BUYER_ID", nullable = false)
	public Integer getId() {
		return id;
	}

	/**
	 * 设置买家编号
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * 获取身份
	 */

	@Column(name = "IDENTITY", length = 4)
	public String getIdentity() {
		return identity;
	}

	/**
	 * 设置身份
	 */
	public void setIdentity(String identity) {
		this.identity = identity;
	}

	/**
	 * 获取手机号码
	 */

	@Column(name = "MOBILE", length = 11)
	public String getMobile() {
		return mobile;
	}

	/**
	 * 设置手机号码
	 */
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	/**
	 * 获取宝贝年龄
	 */

	@Column(name = "AGE")
	public Integer getAge() {
		return age;
	}

	/**
	 * 设置宝贝年龄
	 */
	public void setAge(Integer age) {
		this.age = age;
	}

	/**
	 * 获取宝贝性别
	 */

	@Column(name = "GENDER", length = 2)
	public String getGender() {
		return gender;
	}

	/**
	 * 设置宝贝性别
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}

	/**
	 * 获取宝贝姓名
	 */

	@Column(name = "NAME", length = 10)
	public String getName() {
		return name;
	}

	/**
	 * 设置宝贝姓名
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 获取收货地址
	 */

	@Column(name = "ADDRESS", length = 100)
	public String getAddress() {
		return address;
	}

	/**
	 * 设置收货地址
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * 获取支付宝账户
	 */

	@Column(name = "ALIPAY_ACCOUNT", length = 50)
	public String getAlipayAccount() {
		return alipayAccount;
	}

	/**
	 * 设置支付宝账户
	 */
	public void setAlipayAccount(String alipayAccount) {
		this.alipayAccount = alipayAccount;
	}

	/**
	 * 获取微信账号
	 */

	@Column(name = "WEIXIN_ACCOUNT", length = 50)
	public String getWeixinAccount() {
		return weixinAccount;
	}

	/**
	 * 设置微信账号
	 */
	public void setWeixinAccount(String weixinAccount) {
		this.weixinAccount = weixinAccount;
	}

	/**
	 * 获取城市
	 */

	@Column(name = "CITY", length = 10)
	public String getCity() {
		return city;
	}

	/**
	 * 设置城市
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * 获取状态
	 */

	@Column(name = "STATUS")
	public Boolean getStatus() {
		return status;
	}

	/**
	 * 设置状态
	 */
	public void setStatus(Boolean status) {
		this.status = status;
	}

	/**
	 * 获取登入次数
	 */

	@Column(name = "LOGIN_TIMES")
	public Integer getLoginTimes() {
		return loginTimes;
	}

	/**
	 * 设置登入次数
	 */
	public void setLoginTimes(Integer loginTimes) {
		this.loginTimes = loginTimes;
	}

	/**
	 * 获取创建时间
	 */
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATE_TIME")
	public Date getCreateTime() {
		return createTime;
	}

	/**
	 * 设置创建时间
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * 获取最后登入时间
	 */
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "LOGIN_TIME")
	public Date getLoginTime() {
		return loginTime;
	}

	/**
	 * 设置最后登入时间
	 */
	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	@Column(name = "device_id")
	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

}