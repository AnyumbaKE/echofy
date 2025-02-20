import React, { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { reset_password } from "@/actions/auth";
const ForgotPassword = ({ error, reset_password, re_email, message }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await reset_password(email);
    navigate("/confirmpasswordreset");
    
    setIsLoading(false);
  };
  
  useEffect(() => {
    if(message){
      if(message.message == "a reset code has been sent"){
        navigate("/confirmpasswordreset");

      }
    }
  }, [message]);
  return (
    <div className="flex items-center w-full justify-center h-screen">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border border-y-2 border-y-secondary">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
            Forgot Your Password?
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            No worries! Fill in your email and we'll send you an OTP to verify
            it's you
          </p>
          <form
            onSubmit={(e) => onSubmit(e)}
            className="space-y-4 md:space-y-2"
          >
            <div className="relative mt-10 flex text-[18px] flex-wrap flex-col">
              <label htmlFor="" className="w-[110px] font-medium">
                Email
              </label>
              <div className="relative my-1">
                <Input
                  type="email"
                  className="w-full rounded-lg border-gray-200 bg-stone-200 p-3 pe-12 text-sm shadow-sm border"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdOutlineMail className="" />
                </span>
              </div>
            </div>

            <div className="flex gap-2 text-[18px] align-middle py-1 flex-col">
              <div className=" italic text-red-500 text-md ">
                {error ? error : ""}
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
                  Reset Password
                </Button>
              )}

              <div className="w-full text-primary text-right mr-4 font-medium text-sm">
                <NavLink to="/login">Back to login</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  re_email: state.auth.email,
  message: state.auth.message,
});

export default connect(mapStateToProps, { reset_password })(ForgotPassword);