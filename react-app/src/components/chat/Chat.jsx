import React, { useEffect, useState } from "react";
import { user } from "../join/Join";
import socketIo from "socket.io-client";
import "./chat.css";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;
console.log("abtest", ENDPOINT)

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = socketIo(ENDPOINT, { transports: ["websocket"] });

  const send = () => {
    console.log("socket send", socket);

    const message = document.getElementById("chatInput").value;
    if (socket) {
      socket.emit("message", { message, id });
      document.getElementById("chatInput").value = "";
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
    });
    console.log("socket",socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("sendMessage", (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message, data.id);
      });
    }

    return () => {
      if (socket) {
        socket.off();
      }
    };
  }, [messages, socket]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Chit Chat</h2>
          <a href="/"><CancelIcon className="cancelIcon" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((message, index) => (
            <Message
              user={message.id === id ? "" : message.user}
              message={message.message}
              classs={message.id === id ? "right" : "left"}
              key={index}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyUp={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            <SendIcon className="sendIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
