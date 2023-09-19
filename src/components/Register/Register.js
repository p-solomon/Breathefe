import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "@material-ui/core";
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Country, State, City } from "country-state-city";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"
import PhoneInput from "react-phone-input-2";
import 'react-toastify/dist/ReactToastify.css';

import "react-phone-input-2/lib/style.css";

import axios from "../../api/axios";
import logo from '../../images/lgback.png'
import logo1 from '../../images/darkimage.png'
import logo2 from '../../images/Breathe.png'
import { Form, ToastBody, ToastHeader } from "react-bootstrap";


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;
const REGISTER_URL = '/addUser';



const Register = () => {

    const errRef = useRef();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [password, setPwd] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [country, setSelectedCountry] = useState('');
    const [state, setSelectedState] = useState('');
    const [city, setSelectedCity] = useState('');
    const [postcode, setPostCode] = useState('');

    const history = useHistory();

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [matchFocus, setMatchFocus] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const handleChange = (value, country, event, formattedValue) => {
        setPhone(formattedValue);
    };

    useEffect(() => {
        const getCountries = async () => {
            try {
                setIsLoading(true);
                const result = await Country.getAllCountries();
                let allCountries = [];
                allCountries = result?.map(({ isoCode, name }) => ({
                    isoCode,
                    name
                }));
                const [{ isoCode: firstCountry } = {}] = allCountries;
                setCountries(allCountries);
                setSelectedCountry(firstCountry);
                setIsLoading(false);
            } catch (error) {
                setCountries([]);
                setIsLoading(false);
            }
        };

        getCountries();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            try {
                const result = await State.getStatesOfCountry(country);
                let allStates = [];
                allStates = result?.map(({ isoCode, name }) => ({
                    isoCode,
                    name
                }));
                const [{ isoCode: firstState = '' } = {}] = allStates;
                setCities([]);
                setSelectedCity('');
                setStates(allStates);
                setSelectedState(firstState);
            } catch (error) {
                setStates([]);
                setCities([]);
                setSelectedCity('');
            }
        };

        getStates();
    }, [country]);

    useEffect(() => {
        const getCities = async () => {
            try {
                const result = City.getCitiesOfState(
                    country,
                    state
                );
                let allCities = [];
                allCities = result?.map(({ name }) => ({
                    name
                }));
                const [{ name: firstCity = '' } = {}] = allCities;
                setCities(allCities);
                setSelectedCity(firstCity);
            } catch (error) {
                setCities([]);
            }
        };

        getCities();
    }, [state]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidEmail(EMAIL_REGEX.test(email));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd, email])

    useEffect(() => {
        setErrMsg('');
    }, [password, matchPwd, email])

    const handleSubmit = async (e) => {
        const data = JSON.stringify({ firstname, lastname, email, phone, address, country, state, city, password, postcode })
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    "Accept": 'application/json',
                    withCredentials: true
                }).then((result) => {
                    const response = result.data;
                    if (response.userType == "Musician") {
                        console.log('Here')
                    } else {
                        console.log('Not here')
                    }
                    console.log(response.userType)
                    history.push("/login")
                })

            setFirstName('');
            setLastName('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 500) {
                setErrMsg('User Already Registered, Sign in Below');
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



                <div class="flex pb-4 flex-col py-10 w-full">

                    <div class="flex flex-col justify-center items-center">


                        <form class="flex flex-col justify-center items-center pr-7 md:pt-8" onSubmit={handleSubmit}>


                            <div class=" flex-col w-1/2  mb-4">
                                <div class="flex relative ">



                                    <input type="text" id="design-login-email" required onChange={(e) => setFirstName(e.target.value)} class=" flex-1 appearance-none border border-gray-300 mr-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="First Name" />

                                    <input type="text" id="design-login-email" required onChange={(e) => setLastName(e.target.value)} class=" flex-1 appearance-none border border-gray-300 mr-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Second Name" />


                                </div>

                            </div>


                            <div class=" flex-col w-1/2">
                                <div class="flex relative ">


                                    <input type="text" id="design-login-email" required onChange={(e) => setEmail(e.target.value)} class=" flex-1 appearance-none border border-gray-300 mr-3 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email Address" />

                                    <label>
                                        Phone
                                        <PhoneInput
                                            country={"ie"}
                                            className="text-black"
                                            value={phone}
                                            onChange={(value, country, event, formattedValue) =>
                                                handleChange(value, country, event, formattedValue)
                                            }
                                            required
                                           ></PhoneInput>
                                    </label>
                                </div>

                            </div>


                            <div class="flex flex-col w-1/2 pt-4 mb-4">
                                <div class="flex relative ">

                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-green-700 mx-1" : "hidden"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hidden" : "text-red-800 mx-1"} />
                                    <input type="password" id="design-login-password"
                                        onBlur={() => setMatchFocus(false)}
                                        required onChange={(e) => setPwd(e.target.value)}
                                        aria-invalid={validPwd ? "false" : "true"}
                                        class=" flex-1 appearance-none border border-gray-300 mr-3 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter Password" />


                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "text-green-700 mx-1" : "hidden"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hidden" : "text-red-800 mx-1"} />
                                    <input type="password" id="design-login-password"
                                        required
                                        onChange={(e) => setMatchPwd(e.target.value)}
                                        aria-invalid={validMatch ? "false" : "true"}
                                        class=" flex-1 appearance-none border border-gray-300  bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Confirm Password" />
                                </div>

                            </div>

                            <div class="flex flex-col w-1/2 mb-12">
                                <div class="flex relative ">
                                    <div className="text-black">
                                        <p id="confirmnote" className={matchFocus && !validMatch ? "text-xl rounded-lg p-1 relative" : "absolute"}>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            Must match the first password input field.
                                        </p>

                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col w-1/2 mb-12">
                                <div class="flex relative ">

                                    <Select
                                        className="mr-3.5"
                                        as="select"
                                        name="country"
                                        value={country}
                                        onChange={(event) => setSelectedCountry(event.target.value)}>

                                        {countries.map(({ isoCode, name }) => (
                                            <option value={isoCode} key={isoCode}>
                                                {name}
                                            </option>
                                        ))}
                                    </Select>


                                    <Select
                                        as="select"
                                        name="state"
                                        value={state}
                                        onChange={(event) => setSelectedState(event.target.value)}
                                    >
                                        {states.length > 0 ? (
                                            states.map(({ isoCode, name }) => (
                                                <option value={isoCode} key={isoCode}>
                                                    {name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" key="">
                                                No state found
                                            </option>
                                        )}
                                    </Select>


                                </div>
                            </div>

                            <div class="pl-14">
                                <button type="submit" class="px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                                    <span class="w-full">
                                        Submit
                                    </span>
                                </button>
                            </div>
                            <p ref={errRef} className={errMsg ? "text-xl text-black rounded-lg p-1 relative" : "absolute"} aria-live="assertive">{errMsg}</p>

                        </form>
                        <div class="pt-12 pb-12 pr-10 text-black text-center">
                            <p>
                                Have an account?
                                <a href="/login" style={{ color: 'black' }} className="text-black font-semibold underline">  Login here.</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}


export default Register