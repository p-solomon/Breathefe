import { Link, useLocation, useParams } from "react-router-dom"
import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import { TextField } from '@material-ui/core';
import { Form, ToastBody, ToastHeader } from "react-bootstrap";
import { set } from 'react-hook-form';
import backgroundImage from '../../images/biconvo.svg'
import MessageBody from '../Message/MessageBody';




const InboxBody = () => {

  const userObject = localStorage.getItem("User");
  var userObj = JSON.parse(userObject);
  const senderId = userObj.id;
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const URL = '/userConversations';

  useEffect(() => {
    const intervalId = setInterval(() => {

      const data = JSON.stringify({ senderId });
      axios.post(URL, data, {
        headers: { 'Content-Type': 'application/json' },
        "Accept": 'application/json',
        withCredentials: true
      })
        .then((res) => {
          const sortedMessages = res.data.sort((a, b) => {
            var dateA = new Date(a.messageTime), dateB = new Date(b.messageTime);
            return dateB - dateA;
          });
          setMessages(sortedMessages);
        })
        .catch(err => {
        });
    }, 5 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (

    <div className='pl-48 bg-gray-50 dark:bg-gray-800 2xl:h-[910px] h-screen sm:h-[895px] lg:h-[814px] overflow-y-scroll px-4 grid-cols-1 grid'>

      <div style={{ height: '775px', width: '1265px' }} class="bg-gray-50 sm:p-5">
        <div class="bg-white border border-gray-200 rounded flex h-full">
          <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full">
            <div class="border-b border-gray-200 p-3 relative">
              <button class="flex items-center mx-auto select-none font-semibold text-black focus:outline-none">
                {userObj.firstname}
              </button>
            </div>

            <ul class="py-1 overflow-auto">

              {messages && messages.map(message => (

                <li>
                  <Link to={`/Message/${message.sender.id !== senderId
                    ? message.sender.id
                    : message.receiver.id !== senderId
                      ? message.receiver.id
                      : ""}`}>
                    <button class="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">


                      <div style={{ borderRadius: '100px', width: '100px' }}>
                        <div class="flex items-center justify-center h-10 w-10 rounded-full text-pink-100">

                          {
                            message.sender.id !== senderId
                              ? <img class="w-full h-full rounded-full"
                                src={message.sender.profileUrl ? message.sender.profileUrl : 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='}
                                alt={message.sender.firstname} />
                              : message.receiver.id !== senderId
                                ? <img class="w-full h-full rounded-full"
                                  src={message.receiver.profileUrl ? message.receiver.profileUrl : 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='}
                                  alt={message.receiver.firstname} />
                                : ""
                          }

                        </div>
                      </div>
                      <div style={{ marginLeft: '-26px' }} class="transform translate-y-0.5 text-left">
                        <h3 class="leading-4 text-black">
                          {
                            message.sender.id !== senderId
                              ? message.sender.firstname + " " + message.sender.lastname
                              : message.receiver.id !== senderId
                                ? message.receiver.firstname + " " + message.receiver.lastname
                                : ""
                          }
                        </h3>

                        <span class="text-xs text-gray-500">{message.message.split(' ').slice(0, 4).join(' ')}</span>
                      </div>
                    </button>
                  </Link>
                </li>

              ))}
            </ul>
          </div>

          <div class="hidden sm:w-1/2 md:w-2/3 lg:w-3/4 border-l border-gray-200 sm:flex items-center justify-center text-center">
            <div class="space-y-5">
              <div class="border border-black rounded-full inline-flex p-5 items-center justify-center">
                <svg class="transform translate-y-1" height="52" viewBox="0 0 48 48" width="52">
                  <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l13.2 13c.5.4 1.1.6 1.7.3l16.6-8c.7-.3 1.6-.1 2 .5.4.7.2 1.6-.5 2l-15.6 9.9c-.5.3-.8 1-.7 1.6l4.6 19c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.5-.5.5-1.1.2-1.6z"></path>
                </svg>
              </div>
              <div class="space-y-0.5">
                <h1 class="font-semibold text-xl text-black">Your Messages</h1>
                <p class="text-gray-600 min-w-46">Send private photos and messages to a friend or group</p>
              </div>
              <button class="bg-blue-500 py-1 px-3 rounded text-white select-none focus:outline-none">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default InboxBody;
