import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
import Loader from '../../HelperPages/Loader/Loader';


const EditBlogForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [inputs, setInputs] = useState({
      title: '',
      body: '',
      image: '',
    });
    const navigate = useNavigate();
    //get a blog id from params
    const param = useParams()

    //get blogs
    const getOneBlog = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/singleblog/${param.id}`);
            if (data) {
              setInputs(data.blog);
              setIsLoading(false);
            }
        }
        catch (error) {
        console.log(error);
        }
    };
    useEffect(() => {
        getOneBlog();
    }, []);


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.post(`https://jr-assist-server.vercel.app/api/blogs/updateblog/${param.id}`, inputs);
            if (data) {
                toast.success("Blog Updated Successfully 👍");
                navigate(`/myblogs`);
            }
            else{
                toast.error(error);
            }
        } catch (error) {
            // Handle error response
            if (error.response && error.response.data && error.response.data.error) {
              const errorMessage = error.response.data.error;
              setError(errorMessage);
              toast.error(errorMessage);
            } else {
              setError('An error occurred. Please try again later.');
              toast.error('Blog Not Updated');
            }
          }
    };

    const categories = [
        { value: 'Company', label: 'Company' },
        { value: 'Technology', label: 'Technology' },
        { value: 'clubs', label: 'Clubs' },
        { value: 'General', label: 'General' },
      ];

  return (
    <>
        {isLoading ? (
            <Loader/>
        ):(
            <div className='mt-14 max-w-7xl m-auto'>
            <div className="flex items-center justify-center pt-10 bg-white shadow-lg rounded-xl">
                <div className="rounded-lg p-8 w-full">
                    <form onSubmit={handleSubmit}>
                    <div className="mb-10">
                        <label className="text-gray-700 font-medium">Post title</label>
                        <input
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                        type="text"
                        className="mt-1 px-4 py-2 border rounded-sm border-gray-400 w-full focus:outline-none focus:border-blue-500"
                        placeholder="Enter the title"
                        required
                        />
                    </div>
                    <div className="mb-10">
                        <label className="text-gray-700 font-medium">Image URL</label>
                        <input
                        type="text"
                        name="image"
                        value={inputs.image}
                        onChange={handleChange}
                        className="mt-1 px-4 py-2 border rounded-sm border-gray-400 w-full focus:outline-none focus:border-blue-500"
                        placeholder="Enter the image URL"
                        required
                        />
                    </div>
                    <div className='flex justify-center'>
                        <img className='w-100 h-80 shadow-lg rounded-md' src={inputs.image} alt="" />
                    </div>
                    <div className="mb-20">
                        <label className="text-gray-700 font-medium">Category</label>
                        <select
                        name='category'
                        onChange={handleChange}
                        className="mt-1 px-4 py-2 border rounded-lg border-gray-400 w-full focus:outline-none focus:border-blue-500"
                        placeholder='Select a category'
                        defaultValue=""
                        required
                        >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                            {category.label}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-center my-10">
                        <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg focus:outline-none"
                        >
                        Save Changes
                        </button>
                    </div>
                    </form>
                </div>
            </div>
            </div>
        )}
    </>
  );
};

export default EditBlogForm;
