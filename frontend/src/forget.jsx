import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { supabase } from "./config";
const Forget = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    email: "",
  });

  // const onChangeHandler=(e)=>{
  //   setform({
  //     email:e.target.value
  //   })
  // }
  const onChangeHandler=(e)=>{
    setform({...form,[e.target.name]:e.target.value});
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!form.email ) {
        toast.error("please fill the email");
        return;
      }

      const response = await supabase.auth.resetPasswordForEmail(form.email,{
      redirectTo:process.env.REACT_APP_URL
      });

      if (response.error) {
        throw error;
      }

    
      // console.log(form);
      navigate("/login");
      setform({
        email: "",
      });

      toast.success("forget password submit")
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <form
            onSubmit={onSubmitHandler}
            className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mx-auto w-full mt-10 md:mt-0"
          >
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Forget password
            </h2>

            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                onChange={onChangeHandler}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Send the code
            </button>
            <p className="text-xs text-gray-500 mt-3">
            Already know {" "}   
              <Link className="text-blue-500" to={"/login"}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Forget;
