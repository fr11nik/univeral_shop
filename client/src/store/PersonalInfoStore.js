import { makeAutoObservable } from "mobx";

export default class PersonalInfoStore {
  constructor() {
    // (this.lastname = ""),
    //   (this.firstname = ""),
    //   (this.patronymic = ""),
    //   (this.phoneNumber = "");
    this.personalInfo = {};
    makeAutoObservable(this);
  }
  setPersonalInfo(value) {
    this.personalInfo = value;
  }
  getPersonalInfo(value) {
    return this.personalInfo;
  }
  // setLastName(value) {
  //   this.lastName = value;
  // }

  // getLastName() {
  //   return this.lastName;
  // }

  // setFirstName(value) {
  //   this.firstName = value;
  // }

  // getFirstName() {
  //   return this.firstName;
  // }

  // setPatronymic(value) {
  //   this.patronymic = value;
  // }

  // getPatronymic() {
  //   return this.patronymic;
  // }

  // setPhoneNumber(value) {
  //   this.phoneNumber = value;
  // }

  // getPhoneNumber() {
  //   return this.phoneNumber;
  // }
}
