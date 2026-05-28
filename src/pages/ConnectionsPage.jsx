import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Button, Box, Typography, Avatar, Chip } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

function ConnectionsPage() {
  const [connections, setConnections] = useState([]);
  const token = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setConnections(
        connections.map((c) => (c._id === id ? response.data : c)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/connections/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnections(connections.filter((c) => c._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const receivedPeople = connections.filter(
    (c) =>
      c.status === "pending" &&
      c.recipient?._id === user?._id &&
      !c.destination,
  );
  const receivedTrips = connections.filter(
    (c) =>
      c.status === "pending" && c.recipient?._id === user?._id && c.destination,
  );
  const acceptedPeople = connections.filter(
    (c) => c.status === "accepted" && !c.destination,
  );
  const acceptedTrips = connections.filter(
    (c) => c.status === "accepted" && c.destination,
  );
  const sent = connections.filter(
    (c) => c.status === "pending" && c.requester?._id === user?._id,
  );

  const UserCard = ({ otherUser, children }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        mb: 1.5,
        background: "var(--surface)",
        borderRadius: "16px",
        border: "1px solid var(--border)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={otherUser?.avatar}
          sx={{ width: 48, height: 48, bgcolor: "#E8175D" }}
        >
          {otherUser?.firstName?.[0]}
          {otherUser?.lastName?.[0]}
        </Avatar>
        <Typography variant="subtitle1" fontWeight="bold">
          {otherUser?.firstName} {otherUser?.lastName}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>{children}</Box>
    </Box>
  );

  const SectionHeader = ({ label, count }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
      <Typography
        variant="subtitle2"
        sx={{
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label}
      </Typography>
      <Chip
        label={count}
        size="small"
        sx={{ background: "#E8175D", color: "white", height: 20 }}
      />
    </Box>
  );

  return (
    <Box sx={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Connections
      </Typography>

      {/* RECEIVED PEOPLE REQUESTS */}
      {receivedPeople.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <SectionHeader
            label="People requests"
            count={receivedPeople.length}
          />
          {receivedPeople.map((c) => (
            <UserCard key={c._id} otherUser={c.requester}>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleUpdate(c._id, "accepted")}
                sx={{
                  minWidth: 0,
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  p: 0,
                }}
              >
                <CheckIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() => handleUpdate(c._id, "rejected")}
                sx={{
                  minWidth: 0,
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  p: 0,
                  border: "1px solid #ff4458",
                  color: "#ff4458",
                }}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </UserCard>
          ))}
        </Box>
      )}

      {/* RECEIVED TRIP REQUESTS */}
      {receivedTrips.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <SectionHeader label="Trip requests" count={receivedTrips.length} />
          {receivedTrips.map((c) => (
            <UserCard key={c._id} otherUser={c.requester}>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleUpdate(c._id, "accepted")}
                sx={{
                  minWidth: 0,
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  p: 0,
                }}
              >
                <CheckIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() => handleUpdate(c._id, "rejected")}
                sx={{
                  minWidth: 0,
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  p: 0,
                  border: "1px solid #ff4458",
                  color: "#ff4458",
                }}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </UserCard>
          ))}
        </Box>
      )}

      {/* MATCHES */}
      <Box sx={{ mb: 3 }}>
        <SectionHeader label="Matches" count={acceptedPeople.length} />
        {acceptedPeople.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <PeopleIcon sx={{ fontSize: 48, color: "var(--text-secondary)" }} />
            <Typography
              variant="body2"
              sx={{ color: "var(--text-secondary)", mt: 1 }}
            >
              No matches yet. Keep swiping!
            </Typography>
          </Box>
        ) : (
          acceptedPeople.map((c) => {
            const otherUser =
              c.requester?._id === user?._id ? c.recipient : c.requester;
            return (
              <UserCard key={c._id} otherUser={otherUser}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => navigate(`/chat/${c._id}`)}
                  sx={{
                    minWidth: 0,
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    p: 0,
                  }}
                >
                  <ChatIcon fontSize="small" />
                </Button>
                <Button
                  size="small"
                  onClick={() => handleDelete(c._id)}
                  sx={{
                    minWidth: 0,
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    p: 0,
                    border: "1px solid #ff4458",
                    color: "#ff4458",
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </UserCard>
            );
          })
        )}
      </Box>

      {/* TRIP COMPANIONS */}
      {acceptedTrips.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <SectionHeader label="Trip companions" count={acceptedTrips.length} />
          {acceptedTrips.map((c) => {
            const otherUser =
              c.requester?._id === user?._id ? c.recipient : c.requester;
            return (
              <UserCard key={c._id} otherUser={otherUser}>
                <FlightTakeoffIcon sx={{ color: "#E8175D", mr: 1 }} />
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => navigate(`/chat/${c._id}`)}
                  sx={{
                    minWidth: 0,
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    p: 0,
                  }}
                >
                  <ChatIcon fontSize="small" />
                </Button>
                <Button
                  size="small"
                  onClick={() => handleDelete(c._id)}
                  sx={{
                    minWidth: 0,
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    p: 0,
                    border: "1px solid #ff4458",
                    color: "#ff4458",
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </UserCard>
            );
          })}
        </Box>
      )}

      {/* SENT REQUESTS */}
      {sent.length > 0 && (
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: "var(--text-secondary)",
              textTransform: "uppercase",
              letterSpacing: 1,
              mb: 1.5,
            }}
          >
            Sent requests
          </Typography>
          {sent.map((c) => (
            <UserCard key={c._id} otherUser={c.recipient}>
              <Chip
                label="Pending"
                size="small"
                sx={{
                  background: "rgba(255,255,255,0.1)",
                  color: "var(--text-secondary)",
                }}
              />
            </UserCard>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ConnectionsPage;
