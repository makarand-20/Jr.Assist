import {React, useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';


const RegisterForm = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/allblogs');
      toast.error('Only 1 login is allowed at a time');
    }
  }, [navigate])

  const [error, setError] = useState('');

  
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //create a code for getting access of the email id
      const email = inputs.email.split("@");
      if (email[1] !== "viit.ac.in") {
        return toast.error("Please use college email id!");
      }

      //make all in one password checker
      if (
        !(
          inputs.password.length >= 6 &&
          /\d/.test(inputs.password) &&
          /[A-Z]/.test(inputs.password)
        )
      ) 
      {
        return toast.error('Password must be 6 characters long and must contain a number and a uppercase  letter!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }

      //make a post request to register the user
      const { data } = await axios.post("https://jr-assist-server.vercel.app/api/users/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data) {
        //create a toast message
        toast.success('Email sent to your account! Check spam ⚠️ section once');
        
        navigate('/login');
      }
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        setError('An error occurred. Please try again later.');
        toast.error('An error occurred. Please try again later.');
      }
    }
  };


  return (
    <div className="flex items-center justify-center mt-28">
      <div className="rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-12 text-center">Register Form ⚡️</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Username</label>
            <input
              value={inputs.name}
              onChange={handleChange}
              name="name"
              type="text"
              className="mt-1 px-4 py-2 rounded-lg border border-gray-300 w-full"
              placeholder="Your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              value={inputs.email}
              onChange={handleChange}
              name="email"
              type="email"
              className="mt-1 px-4 py-2 rounded-lg border border-gray-300 w-full"
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              value={inputs.password}
              onChange={handleChange}
              name="password"
              type="password"
              className="mt-1 px-4 py-2 rounded-lg border border-gray-300 w-full"
              placeholder="Your password"
              required
            />
          </div>
          <div className="flex items-center mt-10 justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg focus:outline-none">
              Register
            </button>
          </div>
          <div className="flex items-center mt-10 justify-center">
                <button onClick={() => navigate("/login")} className="text-blue-500">Already have an account! Log In 👉</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
