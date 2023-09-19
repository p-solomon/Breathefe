import { useState, useRef} from "react";
import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom"
import classnames from 'classnames';
import { Redirect, useHistory } from "react-router-dom";
import logo from '../../images/breathelogo.png'
import logo1 from '../../images/breathelogo1.png'
import axios from "../../api/axios";
import logo2 from '../../images/Breathe.png'

import {Form, ToastBody, ToastHeader} from "react-bootstrap";




const REGISTER_URL = '/userLogin';



const Signin = () => {

    const errRef = useRef();
    const history = useHistory();

    const [email, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');


    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (e) => {
        console.log("here")
        const data = JSON.stringify({email, password})
        console.log(data)
        e.preventDefault();
        // if button enabled with JS hack
   
        try{

            await axios.post(REGISTER_URL,data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    "Accept" : 'application/json',
                    withCredentials: true
                }) .then((result) => {
                    const response = result.data;
                    localStorage.setItem('User', JSON.stringify(response))
                    console.log("response", localStorage.getItem('User'))
                    if(response.userType == "Musician"){
                        if(response.first_time=="Yes"){
                            console.log("USER LOGGED IN FOR THE FIRST TIME")
                        }else {
                            console.log("USER ALREADY LOGGED IN BEFORE")
                        }
                        console.log('Here')
                        history.push("/home")
                    }else{
                        history.push("/home")
                    }
                })

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 500) {
                setErrMsg('Email Or Password invalid');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
}

    return ( 

        <>
      
        <div class=" flex-wrap w-full">
       
               <div class="flex py-0 my-1.5 h-24 justify-center items-center">
       
                      <img class="" src={logo2}>
               </img>
               </div>
       
       
       
       <div class="flex pb-8 flex-col py-14 w-full">
           
           <div class="flex flex-col justify-center items-center">
        
       
               <form class="flex flex-col justify-center items-center pr-7 md:pt-8" onSubmit={handleSubmit}>
            
       
               <div class=" flex-col mb-4">
               <div class="flex relative ">
       
       
                   <input type="text" id="design-login-email" required onChange={(e) => setEmailAddress(e.target.value)} class=" flex-1 appearance-none border border-gray-300 mr-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email Address"/>
       
           
                   </div>
       
                   </div>

                   <div class=" flex-col mb-4">
               <div class="flex relative ">
       
       
                   <input type="password" id="design-login-email" required onChange={(e) => setPassword(e.target.value)} class=" flex-1 appearance-none border border-gray-300 mr-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"/>
       
           
                   </div>
       
                   </div>
            
                   <p ref={errRef} className={errMsg ? "text-xl text-black rounded-lg p-1 relative" : "absolute"} aria-live="assertive">{errMsg}</p>

                           <button type="submit" class="px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                               <span class="w-full">
                                   Submit
                               </span>
                           </button>
                       </form>
                       
                       <div class="pt-4 pb-10 text-black text-center">
                           <p>
                               Don't have an account? 
                               <a href="/register" style={{color:'black'}} className="text-black font-semibold underline">  Register here.</a>
                           </p>
                       </div>
                   </div>
               </div>
           </div>
             </>

     );
}

{/* <div class="flex flex-wrap w-full">
<div class="flex flex-col w-full md:w-1/2">
    <div class="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
        <a href="#" class="p-4 text-xl font-bold text-white bg-black">
            
        </a>
    </div>
    <div class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
        <p class="text-3xl text-center">
            Welcome.
        </p>
        <form class="flex flex-col pt-3 md:pt-8">
            <div class="flex flex-col pt-4">
                <div class="flex relative ">
                    <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                            </path>
                        </svg>
                    </span>
                    <input type="text" id="design-login-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                    </div>
                </div>
                <div class="flex flex-col pt-4 mb-12">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                </path>
                            </svg>
                        </span>
                        <input type="password" id="design-login-password" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"/>
                        </div>
                    </div>
                    <button type="submit" class="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                        <span class="w-full">
                            Submit
                        </span>
                    </button>
                </form>
                <div class="pt-12 pb-12 text-center">
                    <p>
                        Don&#x27;t have an account?
                        <a href="#" class="font-semibold underline">
                            Register here.
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <div class="w-1/2 shadow-2xl">
            <img class="hidden object-cover w-full h-screen md:block" src={logo}/>
        </div>
    </div> */}
export default Signin;