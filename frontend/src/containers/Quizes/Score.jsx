import getFeedbackMessage from "@/feedback";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Score = () => {
  const { result } = useParams();
  const [feedback, setFeedback] = useState(getFeedbackMessage(result));

  console.log(feedback)
  return (
    <div>
      <Navbar/>
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto min-h-screen">
        <div class="max-w-2xl mx-auto mb-5 lg:mb-7 bg-stone-800 h-24 rounded-xl flex items-center justify-center">
          <h2 class="text-2xl font-bold md:text-4xl md:leading-tight ">
            <div className="text-center text-yellow-400">
              Your Score is {result} out of 10
            </div>
          </h2>
        </div>

        <div class="max-w-2xl mx-auto divide-y divide-gray-200 bg-slate-50 p-11 rounded-3xl">
          {result === "10"?
            <div class="py-8 first:pt-0 last:pb-0">
            <div class="flex gap-x-5">
              <svg
                class="flex-shrink-0 mt-1 size-6 text-gray-500"
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
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>

              <div>
                <h3 class="md:text-lg font-semibold text-gray-800">
                  {feedback[0]}
                </h3>
                <p class="mt-1 text-gray-500">
                  
                </p>
              </div>
            </div>
          </div>
          : 
            feedback.map((parag, index) => {
              return (
                <div key={index}>
                  <div class="py-8 first:pt-0 last:pb-0">
                    <div class="flex gap-x-5 py-2">
                      <svg
                        class="flex-shrink-0 mt-1 size-6 text-gray-500"
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
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                      </svg>
  
                      <div>
                        <h3 class="md:text-lg font-semibold text-gray-800">
                          {parag[0]}
                        </h3>
                        <p class="mt-1 text-gray-500">
                          {parag[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Score;