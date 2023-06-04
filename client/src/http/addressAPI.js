import { $authHost } from "./index";
export const fetchAddress = async () => {
  const { data } = await $authHost.get("/api/address/current/");
  return data;
};
export const updateAddress = async (address) => {
  const { data } = await $authHost.put("api/address/", address);
  return data;
};
