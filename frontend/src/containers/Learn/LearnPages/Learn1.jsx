import Navbar from "@/containers/Navbar/Navbar";
import React from "react";

const Page1 = () => {
  return (
    <div>
      <Navbar />
      <div class="max-w-4xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto my-8 bg-stone-100 flex justify-center rounded-2xl">
        <div class="max-w-2xl">
          <div class="flex justify-between items-center mb-6">
            <div class="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
              <div class="grow">
                <div class="flex justify-between items-center gap-x-2">
                  <div>
                    <div class="hs-tooltip [--trigger:hover] [--placement:bottom] inline-block">
                      <div class="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                        <span class="font-semibold text-gray-800 flex gap-2 items-center">
                          <span>
                            <img src="/echofy1.png" />
                          </span>
                          <span>Echofy</span>
                        </span>
                      </div>
                    </div>

                    <ul class="text-xs text-gray-500">
                      <li class="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                        January 24, 2025
                      </li>
                      <li class="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                        6 min read
                      </li>
                    </ul>
                  </div>

                  <div>
                    <button
                      type="button"
                      class="py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <svg
                        class="size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                      <a href="https://www.x.com" target="_blank">
                        Tweet
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-5 md:space-y-8">
            <div class="space-y-3">
              <h2 class="text-2xl font-bold md:text-3xl">
                The Importance of Regular Ear Check-Ups
              </h2>

              <p class="text-lg text-gray-800">
                Regular ear check-ups are an essential part of maintaining
                overall health and well-being. Ears are complex organs that not
                only enable us to hear but also play a crucial role in balance.
                Neglecting ear health can lead to a range of problems, from
                minor inconveniences to serious medical conditions. Here’s why
                scheduling regular ear check-ups should be a priority:
              </p>
            </div>

            <figure>
              <img
                class="w-full object-cover rounded-xl"
                src="/images/phone-with-wireless-earbuds.jpg"
                alt="Image Description"
              />
            </figure>

            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                Early Detection of Hearing Loss
              </h3>
              Hearing loss often occurs gradually, and many people may not
              notice the early signs. Regular ear check-ups can help detect
              hearing loss in its initial stages, allowing for timely
              intervention. Early detection can prevent further deterioration
              and improve the quality of life by addressing the problem with
              hearing aids, treatments, or lifestyle adjustments.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                Prevention of Ear Infections
              </h3>
              Ear infections are common, especially in children, and can cause
              significant discomfort and potential hearing damage if left
              untreated. Regular check-ups enable healthcare providers to
              identify and treat infections early, preventing complications such
              as chronic ear infections or hearing loss. They can also offer
              advice on how to reduce the risk of infections, such as keeping
              ears dry and avoiding inserting objects into the ear canal.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                Monitoring Earwax Buildup
              </h3>
              Earwax is a natural substance that protects the ear from dust,
              microorganisms, and foreign particles. However, excessive earwax
              can lead to blockages, discomfort, and hearing impairment. During
              a regular check-up, a healthcare professional can safely remove
              excess earwax and offer tips on managing earwax buildup at home,
              ensuring that your ears remain clean and healthy.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                Detection of Serious Conditions
              </h3>
              Regular ear check-ups can help detect more serious conditions,
              such as ear tumors, cysts, or other abnormalities. While these
              conditions are rare, early detection is crucial for effective
              treatment. Routine examinations can also identify issues related
              to balance, which might indicate underlying problems with the
              inner ear or vestibular system.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                Guidance on Hearing Protection
              </h3>
              Exposure to loud noises, whether from music, work environments, or
              recreational activities, can cause permanent hearing damage.
              During a check-up, healthcare providers can offer personalized
              advice on protecting your ears from loud sounds, including the use
              of earplugs and limiting exposure to high decibel levels. This
              guidance is especially important for individuals who work in noisy
              environments or frequently attend loud events.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                Ensuring Overall Ear Health
              </h3>
              Regular check-ups provide an opportunity to discuss any concerns
              or symptoms you may have related to your ears. Whether it’s
              persistent ringing (tinnitus), dizziness, or pain, a healthcare
              professional can assess these symptoms and recommend appropriate
              treatments or further tests. Addressing minor issues before they
              escalate into more significant problems is key to maintaining
              overall ear health.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                Enhancing Quality of Life
              </h3>
              Good ear health contributes significantly to overall quality of
              life. Being able to hear clearly and maintain balance affects
              daily activities, communication, and social interactions. Regular
              ear check-ups help ensure that your ears are functioning
              optimally, allowing you to engage fully in life’s activities
              without the hindrance of hearing or balance issues.
            </p>

            <p class="text-lg text-gray-800">
              In conclusion, regular ear check-ups are a vital aspect of
              preventive healthcare. They help in the early detection and
              treatment of hearing loss, ear infections, and other ear-related
              conditions. By prioritizing regular visits to an audiologist or
              healthcare provider, you can ensure the long-term health and
              functionality of your ears, leading to a better quality of life.
              Don’t wait for problems to arise; make ear check-ups a routine
              part of your healthcare regimen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;