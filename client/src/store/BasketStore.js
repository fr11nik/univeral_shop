import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._devices = [];
    this._totalCount = 0;
    makeAutoObservable(this);
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }

  get devices() {
    return this._devices;
  }

  get totalCount() {
    return this._totalCount;
  }
}
