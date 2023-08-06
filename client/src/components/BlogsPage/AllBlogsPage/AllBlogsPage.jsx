import {useState, useEffect} from 'react'
import axios from "axios";
import Loader from '../../HelperPages/Loader/Loader'
import BlogPage from '../../BlogPage/BlogPage'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Example() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch blogs for the specified page
  const getAllBlogs = async (page) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/allblogs/?page=${page}`);
      if (data) {
        setBlogs(data.blogs);
        setTotalPages(data.TotalPages);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch blogs when the component mounts
  useEffect(() => {
    getAllBlogs(currentPage);
  }, [currentPage]);

  // Handler for going to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Handler for going to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="py-5 sm:py-5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">

              {blogs.map((blog) => (
                <BlogPage key={blog._id} blog={blog} /> // Assuming you have a BlogCard component
              ))}

            </div>

    {/* ***************************************************************************************/}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                  <button
                      className="relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}

                  >
                      Previous
                  </button>

                  <div className='mt-2 px-3'>
                    <p className="text-sm text-gray-700">
                        Page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                    </p>
                  </div>

                  <button 
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
              </div>

              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center mt-28">
                  <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
                          <button
                              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              onClick={handlePrevPage}
                              disabled={currentPage === 1}
                          >
                              <span className="sr-only">Previous</span>
                              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                          </button>

                          <div className='mt-2 px-3'>
                              <p className="text-sm font-bold text-gray-700">
                                  Page <span className="font-bold">{currentPage}</span> of{' '}
                                  <span className="font-bold">{totalPages}</span> results
                              </p>
                          </div>

                          <button
                              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                              onClick={handleNextPage}
                              disabled={currentPage === totalPages}
                          >
                              <span className="sr-only">Next</span>
                              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                      </nav>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

