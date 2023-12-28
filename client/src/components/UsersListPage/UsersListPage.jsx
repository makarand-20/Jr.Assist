import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../HelperPages/Loader/Loader";
import SubNavbar from "../HelperPages/Navbar/SubNavbar";

export default function Example() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsers = async (page) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://jr-assist-server.vercel.app/api/users/all`
      );
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
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>

            <SubNavbar />

            <div className="relative isolate overflow-hidden bg-white-900 pt-14 sm:pt-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:ml-20">
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Registered Seniors 🙌
                  </h3>
                  <p className="my-6 text-lg leading-8 text-gray-700">
                    I express my gratitude to all of them
                    for generously sharing such valuable
                    content for the benefit of others in the
                    future. 🫡👏
                  </p>
                </div>

                <div className="py-5 sm:py-5">
                  <div className="mx-auto max-w-7xl px-6 lg:pl-20">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-14 gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                      {blogs.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-start"
                        >
                          <div class="w-72 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-white dark:border-gray-500">
                            <div class="flex flex-col items-center py-10">
                              <img
                                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src={product.profileImage}
                                alt={product.username}
                              />
                              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-black">
                                {product.username &&
                                !product.firstName &&
                                !product.lastName ? (
                                  <p>{product.username}</p>
                                ) : (
                                  <p>
                                    {product.firstName}{" "}
                                    {product.lastName}
                                  </p>
                                )}
                              </h5>
                              <span class="text-sm text-gray-500 dark:text-gray-400">
                                {product.jobRole === ""
                                  ? "Student"
                                  : product.jobRole}
                              </span>
                              <div class="flex mt-4 md:mt-6">
                                <a
                                  href={product.linkedin}
                                  target="_blank"
                                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black border border-black rounded-lg focus:outline-none focus:ring-gray-100"
                                >
                                  Linkedin 🌐
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
