import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login, signup } from "../../actions/auth";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Reg = ({ signup, isAuthenticated, error, login }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });


  const { name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password === re_password) {     
        signup(name, email, password, re_password);
    }
    else {
      setErrorMessage("Password and Confirm password doesn't match");
      setIsLoading(false);
    }

  };

  useEffect(() => {
    if (error) {
      if (error == "OK"){
        login(email, password);
      }else{
        setErrorMessage(error.error);
        setIsLoading(false);
      }
        setIsLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
        setIsLoading(false);
        navigate("/userdashboard");
    }
  }, [isAuthenticated]);



  return (
    <div className="flex justify-center items-center rounded my-10 w-[100%] min-h-screen px-6">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border border-y-2 border-y-secondary">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
            Create Account
          </h1>
        <form
          onSubmit={(e) => onSubmit(e)}
          className="space-y-4 md:space-y-6"
        >
          <div className="relative mt-2 flex text-[18px] flex-wrap flex-col">
            <label htmlFor="" className="w-[110px] font-medium">
              User Name
            </label>
            <div className="relative my-1">
            <Input
              type="text"
              className="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
              placeholder="user name"
              required
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <FaRegUser className=" absolute top-4 right-4" />

            </span>
            </div>
          </div>
          <div className="relative my-2 flex text-[18px] flex-wrap flex-col">
            <label htmlFor="" className="w-[110px] font-medium">
              Email
            </label>
            <div className="relative my-1">
            <Input
              type="email"
              className="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
              placeholder="email"
              required
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <MdOutlineMail className="absolute top-4 right-4" />

            </span>

            </div>
          </div>
          <div className="relative my-2 flex flex-wrap text-[18px] flex-col">
            <label htmlFor="" className="w-[110px] font-medium">
              {" "}
              Password
            </label>
            <div className="relative my-1">
            <Input
              type="password"
              className="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <RiLockPasswordLine className="absolute top-4 right-4" />

            </span>

            </div>
          </div>

          <div className="relative my-2 flex flex-wrap text-[18px] flex-col ">
            <label htmlFor="" className="font-medium">
              Confirm Password
            </label>
            <div className="relative my-1">
            <Input
              type="password"
              className="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
              placeholder="password"
              name="re_password"
              value={re_password}
              onChange={(e) => onChange(e)}
              required
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <RiLockPasswordLine className="absolute top-4 right-4" />

            </span>

            </div>
          </div>

          <div className="flex gap-4 text-[18px] align-middle py-3 flex-col ">
            <div className="italic text-lg text-red-500">
              {errorMessage}
            </div>
            
            {isLoading? <Button disabled className=' bg-muted-foreground text-muted'>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
              </Button> : <Button
              type="submit"
              className="w-full rounded-lg bg-muted-foreground text-muted py-1 transition-colors duration-200 font-medium hover:bg-background hover:text-primary"
            >
              Sign Up
            </Button>}
          
          </div>
          <div className="text-lg py-8 font-medium">
            <p>
              {" "}
              Already have Account?{" "}
              <NavLink to="/" className="text-primary cursor-pointer">
                Login
              </NavLink>
            </p>
          </div>
        </form>

        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, { signup, login })(Reg);