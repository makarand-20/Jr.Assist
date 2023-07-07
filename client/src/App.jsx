import {Routes, Route, Navigate} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import Loader from './components/HelperPages/Loader/Loader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import EmailVerifyPage from './pages/EmailVerifyPage';

const AllBlogsPage = lazy(()=> import('./pages/AllBlogsPage'))
const ByIdBlogsPage = lazy(()=> import('./pages/ByIdBlogsPage'))
const EditBlogPostPage = lazy(()=> import('./pages/EditBlogPostPage'))
const SingleBlogDetailsPage = lazy(()=> import('./pages/SingleBlogDetailsPage'))
const HomePage = lazy(()=> import('./pages/HomePage'))
const AboutMePage = lazy(()=> import('./pages/AboutMePage'))
const CreateBlogPostPage = lazy(()=> import('./pages/CreateBlogPostPage'))
const EditProfilePage = lazy(()=> import('./pages/EditProfilePage'))
const LoginFormPage = lazy(()=> import('./pages/LoginFormPage'))
const RegisterFormPage = lazy(()=> import('./pages/RegisterFormPage'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const SeniorsProfile = lazy(() => import('./pages/SeniorsProfile'))
const CompanyPage = lazy(() => import('./pages/Categories/CompanyPage'))
const TechnologyPage = lazy(() => import('./pages/Categories/TechnologyPage'))
const ClubesPage = lazy(() => import('./pages/Categories/ClubesPage'))
const GeneralPage = lazy(() => import('./pages/Categories/GeneralPage'))


function App() {  
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path='/:id/confirmation/:token' element={<EmailVerifyPage/>}/>
            <Route path='/*' element={<Navigate to={'/invalidUrl'}/>}/>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/aboutme' element={<AboutMePage/>}/>
            <Route path='/allblogs' element={<AllBlogsPage/>}/>
            <Route path='/singleblog/:id' element={<SingleBlogDetailsPage/>}/>

            <Route path='/company' element={<CompanyPage/>}/>
            <Route path='/technology' element={<TechnologyPage/>}/>
            <Route path='/clubes' element={<ClubesPage/>}/>
            <Route path='/general' element={<GeneralPage/>}/>

            <Route path='/myblogs' element={<PrivateRoute Component={ByIdBlogsPage}/>}/>
            <Route path='/editblog/:id' element={<PrivateRoute Component={EditBlogPostPage}/>}/>
            <Route path='/createblog' element={<PrivateRoute Component={CreateBlogPostPage}/>}/>

            <Route path='/userprofile/:id' element={<SeniorsProfile/>}/>
            <Route path='/editprofile' element={<EditProfilePage/>}/>
            <Route path='/login' element={<LoginFormPage/>}/>
            <Route path='/register' element={<RegisterFormPage/>}/>
            <Route path='/invalidUrl' element={<ErrorPage/>}/>
          </Routes>
      </Suspense>
    </>
  )
}

export default App