import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button } from "@mui/material";


//! const socket = io(import.meta.env.VITE_API_URL);
const token = localStorage.getItem("authToken");

function ChatPage() {
  const { connectionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/messages/${connectionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMessages(response.data))
      .catch((error) => console.log(error));

    //! socket.emit("join_room", connectionId);

    //! socket.on("new_message", (message) => {
    //!  setMessages((prev) => [...prev, message]);
  //!  });
  }, []);
  const sendMessage = () => {
  if (!text.trim()) return;
  //!socket.emit("send_message", {
  //!  connectionId,
  //!  senderId: user._id,
  //!  text
  //!});
  setText("");
}; 
  return (
  <div>
    <div>
      {messages.map((message) => (
        <div key={message._id}>
          <strong>{message.sender?.firstName || "User"}:</strong> {message.text}
        </div>
      ))}
    </div>

    <div>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a message..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  </div>
);}
export default ChatPage;
