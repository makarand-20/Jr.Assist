import React from 'react'
import moment from "moment";
import {Link} from 'react-router-dom'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogPage = ({ blog },{isUpvoted}) => {

  //crate a function to copy the link to clipboard
  const copyLink = () => {

    navigator.clipboard.writeText(`https://jr-assist.vercel.app/singleblog/${blog._id}`);
    toast.success('Linked copied to clipboard ✌️', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  };


  return (
        <article key={blog._id} className="flex flex-col items-start justify-between">
          <Link to={`/singleblog/${blog._id}`}>
            <img
              src={blog.image}
              alt=""
              className="rounded-lg mt-3 w-full sm:h-40 lg:h-56 shadows drop-shadow-xl"
            />
          </Link>

          <div className="flex items-center gap-x-4 text-xs mt-3">
            <time
              dateTime={moment(blog.createdAt).format("MMM Do YY, h:mm a")}
              className="text-gray-600"
            >
              🕙 {moment(blog.createdAt).format("MMM Do YY, h:mm a")}
            </time>
            <Link
              to={`/${blog.category}`}
              className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {blog.category}
            </Link>
          </div>

          <div className="group relative">
            <h3 className="mt-3 text-sm sm:text-lg font-bold leading-6 text-gray-900 group-hover:text-gray-600">
              <Link to={`/singleblog/${blog._id}`}>
                <span className="absolute inset-0" />
                {blog.title}
              </Link>
            </h3>
          </div>

          {/* Additional section for upvoting and comments */}
          <div className="flex items-center text-xs">
            <div className="flex items-center gap-x-4">

              <button className="text-sm mt-3 font-semibold leading-6 relative z-10 rounded-full px-2 py-1 text-gray-900 ring-1 ring-inset ring-gray-500 hover:bg-gray-100 pointer-events-none">
                Upvotes | {blog.upvotes.length}
              </button>

              <button className="text-sm mt-3 font-semibold leading-6 relative z-10 rounded-full px-2 py-1 text-gray-900 ring-1 ring-inset ring-gray-500 hover:bg-gray-100 pointer-events-none">
                Views | {blog.views}
              </button>
              
              {isUpvoted ? (
                <button>hehe</button>
              ):(
                <button onClick={copyLink} className="text-sm mt-3 font-semibold leading-6 relative z-10 rounded-full px-2 py-1 text-gray-900 ring-1 ring-inset ring-gray-500 hover:bg-gray-100">
                <PaperAirplaneIcon className="h-6 w-4" aria-hidden="true" />
                </button>
              )}

            </div>
          </div>
        </article>
  );
};

export default BlogPage;
