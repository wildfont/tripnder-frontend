import axios from "axios";
import { useEffect, useState } from "react";

function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const token = localStorage.getItem("authToken");

   useEffect(() => {

    axios
      .get(`${import.meta.env.VITE_API_URL}/destinations`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDestinations(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>DestinationsPage</div>
  )
}
export default DestinationsPage