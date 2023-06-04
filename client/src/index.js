import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import AddressStore from "./store/AddressStore";
import PersonalInfoStore from "./store/PersonalInfoStore";
export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
      address: new AddressStore(),
      personalInfo: new PersonalInfoStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
