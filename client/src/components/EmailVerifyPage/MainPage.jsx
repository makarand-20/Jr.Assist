import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


const MainPage = () => {
    const [verified, setVerified] = useState(false)
    const param = useParams()

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const url = (`https://jr-assist-server.vercel.app/api/users/${param.id}/confirmation/${param.token}`);
                const {data} = await axios.get(url)
                console.log(data)
                setVerified(true)
                
            } catch (err) {
                console.log(err)
                setVerified(false)
            }
        }
        verifyEmail()
    }, [param.id, param.token])


    return (
        <>
        {verified ?
            (
                <main className="grid min-h-full place-items-center bg-white px-6 py-72 sm:py-72 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">✅</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Successful</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Email Verification Successful!</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">

                    <Link to={'/allblogs'} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Go Back </Link>
                 </div>
                </div>
                </main>
            ):
            (
                <main className="grid min-h-full place-items-center bg-white px-6 py-72 sm:py-72 lg:px-8">
                <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">✅</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Successful</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Email Verification Successful!</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">

                <Link to={'/allblogs'} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Go Back </Link>
                </div>
                </div>
                </main>
            
            )
        }
        </>
    )
}

export default MainPage