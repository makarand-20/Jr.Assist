import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PrivateRoute(props) {

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const {Component} = props;

  useEffect(() => {
    if(!isLoggedIn) {
      toast.error('Please login first');
      navigate('/login');
    }
  }, [isLoggedIn, navigate])

  return (
    <>
      {isLoggedIn && <Component/>}
    </>
  )
}

export default PrivateRoute