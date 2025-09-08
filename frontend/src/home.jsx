import React from 'react'
import { toast } from 'react-toastify';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './config';


const Home = () => {
const navigate=useNavigate();
const [loading,setLoading]=useState(true);
const [user,setUser]=useState(null);
const fetchUser= async ()=>{
    try {
        const {data:{user},error}=await supabase.auth.getUser();
    //   console.log({response});
             
          if(error){
            toast.error("please login first");
            navigate('/login');
           }

          setUser(user);
          
    } catch (error) {
        toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
}

useEffect(()=>{
fetchUser();
},[]);

if(loading){
    return <div>
        loading...
    </div>
}
const logouthandler=async()=>{
    try {
        const response= await supabase.auth.signOut();
        if (response.error){
            throw error;
        }
        toast.success("logout successfull");
        navigate('/login');
    } catch (error) {
        toast.error(error.message);
    }
}

  return (
    <>
    {/* {JSON.stringify(user)} */}
    <div className="flex min-h-screen items-center justify-center">
        <div className="card border rounded-sm text-2x1 p-5 w-1/2">
            <div className="mb-2">
                <h1>Name:{user.user_metadata.full_name}</h1>
            </div>
            <div className="mb-2">
                <h1>Email:{user.email}</h1>
            </div>
            <div className="mb-3">
            <button onClick={logouthandler} className="px-5 py-2 bg-indigo-500 text-sm rounded-sm">logout</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home;