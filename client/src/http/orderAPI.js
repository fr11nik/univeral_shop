import { $authHost } from "./index";

export const createOrder = async ({ totalAmount, paymentMethod }) => {
  const { data } = await $authHost.post("api/order/", {
    totalAmount,
    paymentMethod,
  });
  return data;
};
export const getOrder = async () => {
  const { data } = await $authHost.get("api/order/");
  return data;
};
