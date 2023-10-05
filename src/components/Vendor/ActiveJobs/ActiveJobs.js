import axios from "../../../api/axios";
import { useEffect } from 'react';
import { useState } from "react";


const ActiveJobs = () => {
  const GetUserActiveJob = '/getUserActiveJob';
  const confirmActiveJob = '/confirmActiveJob';
  const [hasRequested, setHasRequested] = useState(false);
  const userObject = localStorage.getItem("User");
  var userObj = JSON.parse(userObject);
  const userId = userObj.id;
  const [activeJobs, setActiveJobs] = useState([]);
  const [id, setId] = useState(null);

  console.log(userId)



  if (hasRequested != true) {
    try {
      const data = JSON.stringify({ userId });
      axios.post(GetUserActiveJob, data, {
        headers: { 'Content-Type': 'application/json' },
        "Accept": 'application/json',
        withCredentials: true
      })
        .then((result) => {
          setActiveJobs(result.data)
          setHasRequested(true);
        })
    } catch (err) {
      console.log(err)
    };
  }

  const requestJob = async (id, userId) => {
    console.log(JSON.stringify({ id, userId }));
    try {
      const response = await axios.post(confirmActiveJob,
        JSON.stringify({ id, userId }),
        {
          headers: { 'Content-Type': 'application/json' },
          "Accept": 'application/json',
          withCredentials: true
        }).then((res) => {
          window.location.reload();
        });
    } catch (err) {
      // Handle error
    }
  };

console.log(activeJobs)

  return (

    <div className='pl-44 overscroll-y-none bg-gray-50 dark:bg-gray-800'>

      <div class="pt-6 2xl:h-[910px] h-screen sm:h-[889px] lg:h-[774px] overflow-y-scroll px-4 grid-cols-1 grid bg-slate-100">
      {activeJobs == null || activeJobs.length === 0 ? (
        
          <div class="relative container px-4 mx-auto h-full" data-path="0.2">
            <div class="sm:flex items-start justify-center max-w-5xl mx-auto" data-path="0.2.0">
              <img class="block mb-8 sm:mr-10 md:mr-14" src="saturn-assets/images/http-codes/sad-face-icon.svg" alt="" data-config-id="auto-img-3-5" data-path="0.2.0.0" />
              <div class="max-w-xs md:max-w-sm lg:max-w-2xl mt-12 text-red-700" data-path="0.2.0.1">
                <h1 class="font-heading text-4xl xs:text-6xl md:text-7xl font-bold text-gray-900 mb-6" data-path="0.2.0.1.0">
                </h1>
                <p class="max-w-lg text-xl font-semibold mb-14" data-config-id="auto-txt-3-5" data-path="0.2.0.1.1">Sorry, you have no active jobs!! <br /><br /> Get Searching and Breathe!!</p>
                <a class="relative group inline-block py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden" href="/home" data-path="0.2.0.1.2">
                  <div class="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500" data-path="0.2.0.1.2.0"></div>
                  <span class="relative" data-config-id="auto-txt-4-5" data-path="0.2.0.1.2.1">Take me home</span>
                </a>
              </div>
            </div>
          </div>
        ) : (

          <div>
            {activeJobs && activeJobs.map((activeJob) => (



              <div class="mb-2 h-64 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden" data-path="0.0.4">
                <div class="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40" data-path="0.0.4.0">
                  <div class="flex flex-wrap items-center text-black" data-path="0.0.4.0.0">
                    <h4 class="w-full md:w-auto text-xl font-heading font-medium" data-config-id="auto-txt-30-1" data-path="0.0.4.0.0.1">{activeJob.job.job_name}</h4>
                    <div class="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200" data-path="0.0.4.0.0.2"></div>

                  </div>
                </div>
                <div class="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white" data-path="0.0.4.1">
                  <div class="flex flex-wrap" data-path="0.0.4.1.0">
                    <div class="w-full text-gray-700" data-path="0.0.4.1.0.0">
                      <p class="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose" data-config-id="auto-txt-37-1" data-path="0.0.4.1.0.0.0">Thank you for your successfully procurement of a job, please note that for there to be successfully payment both musician and vendor will have to sign off on the job.
                      </p>
                      <p style={{ color: "red" }}>
                        If there are any issues or disagreement, send an email to admin@breathe.com </p>

                      <div class="-mb-2" data-path="0.0.4.1.0.0.1">
                        <div class="inline-flex w-full mb-2" data-path="0.0.4.1.0.0.1.0">
                          <button
                            style={{ width: "13rem" }}
                            onClick={() => {
                              requestJob(activeJob.id, userId).then(() => {
                                setId(activeJob.id);
                              });
                            }}
                            class="flex items-center h-12 pl-2 pr-6 border-2 border-green-500  text-white bg-blue-700  hover:bg-blue-800  rounded-full" data-path="0.0.4.1.0.0.1.0.0">
                            <div class="flex mr-2 w-8 h-8 items-center justify-center bg-white rounded-full text-green-500" data-path="0.0.4.1.0.0.1.0.0.0">
                              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-16-1" data-path="0.0.4.1.0.0.1.0.0.0.0">
                                <path d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z" fill="currentColor" data-path="0.0.4.1.0.0.1.0.0.0.0.0"></path>
                              </svg>
                            </div>
                            <span
                              class="text-green-500 font-heading font-medium"
                              data-config-id="auto-txt-38-1"
                              data-path="0.0.4.1.0.0.1.0.0.1">
                              <h2>
                                {userObj.id === activeJob.musician.id
                                  ? activeJob.musAccept
                                    ? 'Pending'
                                    : 'Musician Confirm'
                                  : activeJob.venAccept
                                    ? 'Pending'
                                    : 'Vendor Confirm'}
                              </h2>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveJobs;