import { useState, useEffect } from "react";
import axios from "../../../api/axios";
import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
import logo2 from '../../../images/Breathe.png'
import { useHistory, Link } from 'react-router-dom';


const ManageJobs = () => {
    const getUserJobs = '/getUserJobs';
    const getAllUsers = '/getAllUsers';
    const sendQuote = '/addJobRequest';
    const profileDailyVisits = '/profileDailyVisits';
    const RecommendUsersJob = '/recommendUsersJob';
    const DeleteJob = '/deleteJob';
    const [hasRequested, setHasRequested] = useState(false);
    const userObject = localStorage.getItem("User");
    var userObj = JSON.parse(userObject);
    const userId = userObj.id;
    const id = userObj.id;
    const [jobs, setJobs] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [jobPrice, setJobPrice] = useState('');
    const [value, setValue] = useState('');
    const [jobId, setJobId] = useState(null);
    const history = useHistory();
    const [job, setJob] = useState(null);
    const [jobStatusFilter, setJobStatusFilter] = useState("ALL");

    const handleWalletClick = () => {
        history.push('/wallet');
    };

    const handleViewAllClick = () => {
        setJobStatusFilter("ALL");
    };

    const handleActiveClick = () => {
        setJobStatusFilter("ACTIVE");
    };

    const handleProgressClick = () => {
        setJobStatusFilter("PROGRESS");
    };

    const handlePastClick = () => {
        setJobStatusFilter("PAST");
    };

    const [selectedOption, setSelectedOption] = useState(null);

    const filteredOptions = allUsers.filter(
        (option) =>
            option.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const totalPages = Math.ceil(jobs.length / itemsPerPage);

    const handlePreviousClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    };


    const toggleModal1 = (job) => {
        setShowModal1(!showModal1);
        setJobId(job.id);
        setJob(job);
    };


    useEffect(() => {
        if (jobId !== null) {
            recommendUsersJob();
        }
    }, [jobId]);

    const toggleModal2 = (job) => {
        setJobId(job.id);
        setShowModal2(!showModal2);
    };

    const toggleModal3 = (job) => {
        setJobId(job.id);
        setShowModal3(!showModal3);
    };

    const handlePrice = (event) => {
        const inputNumber = parseInt(event.target.value);
        if (isNaN(inputNumber)) {
            // Allow an empty input field
            setJobPrice(event.target.value === '' ? '' : value);
        } else {
            setJobPrice(inputNumber.toString());
        }
    };

    const handleQuoteSubmit = async (e) => {

        const receiverId = selectedOption;
        console.log(JSON.stringify({ jobId, receiverId, jobPrice }))

        if (userObj.balance >= job.jobPrice || userObj.balance >= jobPrice) {
            try {
                const response = await axios.post(
                    sendQuote,
                    JSON.stringify({ jobId, receiverId, jobPrice }),
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        Accept: "application/json",
                        withCredentials: true,
                    }).then((res) => {
                        ProfileDailyVisits();
                    })
            } catch (err) {
                console.error(err);
                toast.error("An error occurred. Please try again later.");
            }
        } else {
            toast.custom((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={logo2}
                                    alt=""
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Insufficient Funds
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    Click Button To Lodge Money
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                        <button
                            onClick={handleWalletClick}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Wallet
                        </button>
                    </div>
                </div>
            ))


        }
    };


    const ProfileDailyVisits = async (e) => {

        const id = selectedOption;
        const senderId = userObj.id;

        console.log(JSON.stringify({ id, senderId }))

        try {
            const response = await axios.post(profileDailyVisits,
                JSON.stringify({ id, senderId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    "Accept": 'application/json',
                    withCredentials: true
                }).then((res) => {
                    window.location.reload();
                })

        } catch (err) {

        }
    }

    const recommendUsersJob = async (e) => {

        const id = jobId;

        console.log(JSON.stringify({ jobId }))

        try {
            const response = await axios.post(RecommendUsersJob,
                JSON.stringify({ id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    "Accept": 'application/json',
                    withCredentials: true
                }).then((res) => {
                    console.log(res.data)
                    setUsers(res.data);
                })

        } catch (err) {

        }
    }


    const deleteJob = async (e) => {

        const id = jobId;

        console.log(JSON.stringify({ id }))

        try {
            const response = await axios.post(DeleteJob,
                JSON.stringify({ id }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    "Accept": 'application/json',
                    withCredentials: true
                }).then((res) => {
                    window.location.reload();
                })

        } catch (err) {

        }
    }

    if (hasRequested != true) {

        try {
            const data = JSON.stringify({ userId });
            axios.post(getUserJobs, data, {
                headers: { 'Content-Type': 'application/json' },
                "Accept": 'application/json',
                withCredentials: true
            })
                .then((result) => {
                    setJobs(result.data);
                    setHasRequested(true);
                })
        } catch (err) {
            console.log(err)
        };
    }


    useEffect(() => {

        const data = JSON.stringify({ id });
        // if button enabled with JS hack

        try {

            axios.post(getAllUsers, data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    "Accept": 'application/json',
                    withCredentials: true
                }).then((result) => {
                    setAllUsers(result.data);
                })

        } catch (err) {
            console.log(err)

        }

    }, []);




    const filteredJobs = jobs.filter((job) => {
        return job.job_name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const statusFilteredJobs = jobStatusFilter === "ALL"
        ? filteredJobs
        : filteredJobs.filter((job) => job.jobStatus === jobStatusFilter);

    const jobsLength = statusFilteredJobs.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = statusFilteredJobs.slice(startIndex, endIndex);



    return (

        <div className='pl-44 overscroll-y-none bg-gray-50 dark:bg-gray-800'>

            <div class="pt-6 2xl:h-[890px] h-screen sm:h-[889px] lg:h-[774px] overflow-y-scroll overscroll-x-none overflow-x-hidden px-4 grid-cols-1 grid bg-slate-100">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div class="flex items-center gap-x-3">
                            <h2 class="text-lg font-medium text-gray-800 dark:text-white">All Jobs</h2>

                            <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{jobsLength} {jobStatusFilter} Jobs</span>
                        </div>

                    </div>

                </div>

                <div class="mt-6 md:flex md:items-center md:justify-between">
                    <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                        <button class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                            onClick={handleViewAllClick}
                        >
                            View all
                        </button>

                        <button
                            className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                            onClick={handleProgressClick}
                        >
                            IN PROGRESS
                        </button>

                        <button class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                            onClick={handlePastClick}
                        >
                            Past
                        </button>
                    </div>


                </div>
                {currentJobs.length === 0 ? (
                    <div class="relative container px-4 mx-auto h-full" data-path="0.2">
                        <div class="sm:flex items-start justify-center max-w-5xl mx-auto" data-path="0.2.0">
                            <img class="block mb-8 sm:mr-10 md:mr-14" src="saturn-assets/images/http-codes/sad-face-icon.svg" alt="" data-config-id="auto-img-3-5" data-path="0.2.0.0" />
                            <div class="max-w-xs md:max-w-sm lg:max-w-2xl mt-12" data-path="0.2.0.1">
                                <h1 class="font-heading text-4xl xs:text-6xl md:text-7xl font-bold text-gray-900 mb-6" data-path="0.2.0.1.0">
                                    <span data-config-id="auto-txt-1-5" data-path="0.2.0.1.0.0">Oh no!</span>
                                </h1>
                                <p class="max-w-lg text-xl font-semibold text-gray-500 mb-14" data-config-id="auto-txt-3-5" data-path="0.2.0.1.1">Sorry, you have no jobs created!! <br /><br /> Get Searching and Breathe!!</p>
                                <a class="relative group inline-block py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-900 rounded-full overflow-hidden" href="views/src/components/Vendor/Manage/ManageJobs#" data-path="0.2.0.1.2">
                                    <div class="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500" data-path="0.2.0.1.2.0"></div>
                                    <span class="relative" data-config-id="auto-txt-4-5" data-path="0.2.0.1.2.1">Take me home</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>

                        <div class="flex flex-col mt-6">
                            <div class="-mx-4 -my-2 overflow-x-hidden">
                                <div class="inline-block min-w-full py-2 align-middle">
                                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead class="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        <button style={{ width: "10rem" }} class="flex items-center gap-x-3 focus:outline-none">
                                                            <span>Job</span>

                                                            <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                                <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                                <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                            </svg>
                                                        </button>
                                                    </th>

                                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        Status
                                                    </th>

                                                    <th scope="col" class="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        SEND QUOTE
                                                    </th>


                                                    <th scope="col" class="px-0 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        RECOMMENDED USERS
                                                    </th>


                                                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                        REMOVE JOB
                                                    </th>



                                                    <th scope="col" class="relative py-3.5 px-4">
                                                        <span class="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                                {currentJobs.map((job) => (

                                                    <tr key={job.id}>
                                                        <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <div>
                                                                <h2 class="font-medium text-gray-800 dark:text-white ">{job.job_name}</h2>
                                                            </div>
                                                        </td>
                                                        <td class="px-1 py-4 text-sm font-medium whitespace-nowrap">
                                                            <div class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                                {job.jobStatus}
                                                            </div>
                                                        </td>
                                                        <td onClick={() => toggleModal1(job)} class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                            {job.activeQuote ? (
                                                                <button style={{ width: "6.8rem" }} disabled class="inline-flex items-center mr-16 px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg cursor-not-allowed dark:bg-gray-600">
                                                                    Pending
                                                                </button>
                                                            ) : (
                                                                <a class="inline-flex items-center mr-16 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                    Create Quote
                                                                </a>
                                                            )}
                                                        </td>

                                                        {showModal1 ? (
                                                            <div id="small-modal" tabindex="-1" style={{ paddingLeft: "19.5rem" }} class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                                                                <div class="relative w-full h-full max-w-md md:h-auto">
                                                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                                        <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                                                            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                                                                                Send Quote
                                                                            </h3>


                                                                            <button onClick={toggleModal1} style={{ paddingLeft: "13.5rem" }} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                                                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                                                <span class="sr-only">Close modal</span>
                                                                            </button>
                                                                        </div>

                                                                        <div className="pl-10">
                                                                            <div className="pb-10">
                                                                                <div className="flex" style={{ alignItems: "flex-start", flexDirection: "column" }}>
                                                                                    <label style={{ margin: "0 0 0.2rem", fontSize: "0.8rem", color: "rgba(0,0,0,0.6)" }} className="font-normal">
                                                                                        USER*
                                                                                    </label>
                                                                                    <input
                                                                                        style={{ color: "black" }}
                                                                                        type="text"
                                                                                        placeholder="Search"
                                                                                        className="flex-1 appearance-none border border-gray-300 mr-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-4"
                                                                                        value={searchTerm}
                                                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                                                    />
                                                                                    <select
                                                                                        style={{ color: "black" }}
                                                                                        value={selectedOption}
                                                                                        required
                                                                                        onChange={(e) => setSelectedOption(e.target.value)}
                                                                                    >
                                                                                        <option value="">Select an option</option>
                                                                                        {filteredOptions.map((option) => (
                                                                                            <option key={option.id} value={option.id}>
                                                                                                {option.firstname} ({option.email})
                                                                                            </option>
                                                                                        ))}
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="pb-10">
                                                                                <div className="flex" style={{ alignItems: "flex-start", flexDirection: "column" }}>
                                                                                    <label style={{ margin: "0 0 0.2rem", fontSize: "0.8rem", color: "rgba(0,0,0,0.6)" }} className="font-normal">
                                                                                        Job Price*
                                                                                    </label>
                                                                                    <div className="text-opacity-100 text-red-800 italic text-sm mt-2">
                                                                                        This is optional!! If you want to change job price.
                                                                                    </div>
                                                                                    <input style={{ boxShadow: "inset 0 0 0 1px" }} id="" value={jobPrice} onChange={handlePrice} type="text" className="flex-1 appearance-none border border-gray-300 mr-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
                                                                                </div>

                                                                            </div>
                                                                            <button onClick={handleQuoteSubmit} data-modal-hide="small-modal" type="button" class="mb-4 text-white bg-gray-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Quote</button>

                                                                        </div>

                                                                        <div className="pl-10 mb-4">

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ) : null}

                                                        <td onClick={() => toggleModal2(job)} class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <a class="inline-flex items-center mr-16 px-3 py-2 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                Find
                                                            </a>
                                                        </td>

                                                        <td onClick={() => toggleModal3(job)} class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <a class="inline-flex items-center mr-16 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                Delete
                                                            </a>
                                                        </td>


                                                        {showModal3 ? (
                                                            <div id="small-modal" tabindex="-1" style={{ paddingLeft: "15.5rem" }} class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                                                                <div class="relative w-full h-full max-w-md md:h-auto">
                                                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                                        <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600 mb-4">
                                                                            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                                                                                Delete Job
                                                                            </h3>
                                                                            <button onClick={toggleModal3} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-20 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                                                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                                                <span class="sr-only">Close modal</span>
                                                                            </button>
                                                                        </div>
                                                                        <div role="alert">
                                                                            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                                                                Danger
                                                                            </div>
                                                                            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 mb-12">
                                                                                <p>You are about to delete your job.</p>
                                                                            </div>
                                                                            <button onClick={deleteJob} data-modal-hide="small-modal" type="button" class="text-white bg-red-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-12 ml-12">Delete</button>

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        ) : null}




                                                        {showModal2 ? (
                                                            <div id="small-modal" tabindex="-1" style={{ paddingLeft: "19.5rem" }} class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                                                                <div class="relative w-full h-full max-w-md md:h-auto">
                                                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                                        <div class="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                                                            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                                                                                Send Quote
                                                                            </h3>


                                                                            <button onClick={toggleModal2} style={{ paddingLeft: "13.5rem" }} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
                                                                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                                                <span class="sr-only">Close modal</span>
                                                                            </button>
                                                                        </div>

                                                                        <section data-section-id="1" data-share="" data-category="ta-tables" data-component-id="2f328778_03_awz" class="py-8" data-path="0">
                                                                            <div class="container px-4 mx-auto" data-path="0.0">
                                                                                <div class="p-4 mb-6 bg-white shadow rounded overflow-x-auto" data-path="0.0.0">
                                                                                    <table class="table-auto w-full" data-path="0.0.0.0">
                                                                                        <thead data-path="0.0.0.0.0">
                                                                                            <tr class="text-xs text-gray-500 text-left" data-config-id="row0" data-path="0.0.0.0.0.0">
                                                                                                <th class="pb-3 font-medium" data-config-id="3-col1-2" data-path="0.0.0.0.0.0.1">User</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody data-path="0.0.0.0.1">
                                                                                            <tr class="text-xs bg-gray-50" data-config-id="row1" data-path="0.0.0.0.1.0">
                                                                                                {users.map((user) => (
                                                                                                    <Link to={`/profile/${user.id}`}>

                                                                                                        <td class="flex px-4 py-3 mb-2" data-path="0.0.0.0.1.0.1">
                                                                                                            <img class="w-8 h-8 mr-4 object-cover rounded-md" src={user.profileUrl ? user.profileUrl : 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='} alt={user.firstname} />

                                                                                                            <div data-path="0.0.0.0.1.0.1.1">
                                                                                                                <p class="font-medium text-black" data-config-id="3-col2-22" data-path="0.0.0.0.1.0.1.1.0">{user.firstname} {user.lastname}</p>
                                                                                                                <p class="text-gray-500" data-config-id="3-col2-23" data-path="0.0.0.0.1.0.1.1.1">{user.email}</p>
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </Link>
                                                                                                ))}
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </div>

                                                                            </div>
                                                                        </section>


                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ) : null}

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                Page <span class="font-medium text-gray-700 dark:text-gray-100">{currentPage} of {totalPages}</span>
                            </div>

                            <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
                                <button onClick={handlePreviousClick} disabled={currentPage === 1}>
                                    <a href="views/src/components/Vendor/Manage/ManageJobs#" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                        </svg>

                                        <span>
                                            previous
                                        </span>
                                    </a>
                                </button>

                                <button
                                    onClick={handleNextClick}
                                    disabled={endIndex >= jobs.length}
                                >
                                    <a href="views/src/components/Vendor/Manage/ManageJobs#" class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                        <span>
                                            Next
                                        </span>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

export default ManageJobs;