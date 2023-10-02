import { Box, Grid, TextField, Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { currentUser, updateProfile } from "../../redux/auth/Action";
import { BiEdit } from "react-icons/bi";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);

  const [picture, setPicture] = useState(null);
  const [edit, setEdit] = useState(false);
  const [firstName , setFirstName] = useState(false)
  const [lastName , setLastName] = useState(false)
  const [editEmail , setEditEmail] = useState(false)

  const user = authState?.reqUser;
  const currentUserId = authState.reqUser?.id;
  

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit=() => {
    switch (true) {
      case data.firstName === "":
        data.firstName = user?.firstName;
        break;
      case data.lastName === "":
        data.lastName = user?.lastName;
        break;
      case data.email === "":
        data.email = user?.email;
        break;
      default:
        break;
    }

    console.log(data)

    dispatch(updateProfile(currentUserId,data))
    setEdit(false)

}

  const handleEdit = () => {
    setEdit(!edit);
  };

  const uploadImage =(picture) =>{
    const data = new FormData()
    data.append("file",picture)
    data.append("upload_preset","chatApplication")
    data.append("cloud_name","duv3sihve")
    axios.post("https://api.cloudinary.com/v1_1/duv3sihve/image/upload" , data).then((res) => res.data)
    .then((data)=>{
      console.log("imgUrl",data.url.toString())
      setPicture(data.url.toString()) 
      const pictureToUpload = {picture : data.url.toString()}
      console.log("data picture",pictureToUpload)
      dispatch(updateProfile(currentUserId,pictureToUpload))
    })
  }

  

 

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);
  return (
    <>
      <Box className="border border-grey rounded-s-md shadow-md p-5">
        
          <Grid container spacing={3}>
            <Grid className="flex justify-end items-end" item xs={12}>
              <Box>
                <BiEdit
                  onClick={handleEdit}
                  className=" text-smoky hover:text-blue text-3xl cursor-pointer"
                />
              </Box>
            </Grid>
            <Grid className="flex justify-center items-center" item xs={12}>
              <Box>
                <div className="flex flex-col justify-center items-center mb-6">
                  <label htmlFor="imgInput">
                    <Avatar
                      className=" cursor-pointer"
                      alt="Remy Sharp"
                      src={user?.picture || picture || user?.picture}
                      sx={{ width: 96, height: 96 }}
                    />
                  </label>
                  <input onChange={(e)=>uploadImage(e.target.files[0])} type="file" id="imgInput" className="hidden"/>
                </div>
              </Box>
            </Grid>

            {edit && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    value={data.firstName}
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    value={data.lastName}
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    value={data.email}
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  variant="contained"
                
                  sx={{
                    px: "2rem",
                    mt: 2,
                    mx: "auto",
                    width: "50%",
                    py: 1.5,
                    bgcolor: "#404245",
                    "&:hover": { bgcolor: "#084177" },
                    display: "flex", // Add flex display
                    justifyContent: "center", // Add justify-center
                    alignItems : "center"
                  }}
                >
                  Update 
                </Button>
              </>
            )}

            {!edit && (
              <>
                <Grid item xs={12} sm={6}>
                  <div className="w-full flex justify-between items-center border-b border-fog">
                    <p className="py-2 pl-1 font-normal">
                      {user?.firstName || "first name"}
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="w-full flex justify-between items-center border-b border-fog">
                    <p className="py-2 pl-1 font-normal">
                      {user?.lastName || "last name"}
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="w-full flex justify-center items-center border-b border-fog">
                    <p className="py-2 pl-1 font-normal">
                      {user?.email || "email"}
                    </p>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        
      </Box>
    </>
  );
};

export default Profile;
