import {useState, useEffect} from 'react'
import axios from "axios";
import Loader from '../HelperPages/Loader/Loader'

export default function Example() {

  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState();
  const [views, setViews] = useState();
  const [upvote, setUpvote] = useState();
  const [userCount, setuserCount] = useState();


  const countBLogs = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:4002/api/blogs/countblogs/");
      if (data) {
        setBlogs(data.blogCount);
        setViews(data.totalViews);
        setUpvote(data.totalUpvotes);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    countBLogs();
  }, []);

  const countUsers = async () => {
    try { 
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:4002/api/users/totalusers/");
      if (data) {
        setuserCount(data.totalUsers);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    countUsers();
  }, []);




    return (
      <>
      {isLoading ? (
        <Loader />
      ):(
        <div>
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-20 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            

            <div className="py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-16 gap-y-16 text-center lg:grid-cols-4">
                
                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt className="text-lg leading-7 text-gray-600 font-bold">Number Of Users 🙋‍♂️</dt>
                      <dd className="order-first text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {userCount} 
                      </dd>
                  </div>
                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt className="text-lg leading-7 text-gray-600 font-bold">Number Of Blogs 📝</dt>
                      <dd className="order-first text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {blogs} 
                      </dd>
                  </div>
                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt className="text-lg leading-7 text-gray-600 font-bold">Number Of Upvotes 👍</dt>
                      <dd className="order-first text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {upvote} 
                      </dd>
                  </div>
                  <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt className="text-lg leading-7 text-gray-600 font-bold">Number Of Views 👀</dt>
                      <dd className="order-first text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {views} 
                      </dd>
                  </div>
                  

                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      </>
    )
  }
    