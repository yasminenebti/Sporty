import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router"
import { register } from "../redux/auth/Action";
import { useToast } from "../utils/ToastProvider";

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({username : "" , firstName : "" , lastName : "" , email:"" , password : ""});
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.authState);
  const showToast = useToast(); // Access the showToast function

  

  const handleRegister = (e) => {
      e.preventDefault()
      dispatch(register(data))
  }
  

  const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };

  
    useEffect(() => {
        if (authState.register) {
            navigate("/login");
            console.log(authState)
        }
    },[authState, navigate, showToast])


    return (
      <>
         <div>
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create account
            </h2>
                <form className="space-y-6" onSubmit={handleRegister}>
                    <div>
                        <p className="block text-md font-medium leading-6 text-brown mb-2">Username</p>
                        <input
                         placeholder="Enter your username"
                         type="text"
                         name="username"
                         onChange={handleChange}
                         value={data.username}
                         className="py-2 px-2 outline-none w-full rounded-md border-2 border-blue border-silver"/>
                    </div>
                    <div>
                        <p className="block text-md font-medium leading-6 text-brown mb-2">FirstName</p>
                        <input
                         placeholder="Enter your first Name"
                         type="text"
                         name="firstName"
                         onChange={handleChange}
                         value={data.firstName}
                         className="py-2 px-2 outline-none w-full rounded-md border-2 border-blue border-silver"/>
                    </div>
                    <div>
                        <p className="block text-md font-medium leading-6 text-brown mb-2">LastName</p>
                        <input
                         placeholder="Enter your last Name"
                         type="text"
                         name="lastName"
                         onChange={handleChange}
                         value={data.lastName}
                         className="py-2 px-2 outline-none w-full rounded-md border-2 border-blue border-silver"/>
                    </div>
                    <div>
                        <p className="block text-md font-medium leading-6 text-brown mb-2">Email</p>
                        <input
                         placeholder="Enter your email"
                         type="email"
                         name="email"
                         onChange={handleChange}
                         value={data.email}
                         className="py-2 px-2 outline-none w-full rounded-md border-2 border-blue border-silver"/>
                    </div>
                    <div>
                        <p className="block text-md font-medium leading-6 text-brown mb-2">Password</p>
                        <input
                         placeholder="Enter your password"
                         type="password"
                         name="password"
                         onChange={handleChange}
                         value={data.password}
                         className="py-2 px-2 outline-none w-full rounded-md border-2 border-blue border-silver"/>
                    </div>
                    <div>
                        <button type="submit" className="w-full">Register</button>
                    </div>

                </form>
                <div className="flex space-x-3 items-center mt-5">
                    <p className="italic m-0">Already have an account ?</p>
                    <button  onClick={() => navigate("/login")}>Login</button>


                </div>

            </div>
        </div>

    </div>
      </>
    )
  }
  