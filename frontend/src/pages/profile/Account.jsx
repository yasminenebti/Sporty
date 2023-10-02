import { VscAccount } from "react-icons/vsc";
import {  Outlet, useNavigate } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import { TbJewishStar } from "react-icons/tb";
import { TbShoppingBagCheck } from "react-icons/tb";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAccount } from "../../redux/auth/Action";
const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [currentTab, setCurrentTab] = useState("Profile"); // Default to "Profile"

  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  const handleProfileNavigate = () => {
    navigate("/account/settings/profile");
    handleTabClick("Profile")
  };

  const handleSecurityNavigate = () => {
    navigate("/account/settings/security");
    handleTabClick("Security")
  };

  const handleWishListNavigate = () => {
    navigate("/account/settings/wishList");
    handleTabClick("WishList")

  };

  const handleHistoryOrderNavigate = () => {
    navigate("/account/settings/history/orders");
    handleTabClick("Orders")

  };

  const handleLogout = () => {
    dispatch(logoutAccount());
  };

  return (
    <div className=" pt-20 lg:px-52 px-10 ">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box className="bg-white border rounded-md border-grey px-5">
            <ul className="pt-5 pb-4 " onClick={handleProfileNavigate}>
              {/* profile information */}
              <li
                className={`flex items-center gap-x-2 p-2 cursor-pointer ${
                  currentTab === "Profile" ? "bg-smoky text-white rounded-md" : "hover:bg-smoky hover:text-white rounded-md"
                }`}
              >
                <VscAccount className="w-7" />
                <span className={`origin-left duration-200`}>Public Profile</span>
              </li>
            </ul>
            {/* Password and Authentication  */}

            <ul className="pt-5 pb-4 " onClick={handleSecurityNavigate}>
            <li
                className={`flex items-center gap-x-2 p-2 cursor-pointer ${
                  currentTab === "Security" ? "bg-smoky text-white rounded-md" : "hover:bg-smoky hover:text-white rounded-md"
                }`}
              >
                <MdSecurity className="w-7" />
                <span className={` origin-left duration-200`}>
                  Password and Authentication
                </span>
              </li>
            </ul>

            {/* Wish List  */}

            <ul className="pt-5 pb-4 " onClick={handleWishListNavigate}>
            <li
                className={`flex items-center gap-x-2 p-2 cursor-pointer ${
                  currentTab === "WishList" ? "bg-smoky text-white rounded-md" : "hover:bg-smoky hover:text-white rounded-md"
                }`}
              >
                <TbJewishStar className="w-7" />
                <span className={` origin-left duration-200`}>Wish List</span>
              </li>
            </ul>

            {/* History Orders  */}

            <ul className="pt-5 pb-4 " onClick={handleHistoryOrderNavigate}>
            <li
                className={`flex items-center gap-x-2 p-2 cursor-pointer ${
                  currentTab === "Orders" ? "bg-smoky text-white rounded-md" : "hover:bg-smoky hover:text-white rounded-md"
                }`}
              >
                <TbShoppingBagCheck className="w-7" />
                <span className={` origin-left duration-200`}>My Orders</span>
              </li>
            </ul>

            {/* Logout */}
            <Button
            onClick={handleLogout}
              variant="contained"
              sx={{
                px: "1rem",
                my: 4,
                mx: 3,
                bgcolor: "#404245",
                "&:hover": { bgcolor: "#404245" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box className="bg-white border rounded-md  border-grey px-5">
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
