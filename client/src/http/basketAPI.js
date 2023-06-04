import { $authHost } from "./index";

export const createBasketDevice = async (deviceData) => {
  deviceData.amount = deviceData.amount || 1;

  const { data } = await $authHost.post("api/basket/device/", deviceData);
  return data;
};
export const deleteBasketDevice = async (id) => {
  return await $authHost.delete("api/basket/device/", { data: { id: id } });
};
