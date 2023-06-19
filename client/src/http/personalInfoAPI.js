import { $authHost } from "./index";
export const fetchPersonalInfo = async () => {
  const { data } = await $authHost.get("/api/personalInfo/current/");
  return data;
};
export const updatePersonalInfo = async (personalInfo) => {
  const { data } = await $authHost.put("api/personalInfo/", personalInfo);
  return data;
};
export const verify = async () => {
  return await $authHost.get("api/personalInfo/verify");
};
