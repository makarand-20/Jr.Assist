import {useState, useEffect} from 'react'
import axios from "axios";
import Loader from '../HelperPages/Loader/Loader'
import { useParams } from 'react-router-dom';
import BlogPage from '../BlogPage/BlogPage'

export default function Example() {
  const param = useParams()

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get blogs by category
  const getBlogsByCategory = async () => {
    try {
      setIsLoading(true);
        const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/general/`);
        if (data) {
          setBlogs(data.blogs);
          setIsLoading(false);
        }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   getBlogsByCategory();
  }, []);

  return (
    <>
    {isLoading ? (
      <Loader />
    ):(
      <div className="py-5 sm:py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      
          {blogs.map((blog) => (
            <BlogPage key={blog._id} blog={blog} /> // Assuming you have a BlogCard component
          ))}
        </div>
      </div>
    </div>
    )}
    </>
  )
}
