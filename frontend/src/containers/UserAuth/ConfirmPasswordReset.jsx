import React, { useEffect, useRef, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { reset_password, verify } from "@/actions/auth";
const ConfirmPasswordReset = ({ error, verify, message, email }) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  });

  const { code1, code2, code3, code4, code5, code6 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const otp = code1 + code2 + code3 + code4 + code5 + code6;
    await verify(otp, email);

    setIsLoading(false);
    
  };
  useEffect(() => {
    if(message){
      if(message.message == "Verification Success"){

        navigate("/resetpassword");
      }
    }
  }, [message]);

  const code1Ref = useRef(null);
  const code2Ref = useRef(null);
  const code3Ref = useRef(null);
  const code4Ref = useRef(null);
  const code5Ref = useRef(null);
  const code6Ref = useRef(null);

  const focusNextInput = (el, prevRef, nextRef) => {
    if (el.value.length === 0) {
      if (prevRef) {
        prevRef.current.focus();
      }
    } else {
      if (nextRef) {
        nextRef.current.focus();
      }
    }
  };

  const handleKeyUp = (e, prevRef, nextRef) => {
    focusNextInput(e.target, prevRef, nextRef);
  };
  return (
    <div className="flex items-center w-full justify-center h-screen">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border border-y-2 border-y-secondary">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
            Enter the code
          </h1>

          <form className="max-w-sm mx-auto" onSubmit={(e) => onSubmit(e)}>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Please introduce the 6 digit code we sent via email.
            </p>
            <div className="flex my-2 space-x-2 rtl:space-x-reverse gap-3">
              <div>
                <label htmlFor="code-1" className="sr-only">
                  First code
                </label>
                <input
                  type="text"
                  maxLength="1"
                  ref={code1Ref}
                  id="code-1"
                  className="block w-11 h-11 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  name="code1"
                  value={code1}
                  onChange={(e) => onChange(e)}
                  onKeyUp={(e) => handleKeyUp(e, null, code2Ref)}
                />
              </div>
              <div>
                <label htmlFor="code-2" className="sr-only">
                  Second code
                </label>
                <input
                  type="text"
                  maxLength="1"
                  ref={code2Ref}
                  id="code-2"
                  className="block w-11 h-11 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  name="code2"
                  value={code2}
                  onChange={(e) => onChange(e)}
                  onKeyUp={(e) => handleKeyUp(e, code1Ref, code3Ref)}
                />
              </div>
              <div>
                <label htmlFor="code-3" className="sr-only">
                  Third code
                </label>
                <input
                  type="text"
                  maxLength="1"
                  ref={code3Ref}
                  id="code-3"
                  className="block w-11 h-11 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  name="code3"
                  value={code3}
                  onChange={(e) => onChange(e)}
                  onKeyUp={(e) => handleKeyUp(e, code2Ref, code4Ref)}
                />
              </div>
              <div>
                <label htmlFor="code-4" className="sr-only">
                  Fourth code
                </label>
                <input
                  type="text"
                  maxLength="1"
                  ref={code4Ref}
                  id="code-4"
                  className="block w-11 h-11 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  name="code4"
                  value={code4}
                  onChange={(e) => onChange(e)}
                  onKeyUp={(e) => handleKeyUp(e, code3Ref, code5Ref)}
                />
              </div>
              <div>
                <label htmlFor="code-5" className="sr-only">
                  Fifth code
                </label>
                <input
                  type="text"
                  maxLength="1"
                  ref={code5Ref}
                  id="code-5"
                  className="block w-11 h-11 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  name="code5"
                  value={code5}
                  onChange={(e) => onChange(e)}
                  onKeyUp={(e) => handleKeyUp(e, code4Ref, code6Ref)}
                />
              </div>
              <div>
                <label htmlFor="code-6" className="sr-only">
                  Sixth code
                </label>
                <input
                  type="text"
                  maxLength="1"
                  ref={code6Ref}
                  id="code-6"
                  className="block w-11 h-11 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  name="code6"
                  value={code6}
                  onChange={(e) => onChange(e)}
                  onKeyUp={(e) => handleKeyUp(e, code5Ref, null)}
                />
              </div>
            </div>
            <div className="flex gap-2 text-[18px] align-middle py-1 flex-col">

              <div className=" italic text-red-500 text-md ">
                {error ? error.error : ""}
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
                  Verify OTP
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
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  message: state.auth.message,
  email: state.auth.email,
});

export default connect(mapStateToProps, { verify })(
  ConfirmPasswordReset
);