import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

function ConnectionsPage() {
  const [connections, setConnections] = useState([]);
  const token = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/connections`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setConnections(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleUpdate = async (id, status) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/connections/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConnections(connections.map((c) => c._id === id ? response.data : c));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/connections/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConnections(connections.filter((c) => c._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const received = connections.filter((c) => c.status === "pending" && c.recipient?._id === user?._id);
  const accepted = connections.filter((c) => c.status === "accepted");
  const sent = connections.filter((c) => c.status === "pending" && c.requester?._id === user?._id);

  return (
    <div>
      <h2>Received requests</h2>
      {received.map((c) => {
        const otherUser = c.requester;
        return (
          <div key={c._id}>
            <span>{otherUser?.firstName} {otherUser?.lastName}</span>
            <Button onClick={() => handleUpdate(c._id, "accepted")}>Accept</Button>
            <Button onClick={() => handleUpdate(c._id, "rejected")}>Reject</Button>
          </div>
        );
      })}

      <h2>Matches</h2>
      {accepted.map((c) => {
        const otherUser = c.requester?._id === user?._id ? c.recipient : c.requester;
        return (
          <div key={c._id}>
            <span>{otherUser?.firstName} {otherUser?.lastName}</span>
            <Button onClick={() => handleDelete(c._id)}>Remove</Button>
          </div>
        );
      })}

      <h2>Sent requests</h2>
      {sent.map((c) => {
        const otherUser = c.recipient;
        return (
          <div key={c._id}>
            <span>{otherUser?.firstName} {otherUser?.lastName}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ConnectionsPage;