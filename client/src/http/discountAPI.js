import { $authHost } from "./index";

export const createDiscountDevice = async ({ deviceId, discountSize }) => {
  const { data } = await $authHost.post("api/discount/", {
    deviceId,
    discountSize,
  });
  return data;
};
export const deleteDiscountDevice = async (deviceId) => {
  await $authHost.delete("api/discount/", { data: deviceId });
};
