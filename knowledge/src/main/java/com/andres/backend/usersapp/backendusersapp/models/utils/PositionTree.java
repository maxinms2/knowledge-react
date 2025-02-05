package com.andres.backend.usersapp.backendusersapp.models.utils;

public class PositionTree {
	private Integer deep;
	private Long id;
	
	
	public PositionTree(Integer deep, Long id) {
		this.deep = deep;
		this.id = id;
	}
	public Integer getDeep() {
		return deep;
	}
	public void setDeep(Integer deep) {
		this.deep = deep;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@Override
	public String toString() {
		return deep + "-" + id ;
	}
	
	
}
