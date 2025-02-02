import { change_password, logout } from "@/actions/auth";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import API_URL from "@/url";

const Navbar = ({ logout, user }) => {
  const { toast } = useToast();

  const [errorMessage, setErrorMessage] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  const navigate = useNavigate();
  const fetchQuizzes = async (difficulty) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const id = localStorage.getItem("id");

    const body = JSON.stringify({ id, difficulty });

    try {
      const res = await axios.post(`${API_URL}/quiz`, body, config);
      console.log(res);
      navigate(`/quizz/${difficulty}`);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
    }
  };

  const handleButtonClick = (difficulty) => {
    fetchQuizzes(difficulty);
    localStorage.setItem("current_question", 0);
    const answers = [];
    const stringifiedAnswers = JSON.stringify(answers);
    localStorage.setItem("answers", stringifiedAnswers);
  };

  useEffect(() => {
    if (errorMessage) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }
  }, [errorMessage]);

  const onLogoutClick = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm md:px-10 px-2">
        <nav
          className="mt-3 relative md:max-w-[85rem] w-full mx-0 bg-white border border-gray-200 rounded-[36px] md:mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto dark:bg-neutral-800 dark:border-neutral-700"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <a
              className="flex-none text-xl font-semibold dark:text-white"
              href="#"
              aria-label="Brand"
            >
              Echofy
            </a>
            <div className="md:hidden flex">
              <a
                className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 py-2 md:py-0 md:my-6 md:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500"
                href="#"
              >
                <span>
                  <Sheet>
                    <SheetTrigger className="flex items-center">
                      <svg
                        className="flex-shrink-0 size-4 mx-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </SheetTrigger>
                    <SheetContent className="bg-white">
                      <SheetHeader>
                        <SheetTitle>
                          <span class="font-semibold text-gray-800 flex gap-2 items-center">
                            <span>
                              <img src="/echofy1.png" />
                            </span>
                            <span>Echofy</span>
                          </span>
                        </SheetTitle>
                        <SheetDescription>
                          <div className="flex h-screen flex-col justify-between bg-white">
                            <div className="md:px-4 py-6">
                              <ul className="mt-6 space-y-1">
                                <li>
                                  <a
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 text-left"
                                  >
                                    User Name:{" "}
                                    <span>{user ? user.user : ""}</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 text-left"
                                  >
                                    Email: <span>{user ? user.email : ""}</span>
                                  </a>
                                </li>

                                <li>
                                  <details className="group [&_summary::-webkit-details-marker]:hidden text-left">
                                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                      <span className="text-sm font-medium">
                                        {" "}
                                        Account{" "}
                                      </span>

                                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    </summary>

                                    <ul className="mt-2 space-y-1 px-4">
                                      <li>
                                        <NavLink
                                          to="/changepassword"
                                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                          Change Password
                                        </NavLink>
                                      </li>

                                      <li>
                                        <form action="#">
                                          <button
                                            onClick={() => onLogoutClick()}
                                            type="submit"
                                            className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                          >
                                            Logout
                                          </button>
                                        </form>
                                      </li>
                                    </ul>
                                  </details>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </span>
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button
                    type="button"
                    className="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700"
                    data-hs-collapse="#navbar-collapse-with-animation"
                    aria-controls="navbar-collapse-with-animation"
                    aria-label="Toggle navigation"
                  >
                    <svg
                      className="hs-collapse-open:hidden flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                    <svg
                      className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <NavLink
                      to="/userdashboard"
                      className="py-3 ps-px sm:px-3 font-medium text-green-700 dark:text-blue-500"
                      aria-current="page"
                    >
                      Dashboard
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <NavLink
                      to="/about"
                      className="py-3 ps-px sm:px-3 font-medium text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                      href="#"
                    >
                      About
                    </NavLink>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <a
                      className="py-3 ps-px sm:px-3 font-medium text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                      href="#"
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger>Quiz</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>
                            Choose Difficulty
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleButtonClick("easy")}
                          >
                            Easy
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleButtonClick("medium")}
                          >
                            Medium
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleButtonClick("hard")}
                          >
                            Hard
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <NavLink
                      className="py-3 ps-px sm:px-3 font-medium text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                      to="/blogs"
                    >
                      Blog
                    </NavLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-7">
              <NavLink
                to="/userdashboard"
                className="py-3 ps-px sm:px-3 font-medium text-green-700 dark:text-blue-500"
                aria-current="page"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/about"
                className="py-3 ps-px sm:px-3 font-medium text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                href="#"
              >
                About
              </NavLink>
              <a
                className="py-3 ps-px sm:px-3 font-medium text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                href="#"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger>Quiz</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Choose Difficulty</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleButtonClick("easy")}>
                      Easy
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleButtonClick("medium")}
                    >
                      Medium
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleButtonClick("hard")}>
                      Hard
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </a>
              <NavLink
                className="py-3 ps-px sm:px-3 font-medium text-gray-500 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
                to="/blogs"
              >
                Blog
              </NavLink>

              <a
                className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 py-2 md:py-0 md:my-6 md:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500"
                href="#"
              >
                <span>
                  <Sheet>
                    <SheetTrigger className="flex items-center">
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </SheetTrigger>
                    <SheetContent className="bg-white">
                      <SheetHeader>
                        <SheetTitle>
                          <span class="font-semibold text-gray-800 flex gap-2 items-center">
                            <span>
                              <img src="/echofy1.png" />
                            </span>
                            <span>Echofy</span>
                          </span>
                        </SheetTitle>
                        <SheetDescription>
                          <div className="flex h-screen flex-col justify-between border-e bg-white">
                            <div className="px-4 py-6">
                              <ul className="mt-6 space-y-1">
                                <li>
                                  <a
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                  >
                                    User Name:{" "}
                                    <span>{user ? user.user : ""}</span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                                  >
                                    Email: <span>{user ? user.email : ""}</span>
                                  </a>
                                </li>

                                <li>
                                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                      <span className="text-sm font-medium">
                                        {" "}
                                        Account{" "}
                                      </span>

                                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    </summary>

                                    <ul className="mt-2 space-y-1 px-4">
                                      <li>
                                        <NavLink
                                          to="/changepassword"
                                          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                          Change Password
                                        </NavLink>
                                      </li>

                                      <li>
                                        <form action="#">
                                          <button
                                            onClick={() => onLogoutClick()}
                                            type="submit"
                                            className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                          >
                                            Logout
                                          </button>
                                        </form>
                                      </li>
                                    </ul>
                                  </details>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </span>
              </a>
              <a
                className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 py-2 md:py-0 md:my-6 md:ps-6 dark:text-neutral-400 dark:hover:text-blue-500"
                href="#"
              >
                <span>
                  <AlertDialog>
                    <AlertDialogTrigger>Log out</AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          You are about to logout from this account.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onLogoutClick()}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </span>
              </a>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);