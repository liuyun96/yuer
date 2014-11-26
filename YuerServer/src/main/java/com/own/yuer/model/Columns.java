package com.own.yuer.model;

// Generated from PowerDesigner file ,Written by lbj.

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 栏目表
 */

@Entity
@Table(name = "COLUMNS")
public class Columns implements Serializable {
	private static final long serialVersionUID = 15318082393L;

	/**
	 * 栏目编号
	 */
	private Integer id;
	/**
	 * 状态
	 */
	private Boolean status;

	private String columnName;

	private Integer position;

	public Columns() {
	}

	/**
	 * 获取栏目编号
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "COLUMN_ID", nullable = false)
	public Integer getId() {
		return id;
	}

	/**
	 * 设置栏目编号
	 */
	public void setId(Integer id) {
		this.id = id;
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

	@Column(name = "column_name")
	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	@Column(name = "position")
	public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}

}