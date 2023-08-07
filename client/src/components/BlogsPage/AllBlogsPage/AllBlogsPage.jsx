import {useState, useEffect} from 'react'
import axios from "axios";
import Loader from '../../HelperPages/Loader/Loader'
import BlogPage from '../../BlogPage/BlogPage'
import { ChevronLeftIcon, ChevronRightIcon, ArchiveBoxXMarkIcon } from '@heroicons/react/20/solid'
import BlogsSearchBar from '../../HelperPages/Searchbar/BlogsSearchBar'

export default function Example() {
  const [blogs, setBlogs] = useState([]);
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');


  if(!searchQuery){
    // Fetch blogs for the specified page
    const getAllBlogs = async (page) => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/allblogs?page=${page}`);
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
  }
  else{
  // Fetch searched blogs for the specified page
  const getAllSearchedBlogs = async (searchQuery) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/allblogs?query=${encodeURIComponent(searchQuery)}`);
      if (data) {
        setSearchedBlogs(data.searchedBlogs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch blogs when the component mounts
  useEffect(() => {
    getAllSearchedBlogs(searchQuery);
  }, [searchQuery]);

}


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

  // Handler for performing the search
  const handleSearch = (query) => {
    setCurrentPage(1); // Reset the current page when performing a new search
    setSearchQuery(query); // Update the searchQuery state with the inputed value
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (

        <>
           <div className="py-5 sm:py-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

              <div className='flex justify-start max-w-7xl'>
                <BlogsSearchBar onSearch={handleSearch} />
                {
                searchedBlogs.length > 0 ? (
                <button onClick={handleRefresh} className="flex justify-end rounded-sm mx-10 px-2 py-2  text-black"> 
                Clear search filter ❌
                </button>
                ):(<></>)
                }
              </div>

              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {searchedBlogs.length > 0
                  ? searchedBlogs.map((blog) => (
                  <BlogPage key={blog._id} blog={blog} />
                ))
                : blogs.map((blog) => (
                  <BlogPage key={blog._id} blog={blog} />
                ))}
              </div>
              
              {searchedBlogs.length === 0 ? (<>{/* Pagination ***********************************************************************/}
              <div className="flex items-center justify-between mt-16 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                          currentPage === 1 ? '' : 'bg-blue-600 text-white'
                        }`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}

                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <div className='mt-2 px-3'>
                      <p className="text-sm text-gray-700">
                          Page <span className="font-medium">{currentPage}</span> of{' '}
                          <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>

                    <button 
                    className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                      currentPage === totalPages ? '' : 'bg-blue-600 text-white'
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <div className="hidden sm:flex sm:flex-1 sm:justify-center">
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
                            <button
                                className={`relative inline-flex items-center rounded-full px-2 py-2 ring-1 ring-inset ring-white text-white focus:z-20 focus:outline-offset-0 ${
                                  currentPage === 1 ? '' : 'bg-blue-600 text-white'
                                }`}
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>

                            <div className='mt-2 px-3'>
                                <p className="text-sm font-bold text-gray-700">
                                    Page <span className="font-bold">{currentPage}</span> of{' '}
                                    <span className="font-bold">{totalPages}</span>
                                </p>
                            </div>

                            <button
                                className={`relative inline-flex items-center rounded-full px-2 py-2 ring-1 ring-inset ring-white text-white focus:z-20 focus:outline-offset-0 ${
                                  currentPage === totalPages ? '' : 'bg-blue-600 text-white'
                                }`}
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
              {/* Pagination End ***********************************************************************/}</>):(<></>)}
              
            </div>
          </div>
        </>
      )}
    </>
  );
}

