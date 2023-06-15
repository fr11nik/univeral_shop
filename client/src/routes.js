import Admin from "./pages/Admin";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  TEMP_ROUTE,
} from "./utils/consts";
import Basket from "./pages/Basket";
import Basket1 from "./pages/Basket1";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Profile from "./pages/Profile";
import Temp from "./pages/Temp";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket1,
  },
  {
    path: "/order",
    Component: Basket,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + "/:id",
    Component: DevicePage,
  },
  {
    path: TEMP_ROUTE,
    Component: Temp,
  },
];
