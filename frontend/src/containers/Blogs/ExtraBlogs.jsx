import React from "react";
import Navbar from "../Navbar/Navbar";
import { NavLink } from "react-router-dom";

const ExtraBlogs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            The Blog
          </h2>
          <p align='justify'>The World Health Organization (WHO) has recognized hearing disabilities as a significant global health issue, emphasizing both the impact of hearing loss on individuals' lives and the need for inclusive healthcare systems. According to WHO, around 1.5 billion people globally are affected by some form of hearing loss, with this number expected to increase due to factors such as aging populations and increased exposure to noise.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <NavLink
            className="bg-slate-50 group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5"
            to='page0'
          >
            <div className="aspect-w-16 aspect-h-11">
              <img
                className="w-full object-cover rounded-xl"
                src="/images/ethnic-couple-pretending-play-air-guitar-camera.jpg"
                alt="Image Description"
              />
            </div>
            <div className="my-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Top 10 Tips for Maintaining Healthy Ears
              </h3>
              <p className="mt-5 text-gray-600">
                Maintaining healthy ears is crucial for overall well-being and
                ensuring that one of our primary senses, hearing, remains sharp
                throughout our lives. Here are the top 10 tips for keeping your
                ears in great shape
              </p>
            </div>
            <div className="mt-auto flex items-center gap-x-3">
              <span className="font-semibold text-gray-800 flex gap-2 items-center">
                <span>
                  <img src="echofy1.png" />
                </span>
                <span>Echofy</span>
              </span>
            </div>
          </NavLink>

          <NavLink
            className="bg-slate-50 group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5"
            to='page1'
          >
            <div className="aspect-w-16 aspect-h-11">
              <img
                className="w-full object-cover rounded-xl"
                src="/images/phone-with-wireless-earbuds.jpg"
                alt="Image Description"
              />
            </div>
            <div className="my-6">
              <h3 className="text-xl font-semibold text-gray-800">
                The Importance of Regular Ear Check-Ups
              </h3>
              <p className="mt-5 text-gray-600">
                Regular ear check-ups are an essential part of maintaining
                overall health and well-being. Here’s why scheduling regular ear
                check-ups should be a priority.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-x-3">
              <span className="font-semibold text-gray-800 flex gap-2 items-center">
                <span>
                  <img src="/echofy1.png" />
                </span>
                <span>Echofy</span>
              </span>
            </div>
          </NavLink>

          <NavLink
            className="bg-slate-50 group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 rounded-xl p-5"
            to='page2'
          >
            <div className="aspect-w-16 aspect-h-11">
              <img
                className="w-full object-cover rounded-xl"
                src="/images/young-woman-with-curly-hair-sitting-cafe.jpg"
                alt="Image Description"
              />
            </div>
            <div className="my-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Understanding Hearing Loss: Symptoms and Solutions
              </h3>
              <p className="mt-5 text-gray-600">
                Hearing loss is a common condition that affects millions of
                people worldwide, yet it often goes unnoticed until it
                significantly impacts daily life. Understanding the symptoms of
                hearing loss and the available solutions is crucial for
                maintaining good ear health and overall quality of life.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-x-3">
              <span className="font-semibold text-gray-800 flex gap-2 items-center">
                <span>
                  <img src="/echofy1.png" />
                </span>
                <span>Echofy</span>
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ExtraBlogs;