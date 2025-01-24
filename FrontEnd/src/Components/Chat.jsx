import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import profile_icon from "../Assets/profile_icon.jpg"
import { useSelector } from 'react-redux';
import { BASE_URL, createSocketConnection } from '../Utils/Constants';
import axios from 'axios';

const Chat = () => {

  const targetUserId = useParams().targetUserId;
  const [targetUser,setTargetUser]=useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessage] = useState([]);
  const user = useSelector((store) => store.userReducer);
  const { firstName, _id } = user;
  const userId = _id;

const fetchChat=async ()=>{
  let chatResponse = await axios.get(BASE_URL+'chat/'+targetUserId,{
    withCredentials:true,
  });

  let chat=chatResponse.data.chat.messages.map((msg)=>{
    return{
      firstName:msg.senderId.firstName,
      text:msg.text
    }
  })
  setMessage(chat);
  setTargetUser(chatResponse.data.targetUser);
}

const messagesEndRef = useRef(null); // Ref for the bottom of the chatbox

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(()=>{
    fetchChat();
  },[])

  let socket;
  useEffect(() => {
    socket = createSocketConnection();
    socket.emit('joinChat', { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + ':' + text);
      setMessage((prevMsg) => [...prevMsg, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    }
  }, [firstName, userId, targetUserId]);


  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstName, userId, targetUserId, text: newMessage });
    setNewMessage('')
  }
  return (
    <div className='text-sm lg:text-base border border-gray-600 rounded-lg p-4 w-full md:w-2/3 mx-auto mt-4 flex flex-col min-h-[70vh] max-h-[85vh]'>
      <div className='flex items-center gap-2 border-b border-gray-600 pb-3'>
        <img src={targetUser.imageUrl} alt="profile" className='w-9 h-9 rounded-full' />
        <p>{targetUser.firstName}</p>
      </div>
      <div className="flex-1 overflow-y-scroll mt-1 space-y-3 chat-container">
        {messages.map((msg, index) => {
          const PreviousFirstName = messages[index - 1]?.firstName;
          const NextFirstName = messages[index + 1]?.firstName; // Check the next message's sender
          const isLastMessageFromUser = NextFirstName !== msg.firstName; // Determine if it's the last message by this user

          return (
            <div
              key={index}
              className={`flex ${firstName === msg.firstName ? "justify-end" : "justify-start"
                }`}
            >
              <div className="max-w-[75%]">
                {/* Show sender's name only if it's a new sender */}
                {PreviousFirstName !== msg.firstName && (
                  <p
                    className={` ${firstName === msg.firstName ? "text-right" : "text-left"
                      } text-gray-400 mb-1 text-xs lg:text-sm`}
                  >
                    {msg.firstName}
                  </p>
                )}
                <div
                  className={`${firstName === msg.firstName
                      ? "bg-primary text-white"
                      : "bg-gray-600"
                    } ${PreviousFirstName === msg.firstName
                      ? "rounded-t-lg rounded-b-md"
                      : "rounded-lg"
                    } py-1 px-3 mx-2`}
                >
                  {msg.text}
                </div>
                {/* Display "Seen" only on the last message from the same user */}
                {isLastMessageFromUser && firstName === msg.firstName && (
                  <p className="text-xs text-gray-400 mt-1">seen</p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>


        <div className='border border-gray-600 rounded-md flex justify-between items-center mt-2'>
          <input type="text" value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }} placeholder='Type message' className='flex-1 h-full px-3 bg-transparent rounded-md outline-none border-none' />
          <button className='text-primary px-4 py-2 rounded-lg ml-2' onClick={() => { sendMessage() }}>send</button>
      </div>
    </div>
  )
}

export default Chat
