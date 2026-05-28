import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Box, Typography, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const token = localStorage.getItem("authToken");

function ChatPage() {
  const { connectionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API_URL);

    axios
      .get(`${import.meta.env.VITE_API_URL}/messages/${connectionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMessages(response.data))
      .catch((error) => console.log(error));

    socketRef.current.emit("join_room", connectionId);
    socketRef.current.on("new_message", (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    socketRef.current.emit("send_message", {
      connectionId,
      senderId: user._id,
      text,
    });
    setText("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 112px)",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
              No messages yet. Say hi! 👋
            </Typography>
          </Box>
        ) : (
          messages.map((message) => {
            const isOwn =
              message.sender?._id?.toString() === user?._id?.toString() ||
              message.sender?.toString() === user?._id?.toString();
            return (
              <Box
                key={message._id}
                sx={{
                  display: "flex",
                  justifyContent: isOwn ? "flex-end" : "flex-start",
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                {!isOwn && (
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: "#E8175D",
                      fontSize: "0.75rem",
                    }}
                  >
                    {message.sender?.firstName?.[0]}
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: "70%",
                    padding: "10px 14px",
                    borderRadius: isOwn
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                    background: isOwn ? "#E8175D" : "var(--surface)",
                    color: isOwn ? "white" : "var(--text)",
                    border: isOwn ? "none" : "1px solid var(--border)",
                  }}
                >
                  <Typography variant="body2">{message.text}</Typography>
                </Box>
              </Box>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          padding: "12px 16px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg)",
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "var(--text)",
              backgroundColor: "var(--surface)",
              borderRadius: "50px",
              "& fieldset": { borderColor: "var(--border)" },
              "&:hover fieldset": { borderColor: "#E8175D" },
              "&.Mui-focused fieldset": { borderColor: "#E8175D" },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{ minWidth: 0, width: 44, height: 44, borderRadius: "50%", p: 0 }}
        >
          <SendIcon fontSize="small" />
        </Button>
      </Box>
    </Box>
  );
}

export default ChatPage;
