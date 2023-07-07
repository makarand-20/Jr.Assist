import {
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import SubNavBar from "../../HelperPages/Navbar/SubNavbar";
import moment from 'moment';
import {Link} from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../../HelperPages/Loader/Loader'


export default function Example() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const userId = sessionStorage.getItem('userId');
    //get a blog id from params
    const param = useParams()

    const [blog, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const deleteBlog = async () => {
        try {
            const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/deleteblog/${param.id}`);
            if (data) {
                toast.success("Blog Deleted Successfully 🚮");
                window.location.href = "/myblogs";
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
              toast.error('Blog Not Deleted');
            }
          }
    };

   
    //get blogs
    const getOneBlog = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/singleblog/${param.id}`);
            if (data) {
              const updatedBlog = { ...data.blog, views: data.blog.views + 1 };
              await axios.post(`https://jr-assist-server.vercel.app/api/blogs/updateblog/${param.id}`, updatedBlog);
              setBlogs(updatedBlog);
              setIsLoading(false);
            }
        } 
        catch (error) {
        console.log(error);
        }
    };
    useEffect(() => {
        getOneBlog();
    }, []);


    //upvote a blog 
    //upvote a blog 
    const upvoteBlog = async () => {
        try {
            const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/upvoteblog/${param.id}`,{userId});
            if (data) {
                toast.success("Thanks for Upvoting ❤️");
            }
        } catch (error) {
            // Handle error response
            if (error.response && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error;
                setError(errorMessage);
                toast.error(errorMessage);
            } else {
                setError('An error occurred. Please try again later.');
                toast.error('You have already upvoted this blog');
            }
        }
    };




    return (
      <>
          <div className="bg-white">
          <div className="relative isolate px-6 lg:px-8">
              <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
              >
              <div
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  style={{
                  clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
              />
              </div>
              
            <SubNavBar/>
              
            {isLoading ? (
                  <Loader/>
                ):
                (
                    <div className="mx-auto max-w-3xl pt-20">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 break-words text-gray-900 sm:text-3xl">
                        {blog.title}
                        </h2>
                        <div className="mt-3 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <div className="mt-4 flex items-center text-lg text-gray-600">
                        <img src={blog?.author?.profileImage} alt="" className="h-10 w-10 rounded-full bg-gray-50" /> &emsp;
                            {blog?.author?.firstName} {blog?.author?.lastName}
                        </div>
                        <div className='mt-4 flex items-center text-sm text-gray-600'>
                        {moment(blog.createdAt).format("MMM Do YY, h:mm a")} &nbsp; <span className="text-gray-400">·</span> &nbsp; 6 min read
                        </div>
                        </div>
                    </div>
                    {userId === blog?.author?._id && (
                        <div className="mt-5 flex lg:ml-4 lg:mt-0">
                        <span className="sm:block">
                        <Link to={`/editblog/${blog._id}`}>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300" 
                        >
                            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-white" aria-hidden="true" />
                            Edit
                        </button>
                        </Link>
                        </span> &nbsp;

                        <span className="sm:ml-3">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={deleteBlog}
                        >
                            <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                            Delete
                        </button>
                        </span>
                    </div>
                    )}
                
                </div>

                <div className="border-t border-gray-400 my-8"></div>

                <img src={blog.image} />

                <div className="border-t border-gray-400 my-8"></div>

                <div >

                <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
                </div>

                {/* upvote a blog */}
                {isLoggedIn && (
                    <>
                        <div className="border-t border-gray-400 my-8"></div>
                        <div>
                            <div className='flex justify-center text-xl'>
                                <b><h3>Is this blog Insightful for you?</h3></b>
                            </div>
                            <div className='flex justify-center text-sm mt-2'>
                                <p>Please Upvote the blog 👇</p>
                            </div>      
                            <div className='flex justify-center mt-6'>
                                <button onClick={upvoteBlog} className='bg-pink-500 rounded-md shadow-sm text-white py-2 px-3'>Upvote Blog 😄</button>
                            </div>
                        </div>
                    </>
                    )}

                <div className="border-t border-gray-400 my-8"></div>

                <div>
                    <div className="mt-3 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        <Link to={`/userprofile/${blog?.author?._id}`}> 
                            <div className="mt-4 flex items-center text-xl text-gray-600">
                                <img src={blog?.author?.profileImage} alt="" className="h-10 w-10 rounded-full bg-gray-50" /> &ensp;
                                <b>{blog?.author?.firstName} {blog?.author?.lastName}</b>&emsp;

                                <button className='inline-flex items-center rounded-md bg-white px-2 py-1 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900'>Visit profile 👉</button>
                            </div>
                        </Link>
                        
                    </div>
                    <div className='mt-4 flex items-center text-sm text-gray-600'>
                        <b> Blog Written - </b> &nbsp; {blog?.author?.blogs.length} &emsp;
                    </div>

                    <div className='mt-2 flex items-center text-sm text-gray-600'>
                        <b> Current Position - </b> &nbsp; {blog?.author?.jobRole} 
                    </div>
                        
                    <div className='mt-2 flex items-center text-sm text-gray-600'>
                    <b>Expert In - </b> &nbsp; {blog?.author?.languages}
                    </div>
                    <div className='mt-2 flex items-center text-sm text-gray-600'>
                        <b>Student at - </b> &nbsp; VIIT (Vishwakarma)
                    </div>
                </div>
                <div className="border-t border-gray-400 my-8"></div>
            </div>
                )}
            

              <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
              >
              <div
                  className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                  style={{
                  clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
              />
              </div>
          </div>
          </div>
      </> 
    )
  }