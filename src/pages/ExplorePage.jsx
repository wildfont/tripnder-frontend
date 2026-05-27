import axios from "axios";
import { useEffect, useState, useRef, createRef } from "react";
import TinderCard from "react-tinder-card";
import { Box, Typography, Chip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";

function ExplorePage() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRefs = useRef([]);
  const token = localStorage.getItem("authToken");

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
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 2, alignSelf: "flex-start" }}
      >
        Discover
      </Typography>

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
            <Typography variant="h6" sx={{ color: "var(--text-secondary)" }}>
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
                  sx={{ width: "100%", height: "320px", overflow: "hidden" }}
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
                        background: "linear-gradient(135deg, #1a1a1a, #2d1a2a)",
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
        <Box sx={{ display: "flex", gap: 3, mt: 3, justifyContent: "center" }}>
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
    </Box>
  );
}

export default ExplorePage;
