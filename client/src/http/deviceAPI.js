import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};
export const deleteType = async (type) => {
  const { data } = await $host.delete("api/type", { data: type });
  return data;
};
export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};
export const deleteBrand = async (brand) => {
  const { data } = await $host.delete("api/brand", { data: brand });
  return data;
};
export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};
export const fetchBasketDevices = async () => {
  const { data } = await $authHost.get("api/basket/current");
  return data;
};
export const fetchDeviceWithoutDiscount = async () => {
  const { data } = await $host.get("api/device/without-discount");
  return data;
};
export const fetchDeviceWithDiscount = async () => {
  const { data } = await $host.get("api/device/with-discount");
  return data;
};
export const deleteDevices = async (ids) => {
  return await $host.delete("api/device/", { data: ids });
};
