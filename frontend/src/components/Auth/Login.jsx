import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

import AUTH_IMG from "../../assets/auth-img.png";
import Input from '../Inputs/Input';
import { validateEmail } from '../../utils/helper';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser, steOpenAuthForm } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async(e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address.")
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      // console.log("Login Response:", response.data);
      const { token, role } = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);

        //Redirect based on role
        if(role === "admin"){
          steOpenAuthForm(false);
          // console.log("Navigating now...");
          navigate("/admin/dashboard");
        }
        steOpenAuthForm(false);
      }

      
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again.");
      }
    };

  };
  return (
    <div className='flex items-center'>
      <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
        <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[2px] mb-6'>
          Please enter your details to Log In
        </p>

        <form onSubmit={handleLogin}>

          <Input 
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input 
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button 
            type='submit' 
            className='btn-primary'
          >
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account? {" "}
            <button
              className='font-medium text-primary underline cursor-pointer'
              onClick={() => {setCurrentPage("signup")}}
            >
              SignUp
            </button>
          </p>
        </form>
      </div>

      <div className='hidden md:block'>
        <img src={AUTH_IMG} alt='login' className='h-[400px]' />
      </div>
    </div>
  )
}

export default Login;
