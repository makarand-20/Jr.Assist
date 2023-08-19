import {useState, useEffect} from 'react'
import axios from "axios";
import Loader from '../HelperPages/Loader/Loader'
import { GlobeAltIcon } from '@heroicons/react/20/solid'
import SubNavbar from '../HelperPages/Navbar/SubNavbar'


export default function Example() {

    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const getAllUsers = async (page) => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(`https://jr-assist-server.vercel.app/api/users/all`);
          if (data) {
            setBlogs(data.users);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      // Fetch blogs when the component mounts
      useEffect(() => {
        getAllUsers();
      }, []);    

    return (

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

                <SubNavbar/>

                <div className="mx-auto max-w-xl py-12 sm:py-12 lg:pt-24">
                    <div className="sm:mb-8 ">
                    
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:mb-3">
                            Thanks to all of you! 🙌
                        </h1>
                        <h2 className="text-lg sm:mb-8 ml-1 sm:ml-2"> These are the faces behind the growth of this site 🫵🫡 </h2>

                        {isLoading ? (<Loader/>) : (<div className="">
                            <ul role="list" className="my-6">
                            {blogs.map((product) => (
                                <li key={product._id} className="flex py-6">
                                
                                <div className="h-24 w-24 rounded-md border border-gray-200">
                                    <img
                                    src={product.profileImage}
                                    alt={product.username}
                                    className="h-24 w-24 sm:h-24 sm:w-24 object-cover object-center rounded-sm shadow-md"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                        {product.username && (!product.firstName && !product.lastName) ? (
                                            <p>{product.username}</p>
                                        ) : (
                                            <p>{product.firstName} {product.lastName}</p>
                                        )}
                                        </h3>
                                        <button
                                        type="button"
                                        className="font-medium text-black flex"
                                        >
                                        Github <GlobeAltIcon className='h-4 w-4 mt-1 ml-1'/>
                                        </button>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {product.jobRole === '' ? 'Student' : product.jobRole}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-800 font-semibold">Blogs : {product.blogs.length}</p>

                                    <div className="flex">
                                        <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                        Visit Profile
                                        </button>
                                    </div>
                                    </div>
                                    
                                </div>
                                </li>
                            ))}
                            </ul>
                        </div>) }

                    </div>
                </div>

                
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
    )
}
