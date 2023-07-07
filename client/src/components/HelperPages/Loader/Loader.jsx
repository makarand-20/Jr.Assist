import React from 'react'
import './Loader.css'
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = () => {
  return (
    <>
        <div className='loader-container bg-transparent'>
        <PropagateLoader
            color="rgba(54, 214, 195, 1)"
            cssOverride={{}}
            size={30}
            speedMultiplier={0.5}
            margin={2}
            loading={true}
        />
        </div>
    </>
  )
}
export default Loader