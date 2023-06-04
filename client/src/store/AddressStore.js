import { makeAutoObservable } from "mobx";

export default class AddressStore {
  constructor() {
    // (this.city = ""),
    //   (this.street = ""),
    //   (this.house = ""),
    //   (this.entrance = ""),
    //   (this.floor = ""),
    //   (this.apartment = ""),
    //   (this.comment = ""),
    this.address = {};
    makeAutoObservable(this);
  }
  getAddress() {
    return this.address;
  }
  setAddress(value) {
    this.address = value;
  }
  // setCity(value) {
  //   this.city = value;
  // }

  // getCity() {
  //   return this.city;
  // }

  // setStreet(value) {
  //   this.street = value;
  // }

  // getStreet() {
  //   return this.street;
  // }

  // setHouse(value) {
  //   this.house = value;
  // }

  // getHouse() {
  //   return this.house;
  // }

  // setEntrance(value) {
  //   this.entrance = value;
  // }

  // getEntrance() {
  //   return this.entrance;
  // }

  // setFloor(value) {
  //   this.floor = value;
  // }

  // getFloor() {
  //   return this.floor;
  // }

  // setApartment(value) {
  //   this.apartment = value;
  // }

  // getApartment() {
  //   return this.apartment;
  // }

  // setComment(value) {
  //   this.comment = value;
  // }

  // getComment() {
  //   return this.comment;
  // }
}
