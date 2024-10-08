import React from "react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <header className="fixed top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
        <nav
          className="relative max-w-[66rem] w-full bg-stone-800 rounded-[28px] py-3 ps-5 pe-2 flex items-center justify-between md:py-1 mx-2 lg:mx-auto border border-stone-400"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <p className="text-stone-50 font-bold text-lg">Echofy</p>
          </div>

          <div
            id="navbar-collapse"
            className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow"
          >
            <div className="flex flex-row items-center justify-end md:py-0 md:ps-7">
              <div className="hidden md:block md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-7">

              <a
                className="py-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-none focus:text-neutral-300"
                href="#approach"
              >
                Approach
              </a>
              <a
                className="py-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-none focus:text-neutral-300"
                href="#services"
              >
                Services
              </a>
              <a
                className="py-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-none focus:text-neutral-300"
                href="#about"
              >
                About
              </a>
              <a
                className="py-3 ps-px sm:px-3 md:py-4 text-sm text-white hover:text-neutral-300 focus:outline-none focus:text-neutral-300"
                href="#team"
              >
                Team
              </a>
              </div>


              <div>
                <NavLink
                  className="group inline-flex items-center gap-x-2 py-2 px-3 bg-primary text-primary-foreground font-medium text-sm text-neutral-800 rounded-full focus:outline-none"
                  to='/signup'
                >
                  Get Started
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;