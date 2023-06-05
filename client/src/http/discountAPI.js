import { $authHost } from "./index";

export const createDiscountDevice = async ({ deviceId, discountSize }) => {
  const { data } = await $authHost.post("api/discount/", {
    deviceId,
    discountSize,
  });
  return data;
};
