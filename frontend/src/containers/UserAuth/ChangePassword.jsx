import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { change_password } from "@/actions/auth";
import { RiLockPasswordLine } from "react-icons/ri";
import Navbar from "../Navbar/Navbar";
const ChangePassword = ({ error, email, change_password, message, user }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldpassword: "",
    password: "",
    confirmpassword: "",
  });

  const { password, confirmpassword, oldpassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password == confirmpassword) {
      await user;
      await change_password(user.email, oldpassword, password);
      navigate("/");
    } else {
      setErrorMessage("Password and confirm password don't match");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.error);
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (message) {
      setErrorMessage(message.message);
    }
  }, [message]);
  return (
    <div>
      <Navbar/>
    <div className="flex items-center w-full justify-center h-screen">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border border-y-2 border-y-secondary">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
            Enter your new password
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400"></p>
          <form
            onSubmit={(e) => onSubmit(e)}
            className="space-y-4 md:space-y-2"
          >
            <div className="relative my-7 flex flex-wrap text-[18px] flex-col">
              <label htmlFor="" className=" font-medium">
                {" "}
                Old Password
              </label>
              <div class="relative my-1">
                <Input
                  type="password"
                  class="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
                  placeholder="Enter password"
                  name="oldpassword"
                  value={oldpassword}
                  onChange={(e) => onChange(e)}
                  required
                />

                <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <RiLockPasswordLine className="" />
                </span>
              </div>
            </div>
            <div className="relative my-7 flex flex-wrap text-[18px] flex-col">
              <label htmlFor="" className=" font-medium">
                {" "}
                New Password
              </label>
              <div class="relative my-1">
                <Input
                  type="password"
                  class="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />

                <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <RiLockPasswordLine className="" />
                </span>
              </div>
            </div>
            <div className="relative my-7 flex flex-wrap text-[18px] flex-col">
              <label htmlFor="" className=" font-medium">
                {" "}
                Confirm Password
              </label>
              <div class="relative my-1">
                <Input
                  type="password"
                  class="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
                  placeholder="Enter password"
                  name="confirmpassword"
                  value={confirmpassword}
                  onChange={(e) => onChange(e)}
                  required
                />

                <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <RiLockPasswordLine className="" />
                </span>
              </div>
            </div>

            <div className="flex gap-2 text-[18px] align-middle py-1 flex-col">
              <div className=" italic text-red-500 text-md ">
                {errorMessage ? errorMessage : ""}
              </div>
              {isLoading ? (
                <Button disabled className=" bg-muted-foreground text-muted">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full rounded-lg bg-muted-foreground text-muted py-1 transition-colors duration-300 font-medium hover:text-muted-foreground hover:bg-muted "
                >
                  Change Password
                </Button>
              )}

              <div className="w-full text-primary text-right mr-4 font-medium text-sm">
                <NavLink to="/">Back to login</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  email: state.auth.email,
  message: state.auth.message,
  user: state.auth.user,
});

export default connect(mapStateToProps, { change_password })(ChangePassword);