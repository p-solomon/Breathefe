import { Link, useLocation, useParams } from "react-router-dom"
import { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import { TextField } from '@material-ui/core';
import { Form, ToastBody, ToastHeader } from "react-bootstrap";
import { set } from 'react-hook-form';
import backgroundImage from '../../images/biconvo.svg'
import MessageBody from './MessageBody';
import ConversationList from './MessageConvo';




const MessageConvo = () => {

  const userObject = localStorage.getItem("User");
  var userObj = JSON.parse(userObject);
  const senderId = userObj.id;
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);



  const URL = '/userConversations';

  const handleClick = (userId) => {
    setSelectedUser(userId);
  };



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
          console.log(err);
        });
    }, 5 * 1000);
    return () => clearInterval(intervalId);
  }, [senderId]);

  return (


    <div class="pt-6 2xl:h-[910px] h-screen sm:h-[889px] lg:h-[774px] overflow-y-scroll px-4 grid-cols-1 grid bg-slate-100">

      <div style={{ height: '910px', width: "1911px" }} className='pl-48 fixed bg-gray-50 dark:bg-gray-800'>

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
                    <a
                      href={`/Message/${message.sender.id !== senderId
                        ? message.sender.id
                        : message.receiver.id !== senderId
                          ? message.receiver.id
                          : ""}`}
                      onClick={(event) => {
                        event.preventDefault();
                        window.location.href = `/Message/${message.sender.id !== senderId
                          ? message.sender.id
                          : message.receiver.id !== senderId
                            ? message.receiver.id
                            : ""}`;
                      }}
                    >
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
                    </a>
                  </li>

                ))}
              </ul>
            </div>

            <div class="hidden sm:w-1/2 w-full md:w-2/3 border-l border-gray-200 sm:flex  text-center">
              <div class="space-y-5">

                <MessageBody />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageConvo;
