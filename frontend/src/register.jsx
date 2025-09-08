import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useState } from 'react';
import {supabase} from './config'
const Register = () => {
const navigate=useNavigate();
  const [form,setform]=useState({
    name:'',
    email:'',
    password:''
  })

  const onChangeHandler=(e)=>setform({...form,[e.target.name]:e.target.value});
  const onSubmitHandler= async(e)=>{
    e.preventDefault();
    try {
      if(!form.email||!form.password||!form.name){
        toast.error("please fill all fields");
        return;
      }

      const response=await supabase.auth.signUp({
   email:form.email,
   password:form.password,

   options:{
    data:{
      full_name:form.name  
    }
   }

      });
// console.log("Response from Supabase: ", response);
if (response.error) {
  console.error("Error message: ", response.error.message);
  toast.error(response.error.message);
  return;
}

     
        toast.success("form submitted");
        console.log(form);
        navigate("/login");
        setform({
          name:'',
          email:'',
          password:''
        })
     
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
         
          <form onSubmit={onSubmitHandler} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign up</h2>
         
  <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={onChangeHandler}
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input onChange={onChangeHandler}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
               <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input onChange={onChangeHandler}
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Sign up
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Already have an account ? <Link  className='text-blue-500' to={'/login'}>Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
