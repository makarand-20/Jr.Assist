import {useState, useEffect} from 'react'
import axios from "axios";
import Loader from '../../HelperPages/Loader/Loader'
import BlogPage from '../../BlogPage/BlogPage'

export default function Example() {

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //get blogs
  const getAllBlogs = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("https://jr-assist-server.vercel.app/api/blogs/allblogs/");
      if (data) {
        setBlogs(data.blogs); 
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
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


// export default function Example() {
//   const [blogs, setBlogs] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Fetch blogs for the specified page
//   const getAllBlogs = async (page) => {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/allblogs/?page=${page}`);
//       if (data) {
//         setBlogs(data.blogs);
//         setTotalPages(data.totalPages);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch blogs when the component mounts
//   useEffect(() => {
//     getAllBlogs(currentPage);
//   }, [currentPage]);

//   // Handler for going to the previous page
//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   // Handler for going to the next page
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="py-5 sm:py-5">
//           <div className="mx-auto max-w-7xl px-6 lg:px-8">
//             <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">

//               {blogs.map((blog) => (
//                 <BlogPage key={blog._id} blog={blog} /> // Assuming you have a BlogCard component
//               ))}

//             </div>
//             {/* Pagination buttons */}
//             <div className="mt-4 flex justify-center">
//               <button
//                 className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//                 onClick={handlePrevPage}
//                 disabled={currentPage === 1}
//               >
//                 Prev Page
//               </button>
//               <span className="mx-2">Page {currentPage} of {totalPages}</span>
//               <button
//                 className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//               >
//                 Next Page
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

