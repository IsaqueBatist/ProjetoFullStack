package com.abutua.project_backend.models;

public class Category {
  private int id;
  private String name;


   //Métodos Construtures
  public Category(int id, String name){
    this.id = id;
    this.name = name;
  }
  public Category(){
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getname() {
    return name;
  }

  public void setname(String name) {
    this.name = name;
  }

  
  
}
