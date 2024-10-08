import Navbar from "@/containers/Navbar/Navbar";
import React from "react";

const Page0 = () => {
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
                            <img src="/favicon-32x32.png" />
                          </span>
                          <span>EarXScore</span>
                        </span>
                      </div>
                    </div>

                    <ul class="text-xs text-gray-500">
                      <li class="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                        June 29
                      </li>
                      <li class="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                        8 min read
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
                Top 10 Tips for Maintaining Healthy Ears
              </h2>

              <p class="text-lg text-gray-800">
                Maintaining healthy ears is crucial for overall well-being and
                ensuring that one of our primary senses, hearing, remains sharp
                throughout our lives. Here are the top 10 tips for keeping your
                ears in great shape:
              </p>
            </div>

            <figure>
              <img
                class="w-full object-cover rounded-xl"
                src="/images/pexels-anastasia-shuraeva-7673858.jpg"
                alt="Image Description"
              />
            </figure>

            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                1. Practice Safe Listening
              </h3>
              Exposure to loud noises can cause permanent damage to your ears.
              Always keep the volume at a safe level, whether you’re listening
              to music through headphones or attending a concert. Use earplugs
              in noisy environments to protect your hearing.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">2. Keep Ears Dry</h3>
              Moisture in the ears can lead to infections. After swimming or
              showering, gently dry your ears with a towel. Tilt your head to
              each side to help any trapped water escape. Consider using
              earplugs while swimming to keep your ears dry.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                3. Avoid Using Cotton Swabs
              </h3>
              Using cotton swabs to clean your ears can push wax deeper into the
              ear canal, potentially causing blockages or damaging the eardrum.
              Instead, clean your ears with a damp cloth or use ear drops to
              soften the wax so it can exit naturally.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                4. Manage Earwax Buildup
              </h3>
              Earwax is a natural defense mechanism that protects the inner ear
              from dust and microorganisms. However, excessive buildup can lead
              to discomfort and hearing loss. Over-the-counter ear drops can
              help manage earwax, but if you experience persistent problems,
              consult a healthcare professional.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                5. Protect Your Ears from Infection
              </h3>
              To avoid ear infections, especially in children, ensure proper
              hygiene. Keep objects and fingers out of your ears to prevent the
              introduction of bacteria. If you experience ear pain, swelling, or
              discharge, seek medical advice promptly.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">6. Stay Hydrated</h3>
              Adequate hydration is essential for overall health, including ear
              health. Drinking plenty of water helps maintain the body’s natural
              fluids, including those that protect and clean your ears.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                7. Exercise Regularly
              </h3>
              Regular exercise improves blood flow to all parts of the body,
              including the ears. Improved circulation ensures that the ears
              receive the necessary nutrients and oxygen to function properly.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                8. Monitor Medications
              </h3>
              Certain medications can affect your hearing. If you are prescribed
              new medication, ask your doctor about any potential side effects
              on your ears. Always follow the prescribed dosage and consult your
              healthcare provider if you notice any changes in your hearing.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">9. Avoid Smoking</h3>
              Smoking and exposure to secondhand smoke can impair ear health,
              contributing to hearing loss and infections. Quitting smoking and
              avoiding smoke-filled environments can significantly improve ear
              health.
            </p>
            <p class="text-lg text-gray-800">
              <h3 className="text-xl font-semibold mb-4">
                10. Regular Check-Ups
              </h3>
              Schedule regular check-ups with your healthcare provider or an
              audiologist to monitor your ear health. Early detection of any
              issues can prevent more serious problems down the line.
            </p>
            <p class="text-lg text-gray-800">
              By following these tips, you can maintain healthy ears and protect
              your hearing for years to come. Prioritizing ear health is a vital
              aspect of overall well-being, ensuring that you continue to enjoy
              the sounds of life without interruption.
            </p>            
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Page0;