import axios from "axios";
import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";

function ExplorePage() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {

    axios
      .get(`${import.meta.env.VITE_API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      ExplorePage
      {users.map((user) => {
        return (
          <TinderCard
            onSwipe={async (direction) => {
              if (direction === "right") {
                try {
                  const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/connections`,
                    { recipient: user._id },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    },
                  )
                  console.log(response.data);
                } catch (error) {
                  console.log(error);
                  if (error.response.status === 400) {
                    setErrorMessage(error.response.data.errorMessage);
                  } else {
                  }
                }
              }
            }}
            key={user._id}
          >
            {user.firstName}
          </TinderCard>
        );
      })}
    </div>
  );
}
export default ExplorePage;
