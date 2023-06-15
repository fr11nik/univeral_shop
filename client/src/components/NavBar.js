import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButtonWithHelpText from "../components/IconButtonTooltip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { fetchBasketDevices } from "../http/deviceAPI";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  PROFILE_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
const NavBar = observer(() => {
  const { user, basket } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    fetchBasketDevices().then((data) => {
      console.log(data.basket_devices);
      basket.setDevices(data.basket_devices);
      basket.setTotalCount(data.basket_devices.length);
    });
  }, [basket.totalCount]);

  const BadgetBasket = () => {
    return (
      <Badge badgeContent={basket.totalCount} color="error">
        <LocalGroceryStoreIcon />
      </Badge>
    );
  };
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          КупиДевайс
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <IconButtonWithHelpText
              sx={{ color: "white" }}
              size="medium"
              helpText="Корзина"
              iconComponent={BadgetBasket}
              onClick={() => history.push(BASKET_ROUTE)}
            />
            <IconButtonWithHelpText
              sx={{ color: "white" }}
              size="medium"
              helpText="Админ панель"
              iconComponent={AdminPanelSettingsIcon}
              onClick={() => history.push(ADMIN_ROUTE)}
            />
            <IconButtonWithHelpText
              sx={{ color: "white" }}
              size="medium"
              helpText="Личный кабинет"
              iconComponent={AccountCircleIcon}
              onClick={() => history.push(PROFILE_ROUTE)}
            />
            <IconButtonWithHelpText
              sx={{ color: "white" }}
              size="medium"
              helpText="Выйти из аккаунта"
              iconComponent={LogoutIcon}
              onClick={() => logOut()}
            />
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <IconButtonWithHelpText
              sx={{ color: "white" }}
              size="medium"
              helpText="Вход"
              iconComponent={LoginIcon}
              onClick={() => history.push(LOGIN_ROUTE)}
            />
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
