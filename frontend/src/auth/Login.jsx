import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { login } from "../redux/auth/Action";

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({email:"" , password : ""});
  

  const dispatch = useDispatch()

  const authState = useSelector((state) => state.authState);

  const handleLogIn = (e) => {
      e.preventDefault()
      console.log(data)
      dispatch(login(data))
  }
  const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
  }
 
  useEffect(() => {
      
      if (authState.login) {
          navigate("/");
          console.log("*****")
          console.log(authState)

      }
  },[authState, navigate])
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in your account
            </h2><form onSubmit={handleLogIn} className="space-y-6">
                    <div>
                        <p className="block text-md font-medium leading-6 text-brown mb-2">Email</p>
                        <input
                         placeholder="Enter your email"
                         type="text"
                         name="email"
                         onChange={handleChange}
                         value={data.email}
                         className="py-2 px-2 outline-none w-full rounded-md border-2 border-silver"/>
                    </div>
                    <div>
                        <p className="block text-md font-medium leading-6 text-brown mb-2">Password</p>
                        <input
                         placeholder="Enter your password"
                         type="password"
                         name="password"
                         onChange={handleChange}
                         value={data.password}
                         className="py-2 px-2 outline-none w-full rounded-md border-2 border-silver"/>
                    </div>
                    <div>
                        <button type="submit" className="w-full">Sign In</button>
                    </div>

                </form>
                <div className="flex space-x-3 items-center mt-5">
                    <p className="italic m-0">Create New Account</p>
                    <button  onClick={() => navigate("/register")}>Register</button>


                </div>

            </div>
        </div>

        {/* <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnack}>
        <Alert onClose={handleSnack} severity="success" sx={{ width: '100%' }}>
             Welcome
        </Alert>
        </Snackbar> */}

      </>
    )
  }
  