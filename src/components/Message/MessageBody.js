import logo from '../../images/logo1.png'
import { Link, useLocation, useParams } from "react-router-dom"
import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import { TextField } from '@material-ui/core';
import { Form, ToastBody, ToastHeader } from "react-bootstrap";
import { set } from 'react-hook-form';
import { ReactComponent as DownArrow } from '../../images/down-arrow.svg'
import { useWindowScroll } from "react-use";



const MessageBody = () => {
    const { id } = useParams();
    const [receiverId, setReceiverId] = useState(id);
    const userId = receiverId;
    const [userInfo, setUserInfo] = useState({});
    const [hasRequested, setHasRequested] = useState(false);
    const userObject = localStorage.getItem("User");
    var userObj = JSON.parse(userObject);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const senderId = userObj.id;
    const URL = '/userMessages';
    const userURL = '/userInfo';
    const messageURL = '/addMessage';



    useEffect(() => {
        if (receiverId) {
            const intervalId = setInterval(() => {
                const data = JSON.stringify({ senderId, receiverId });
                axios.post(URL, data, {
                    headers: { 'Content-Type': 'application/json' },
                    "Accept": 'application/json',
                    withCredentials: true
                })
                    .then((res) => {
                        const sortedMessages = res.data.sort((a, b) => {
                            var dateA = new Date(a.messageTime), dateB = new Date(b.messageTime);
                            return dateA - dateB;
                        });
                        setMessages(sortedMessages);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }, 0.05 * 1000);
            return () => clearInterval(intervalId);
        }
    }, [receiverId]);
    

    if (hasRequested != true) {
        const data = JSON.stringify({ userId });
        axios.post(userURL, data, {
            headers: { 'Content-Type': 'application/json' },
            "Accept": 'application/json',
            withCredentials: true
        })
            .then((res) => {
                console.log(res)
                setUserInfo(res.data);
                setHasRequested(true);
            })
            .catch(err => {
            });
    }

    const handleSubmit = async (e) => {
        const data = JSON.stringify({ senderId, receiverId, message })
        e.preventDefault();
        // if button enabled with JS hack
        
            await axios.post(messageURL, data,
                {
                    headers: { 'Content-Type': 'application/json' },
                    "Accept": 'application/json',
                    withCredentials: true
                }).then((res) => {
                    setMessage('')
                })
    
    }

    const containerRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const containerEl = containerRef.current;
      if (!containerEl) return;
  
      const handleScroll = () => {
        setIsScrolled(containerEl.scrollTop > 0);
      };
  
      containerEl.addEventListener('scroll', handleScroll);
  
      return () => {
        containerEl.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleScrollToTop = () => {
      const containerEl = containerRef.current;
      if (containerEl) {
        containerEl.scrollTo({ top: 10000, behavior: 'smooth' });
      }
    };
  

    return (

        <>
        
            <div style={{ paddingTop: '-2.5rem' }} class="flex flex-row h-screen antialiased text-gray-800">
                
                <div style={{ height: '714px', paddingBottom: '1.5rem' }} class="flex flex-col h-full w-full bg-white px-4">

                {userInfo && userInfo.firstname && userInfo.lastname &&


                    <div class="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
                        <div class="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                        <img class="w-full h-full rounded-full"
                                                                    src={userInfo.profileUrl ? userInfo.profileUrl : 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='}
                                                                    alt={userInfo.firstname} />
                        </div>
                      
                        <div class="flex flex-col ml-3">
                        <Link to={`/profile/${userInfo.id}`}>

                            <div class="font-semibold text-sm">{userInfo.firstname} {userInfo.lastname}</div>
                            <div class="text-xs text-gray-500">Active</div>
                            </Link>
                        </div>

                    </div>
                            }

                    <div class="h-full overflow-hidden py-4">
                        <div ref={containerRef} class="h-full overflow-y-auto">


                    

                        {messages && messages.map(message => (

                            <div class="grid grid-cols-12 gap-y-2">



                                {message.sender.id === senderId ? (
                                          <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                          <div class="flex items-center justify-start flex-row-reverse">
                                              <div
                                                  class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                              >
                                                  <img class="w-full h-full rounded-full"
                                                                          src={message.sender.profileUrl ? message.sender.profileUrl : 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='}
                                                                          alt={message.sender.firstname} />
      
                                              </div>
                                              <div
                                                  class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                              >
                                                  <div>
                                                      {message.message}
                                                  </div>
                                                  <div
                                                      class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                                                  >
                                                      Seen
                                                  </div>
                                              </div>
      
      
                                          </div>
                                      </div>
                          

                                ) : (

                                    <div class="col-start-1 col-end-8 p-3 rounded-lg">

               
                                    <div class="flex flex-row items-center">
                                        <div
                                            class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                        >
                                              <img class="w-full h-full rounded-full"
                                                                    src={message.sender.profileUrl ? message.sender.profileUrl : 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='}
                                                                    alt={message.sender.firstname} />
                                        </div>
                                        <div
                                            class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                        >

                                            <div>{message.message}</div>
                                        </div>
                                    </div>
                                </div>
                                )}

                            </div>
                            
                        ))}


                        </div>

                    </div>

                    


                    <div class="flex flex-row items-center">
                        <div class="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
                            
                            <div class="w-full">
                                
                                <input type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    class="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" placeholder="Type your message...." />


                            </div>

                        </div>
                        <div class="ml-6">
                            <button onClick={handleSubmit} class="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white">
                                <svg class="w-5 h-5 transform rotate-90 -mr-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>

                    {isScrolled && (
                    <div className="scroll-to-top">
                        <button style={{width:"4rem"}} className='text-black' onClick={handleScrollToTop}>
                        <DownArrow className="w-6 h-8 text-gray-800" />
                        </button>
                    </div>
                    )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default MessageBody;
