import {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {login} from '../../../store/authSlice';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LoginForm = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/allblogs');
      toast.error('You are already logged in');
    }
  }, [navigate])

  const [error, setError] = useState('');

  
  const [inputs, setInputs] = useState({
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
      //make a post request to register the user
      const { data } = await axios.post("http://localhost:4002/api/users/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data) {
        sessionStorage.setItem('userId', data.user.id);
        dispatch(login(data.user));
        navigate('/allblogs');
        toast.success('Login Successful! 🥳');
      }
      else{
        toast.error(error);
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
        <h2 className="text-2xl font-semibold mb-12 text-center">Login Form 🚀</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              value={inputs.email}
              onChange={handleChange}
              name="email"
              type="email"
              className="mt-1 px-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:border-blue-500"
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
              className="mt-1 px-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:border-blue-500"
              placeholder="Your password"
              required
            />
          </div>
          <div className="flex items-center mt-10 justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg focus:outline-none">
              Login
            </button>
          </div>
          <div className="flex items-center mt-10 justify-center">
                <button onClick={() => navigate("/register")} className="text-blue-500">New here? Create a new account 👉</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
