import axios from "axios";
import { useEffect, useState, useRef, createRef, useContext } from "react";
import TinderCard from "react-tinder-card";
import { Box, Typography, Chip, Button, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { AuthContext } from "../context/AuthContext";
import dayjs from "dayjs";

function ExplorePage() {
  const [tab, setTab] = useState("people");
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [joinedTrips, setJoinedTrips] = useState([]);
  const cardRefs = useRef([]);
  const token = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const reversed = [...response.data].reverse();
        setUsers(reversed);
        setCurrentIndex(0);
        cardRefs.current = reversed.map(() => createRef());
      })
      .catch((error) => console.log(error));

    axios
      .get(`${import.meta.env.VITE_API_URL}/destinations/open`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTrips(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSwipe = async (direction, userId) => {
    if (direction === "right") {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/connections`,
          { recipient: userId },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (error) {
        console.log(error);
      }
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const swipeButton = async (dir) => {
    const index = users.length - 1 - currentIndex;
    if (index < 0) return;
    await cardRefs.current[index].current.swipe(dir);
  };

  const handleJoinTrip = async (ownerId, tripId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/connections`,
        { recipient: ownerId, destination: tripId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setJoinedTrips((prev) => [...prev, tripId]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        minHeight: "80vh",
      }}
    >
      {/* TABS */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "100%",
          maxWidth: "400px",
          mb: 2,
        }}
      >
        <Box
          onClick={() => setTab("people")}
          sx={{
            flex: 1,
            textAlign: "center",
            padding: "10px",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
            background: tab === "people" ? "#E8175D" : "var(--surface)",
            color: tab === "people" ? "white" : "var(--text-secondary)",
            border: `1.5px solid ${tab === "people" ? "#E8175D" : "var(--border)"}`,
          }}
        >
          People
        </Box>
        <Box
          onClick={() => setTab("trips")}
          sx={{
            flex: 1,
            textAlign: "center",
            padding: "10px",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "14px",
            background: tab === "trips" ? "#E8175D" : "var(--surface)",
            color: tab === "trips" ? "white" : "var(--text-secondary)",
            border: `1.5px solid ${tab === "trips" ? "#E8175D" : "var(--border)"}`,
          }}
        >
          Trips
        </Box>
      </Box>

      {/* PEOPLE TAB */}
      {tab === "people" && (
        <>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "400px",
              height: "500px",
            }}
          >
            {currentIndex >= users.length ? (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "var(--text-secondary)" }}
                >
                  No more travelers for now 🌍
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--text-secondary)", mt: 1 }}
                >
                  Check back later for new matches!
                </Typography>
              </Box>
            ) : (
              users.map((user, index) => (
                <TinderCard
                  className="swipe"
                  ref={cardRefs.current[index]}
                  key={user._id}
                  onSwipe={(dir) => handleSwipe(dir, user._id)}
                  preventSwipe={["up", "down"]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    zIndex: users.length - index,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "500px",
                      background: "var(--surface)",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                      cursor: "grab",
                      userSelect: "none",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "320px",
                        overflow: "hidden",
                      }}
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.firstName}
                          draggable={false}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(135deg, #1a1a1a, #2d1a2a)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: 100,
                              height: 100,
                              borderRadius: "50%",
                              background: "#E8175D",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "2.5rem",
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            {user.firstName?.[0]}
                            {user.lastName?.[0]}
                          </Box>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ padding: "16px" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)", mb: 1 }}
                      >
                        {user.bio || "No bio yet"}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {user.travelStyle && (
                          <Chip
                            label={user.travelStyle}
                            size="small"
                            sx={{
                              background: "rgba(232,23,93,0.15)",
                              color: "#E8175D",
                            }}
                          />
                        )}
                        {user.budget && (
                          <Chip
                            label={user.budget}
                            size="small"
                            sx={{
                              background: "rgba(255,255,255,0.1)",
                              color: "var(--text-secondary)",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </TinderCard>
              ))
            )}
          </Box>

          {currentIndex < users.length && (
            <Box
              sx={{ display: "flex", gap: 3, mt: 3, justifyContent: "center" }}
            >
              <Box
                onClick={() => swipeButton("left")}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: "2px solid #ff4458",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#ff4458",
                }}
              >
                <CloseIcon fontSize="large" />
              </Box>
              <Box
                onClick={() => swipeButton("right")}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: "2px solid #E8175D",
                  background: "#E8175D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                <FavoriteIcon fontSize="large" />
              </Box>
            </Box>
          )}
        </>
      )}

      {/* TRIPS TAB */}
      {tab === "trips" && (
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
          {trips.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <FlightTakeoffIcon
                sx={{ fontSize: 48, color: "var(--text-secondary)" }}
              />
              <Typography
                variant="body1"
                sx={{ color: "var(--text-secondary)", mt: 1 }}
              >
                No open trips yet
              </Typography>
            </Box>
          ) : (
            trips.map((trip) => (
              <Box
                key={trip._id}
                sx={{
                  mb: 2,
                  background: "var(--surface)",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  p: 2,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Typography variant="h2" sx={{ fontSize: "2rem" }}>
                    {trip.flag}
                  </Typography>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {trip.city}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      {trip.country}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      {dayjs(trip.dateFrom).format("DD/MM/YYYY")} →{" "}
                      {dayjs(trip.dateTo).format("DD/MM/YYYY")}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={trip.owner?.avatar}
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: "#E8175D",
                        fontSize: "0.75rem",
                      }}
                    >
                      {trip.owner?.firstName?.[0]}
                    </Avatar>
                    <Typography
                      variant="caption"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      {trip.owner?.firstName} {trip.owner?.lastName}
                    </Typography>
                  </Box>
                  <Button
                    variant={
                      joinedTrips.includes(trip._id) ? "outlined" : "contained"
                    }
                    size="small"
                    disabled={joinedTrips.includes(trip._id)}
                    onClick={() => handleJoinTrip(trip.owner._id, trip._id)}
                    sx={{ borderRadius: "50px", fontSize: "12px" }}
                  >
                    {joinedTrips.includes(trip._id)
                      ? "Request sent ✓"
                      : "Join trip"}
                  </Button>
                </Box>
              </Box>
            ))
          )}
        </Box>
      )}
    </Box>
  );
}

export default ExplorePage;
