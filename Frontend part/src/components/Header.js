import React, { useState } from "react";
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../store";
import image2 from "../image/image2.jpeg"
axios.defaults.withCredentials = true;
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post("https://authjs.herokuapp.com/api/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setValue] = useState();

  return (
    
    <div id="container">
    <img src={image2} alt="" />
      
<AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">MernStack</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setValue(val)}
              value={value}
              
              textColor="inherit"
            >
              {!isLoggedIn && (
                <>
                  {" "}
                  <Tab to="/login" LinkComponent={Link} label="Login" />
                  <Tab to="/signup" LinkComponent={Link} label="Signup" />
                </>
              )}
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  LinkComponent={Link}
                  label="Logout"
                />
              )}{" "}
            </Tabs>
            
          </Box>
        </Toolbar>
      </AppBar>
      
      </div>
  );
};

export default Header;