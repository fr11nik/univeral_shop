import { makeAutoObservable } from "mobx";
import jwtDecode from "jwt-decode";
export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  get isAdmin() {
    return jwtDecode(localStorage.getItem("token")).role === "ADMIN";
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
