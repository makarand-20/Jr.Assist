import { useState, useRef } from 'react';
import JoditEditor from "jodit-react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from 'dompurify';

const categories = [
  { value: 'Company', label: 'Company' },
  { value: 'Technology', label: 'Technology' },
  { value: 'clubs', label: 'Clubs' },
  { value: 'General', label: 'General' },
];

const EditBlogForm = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    //jodit editor
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const [inputs, setInputs] = useState({
        title: "",
        body: "",
        image: "",
        category: "",
    });
      // input change
    const handleChange = (e) => {
    setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
    console.log(inputs.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const cat = inputs.category.replace(/"/g, '');
          const sanitizedHtmlContent = DOMPurify.sanitize(content);
          const { data } = await axios.post("https://jr-assist-server.vercel.app/api/blogs/createblog/", {
            title: inputs.title,
            body: sanitizedHtmlContent,
            image: inputs.image,
            category: cat,
            author: userId,
          });
          if (data) {
            toast.success('👏 Post Created Successfully!');
            navigate("/myblogs");
          }
          else{
            console.log(error);
          }
        } 
        catch (error) {
          // Handle error response
          if (error.response && error.response.data && error.response.data.error) {
            const errorMessage = error.response.data.error;
            setError(errorMessage);
            toast.error(errorMessage);
          } else {
            setError('An error occurred. Please try again later.');
            toast.error('Please fill your profile details first 🥹');
          }
        }
    };

  return (
    <>
    <div className='mt-14 max-w-7xl m-auto'>
        <div className="flex items-center justify-center min-h-screen bg-white shadow-lg rounded-xl">
            <div className="rounded-lg p-8 w-full">
                <form onSubmit={handleSubmit}>
                <div className="mb-10">
                    <label className="text-gray-700 font-medium">Post title</label>
                    <input
                    type="text"
                    value={inputs.title}
                    onChange={handleChange}
                    name='title'
                    className="mt-1 px-4 py-2 border rounded-sm border-gray-400 w-full focus:outline-none focus:border-blue-500"
                    placeholder="Enter the title"
                    required
                    />
                </div>
                <div className="mb-10">
                    <label className="text-gray-700 font-medium mb-4">Blog Description</label>
                    <JoditEditor
                        name='body'
                        ref={editor}
                        value={content}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setContent(newContent)} 
                        onChange={{handleChange}}
                    />
                </div>
                <div className="mb-6">
                    <label className="text-gray-700 font-medium">Image URL</label>
                    <input
                    type="text"
                    name='image'
                    value={inputs.image}
                    onChange={handleChange}
                    className="mt-1 px-4 py-2 border rounded-sm border-gray-400 w-full focus:outline-none focus:border-blue-500"
                    placeholder="Paste your image URL here"
                    required
                    />
                </div>
                <div className='flex justify-center'>
                  <img className='w-100 h-80 shadow-lg rounded-md' src={inputs.image} alt="" />
                </div>
                <div className="mb-6">
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
                    Create Blog Post
                    </button>
                </div>
                </form>
            </div>
        </div>
        </div>
    </>
  );
};

export default EditBlogForm;
