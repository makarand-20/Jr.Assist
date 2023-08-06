import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import {logout} from '../../../store/authSlice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import { persistor } from '../../../store/store';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const value = useSelector((state) => state.value);
  const dispatch = useDispatch();

  const handleClearStorage = () => {
    toast.success('Signing Off! See you soon 🫡');
    persistor.purge();
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/assets/logo.png"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="/assets/logo.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">


                  <div className="flex space-x-4">
                    {isLoggedIn && (
                      <>
                        <Link to={'/'} className='text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'>Home</Link>
                        <Link to={'/allblogs'} className='text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'>All Blogs</Link>
                        
                        <Link to={'/myblogs'} className='text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'>My Blogs</Link>
                        
                        <Link to={'/createblog'} className='text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'>Create Blog</Link>

                        <Menu as="div" className="relative ml-3">

                          <Menu.Button className="text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium">
                            Category ↓
                          </Menu.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >

                          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-xl ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/company"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Company 🏬
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/technology"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Technology 🖥️
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/clubs"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    clubs 🏀
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/general"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    General 📰
                                  </Link>
                                )}
                              </Menu.Item>
                          </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    )}
                    {!isLoggedIn && (
                      <>
                        <Link to={'/'} className='text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'>Home</Link>

                        <Link to={'/allblogs'} className='text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium'>All Blogs</Link>

                        
                        <Menu as="div" className="relative ml-3">

                          <Menu.Button className="text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium">
                            Category ↓
                          </Menu.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >

                          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-xl ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/company"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Company 🏬
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/technology"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Technology 🖥️
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/clubs"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    clubs 🏀
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/general"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    General 📰
                                  </Link>
                                )}
                              </Menu.Item>
                          </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    )}
                  </div>

                  
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}                     
                
                {!isLoggedIn && (
                  <>
                    <Link to={'/login'} className='border border-gray-600 px-2 py-1 rounded-md'> Login </Link>
                  </>
                )}

                  {isLoggedIn && (
                    <>
                      <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={isLoggedIn && value && user.profileImage ? value : user.profileImage}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-xl ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/editprofile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link to={'/login'} onClick={handleClearStorage} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>Sign out</Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                      </Menu>
                    </>
                    )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
            {isLoggedIn && (
                      <>
                        <Link to={'/'} className='text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>Home</Link>
                        <Link to={'/allblogs'} className='text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>All Blogs</Link>
                        
                        <Link to={'/myblogs'} className='text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>My Blogs</Link>
                        
                        <Link to={'/createblog'} className='text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>Create Blog</Link>

                        <Menu as="div" className="relative ml-3">

                          <Menu.Button className="text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium">
                            Category ↓
                          </Menu.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >

                          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-xl ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/company"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Company 🏬
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/technology"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Technology 🖥️
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/clubs"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    clubs 🏀
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/general"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    General 📰
                                  </Link>
                                )}
                              </Menu.Item>
                          </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    )}
                    {!isLoggedIn && (
                      <>
                        <Link to={'/'} className='text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>Home</Link>
                        <Link to={'/allblogs'} className='text-gray-900 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'>All Blogs</Link>

                        <Menu as="div" className="relative ml-3">

                          <Menu.Button className="text-gray-900 hover:text-gray-900 rounded-md px-3 py-2 text-sm font-medium">
                            Category ↓
                          </Menu.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >

                          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-xl ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/company"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Company 🏬
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/technology"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Technology 🖥️
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/clubs"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    clubs 🏀
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                              {({ active }) => (
                                  <Link
                                    to="/general"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    General 📰
                                  </Link>
                                )}
                              </Menu.Item>
                          </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
