import {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from 'react-redux';
import {updateUserr} from '../../store/authSlice';
import Loader from '../HelperPages/Loader/Loader';


export default function Example() {
  const [isLoading, setIsLoading] = useState(true);
  const id = localStorage.getItem('userId');
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();

  const getIndUser = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.get(`https://jr-assist-server.vercel.app/api/users/getuser/${id}`);
      setInputs({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        profilePicture: data.user.profileImage,
        bio: data.user.bio,
        technicalLanguages: data.user.languages,
        jobRole: data.user.jobRole,
        city: data.user.city,
        github: data.user.github,
        linkedIn: data.user.linkedin,
        twitter: data.user.twitter,
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //get the user data
  useEffect(() => {
    getIndUser();
  }, [id]);

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
      const { data } = await axios.put(`https://jr-assist-server.vercel.app/api/users/update/${id}`, {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        profileImage: inputs.profilePicture,
        bio: inputs.bio,
        languages: inputs.technicalLanguages,
        jobRole: inputs.jobRole,
        city: inputs.city,
        github: inputs.github,
        linkedin: inputs.linkedIn,
        twitter: inputs.twitter,
        isProfileComplete: true,
      });

      dispatch(updateUserr(inputs.profilePicture));
      toast.success("Profile updated successfully! 🎉");
      navigate('/allblogs');
    } catch (err) {
      console.log(err);
      setError(err.response.data.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ):(
        <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Profile Page</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Please fill the profile first. It will be publicly visible to all the juniors.
          </p>
        </div>
        <div className='flex justify-center items-center'>
          <img className='flex justify-center items-center h-40 w-40 rounded-full mt-11' src={inputs.profilePicture} alt=""  />
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  value={inputs.firstName}
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Your name'
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  value={inputs.lastName}
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Your last name'
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Profile Picture
              </label>
              <div className="mt-2.5">
                <input
                  value={inputs.profilePicture}
                  onChange={handleChange}
                  type="text"
                  name="profilePicture"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Profile picture's public link"
                  required
                />
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Bio
              </label>
              <div className="mt-2.5">
                <textarea
                  value={inputs.bio}
                  onChange={handleChange}
                  name="bio"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Tell us about yourself (min 2 lines)'
                  required
                />
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Technical Languages
              </label>
              <div className="mt-2.5">
                <input
                  value={inputs.technicalLanguages}
                  onChange={handleChange}
                  type="text"
                  name="technicalLanguages"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Please enter  'comma'  seperated languages"
                  required
                />
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Job Role
              </label>
              <div className="mt-2.5">
                <input
                  value={inputs.jobRole}
                  onChange={handleChange}
                  type="text"
                  name="jobRole"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Enter your live job role'
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2.5">
                <input
                  value={inputs.city}
                  onChange={handleChange}
                  type="text"
                  name="city"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Working city'
                  required
                />
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                LinkedIn
              </label>
              <div className="mt-2.5">
                <input
                  value={inputs.linkedIn}
                  onChange={handleChange}
                  type="text"
                  name="linkedIn"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="LinkedIn profile link"
                  required
                />
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Github
              </label>
              <div className="mt-2.5">
                <input
                  value={inputs.github} 
                  onChange={handleChange}
                  type="text"
                  name="github"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Github page link"
                  required
                />
              </div>
            </div>
  
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Twitter
              </label>
              <div className="mt-2.5">
                <input
                  value={inputs.twitter}
                  onChange={handleChange}
                  type="text"
                  name="twitter"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Twitter page link"
                />
              </div>
            </div>
          </div>
          <div className="mt-14 flex justify-center">
            <button
              type="submit"
              className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Update Profile
            </button>
          </div>
          <div className="mt-10 flex justify-center items-center">
          </div>
        </form>
      </div>
      )}
    </>
  )
}
