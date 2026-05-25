import axios from "axios";
import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState("");
  const [dateFrom, setDateFrom] = useState(dayjs());
  const [dateTo, setDateTo] = useState(dayjs());
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/destinations`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setDestinations(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/destinations/${editingId}`,
          { city, country, flag, dateFrom, dateTo },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setDestinations(
          destinations.map((d) => (d._id === editingId ? response.data : d)),
        );
        setEditingId(null);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/destinations`,
          { city, country, flag, dateFrom, dateTo },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setDestinations([...destinations, response.data]);
      }
      setCity("");
      setCountry("");
      setFlag("");
      setDateFrom(dayjs());
      setDateTo(dayjs());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/destinations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDestinations(destinations.filter((d) => d._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (destination) => {
    setEditingId(destination._id);
    setCity(destination.city);
    setCountry(destination.country);
    setFlag(destination.flag);
    setDateFrom(dayjs(destination.dateFrom));
    setDateTo(dayjs(destination.dateTo));
  };

  return (
    <div>
      {destinations.map((destination) => (
        <div key={destination._id}>
          <span>
            {destination.flag} {destination.city}, {destination.country}
          </span>
          <Button onClick={() => handleEdit(destination)}>Edit</Button>
          <Button onClick={() => handleDelete(destination._id)}>Delete</Button>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <TextField
          label="Flag emoji"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
        />
        <DatePicker
          label="Date from"
          value={dateFrom}
          onChange={(v) => setDateFrom(v)}
          format="DD/MM/YYYY"
        />
        <DatePicker
          label="Date to"
          value={dateTo}
          onChange={(v) => setDateTo(v)}
          format="DD/MM/YYYY"
        />
        <Button type="submit">
          {editingId ? "Update" : "Add destination"}
        </Button>
      </form>
    </div>
  );
}

export default DestinationsPage;
