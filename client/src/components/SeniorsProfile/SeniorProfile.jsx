import { FaGithub, FaTwitter, FaRegHandPointRight, FaRegHandPointLeft, FaUsers } from 'react-icons/fa';
import "react-toastify/dist/ReactToastify.css";
import Loader from '../HelperPages/Loader/Loader'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {

    //get user id from params
    const param = useParams()

    //get user
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUser = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`http://localhost:4002/api/users/getuser/${param.id}`);
            if (data) {
                setUser(data.user);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUser();
    }, []);


  return (
    <>
    {isLoading ? (
        <Loader />
    ):(
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg mt-24">
      <div className="text-center">
        <img
          src={user.profileImage}
          alt="Profile Picture"
          className="mx-auto w-32 h-32 rounded-full shadow-lg"
        />
        <h2 className="mt-4 text-2xl font-bold">{user.firstName}&nbsp;{user.lastName}</h2>
        <p className="text-gray-600">{user.jobRole}</p>
      </div>
      
      <div className="mt-4 flex justify-center">
        <div className=" p-4  rounded-lg max-w-lg">
          <p className="text-gray-800 text-justify">{user.bio}</p>
        </div>
      </div>

        <div className='flex justify-center gap-3 mb-8 mt-3'>
            <p className='bg-gray-200 rounded-xl px-3 py-2 inline-block text-xs sm:text-sm'>Blogs Written : <b>{user.blogs.length}</b></p>
            <p className='bg-gray-200 rounded-xl px-3 py-2 inline-block text-xs sm:text-sm'> Total Views : <b>{
                user.blogs.reduce((acc, blog) => {
                    return acc + blog.views
                }
                , 0)
            }</b></p>
        </div>

      <div className='flex justify-center mt-4 mb-3'>
        <a href={user.linkedin} target='_blank' rel="noopener noreferrer">
          <button className='px-3 py-2 shadow-md rounded-md text-sm sm:text-lg text-white bg-blue-600 hover:bg-slate-200 hover:text-black'><FaUsers className="text-xl inline-block" /> &nbsp; Connect</button>
        </a>
      </div>
      
      <div className="mt-4 flex justify-center space-x-4">
        <FaRegHandPointRight className="text-2xl mt-2" />
        <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-gray-600">
          <FaGithub className="text-4xl" />
        </a>
        <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400">
          <FaTwitter className="text-4xl" />
        </a>
        <FaRegHandPointLeft className="text-2xl mt-2" />
      </div>

    </div>
    )}
    </>
  );
};

export default ProfilePage;