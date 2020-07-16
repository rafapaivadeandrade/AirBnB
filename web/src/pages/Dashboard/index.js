import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiEdit } from "react-icons/fi";
import api from "../../services/api";
import "./index.css";
import socketio from "socket.io-client";

export default function Dashboard({ history }) {
  const [spots, setSpots] = useState([]);
  const [request, setRequest] = useState([]);

  const user_id = localStorage.getItem("user");

  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id },
      }),
    [user_id]
  ); //the socket will only change if the user id changes, use memo is used to keep the connection until user id changes

  useEffect(() => {
    socket.on(
      "booking_request",
      (data) => {
        setRequest([...request, data]);
      },
      [request, socket]
    );
  }, []);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id },
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approval`);

    setRequest(request.filter((request) => request._id !== id));
  }
  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejection`);

    setRequest(request.filter((request) => request._id !== id));
  }
  async function handleDeleteSpot(id) {
    await api.delete(`/spot/${id}`);

    setSpots(spots.filter((spot) => spot._id !== id));
  }
  async function handleEditSpot(id) {
    localStorage.setItem("spot", id);
    history.push("/editSpot");
  }

  return (
    <>
      <ul className="notifications">
        {request.map((request) => (
          <li key={request.id}>
            <p>
              <strong>{request.user.email}</strong> is requesting a reservation
              in <strong>{request.spot.hostel}</strong> hostel for the date:{" "}
              <strong>{request.date}</strong>
            </p>
            <button
              className="accept"
              onClick={() => handleAccept(request._id)}
            >
              Accept
            </button>
            <button
              className="reject"
              onClick={() => handleReject(request._id)}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map((spot) => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <button type="button" onClick={() => handleEditSpot(spot._id)}>
              <FiEdit size={20} color="a8a8b3" />
            </button>
            <button type="button" onClick={() => handleDeleteSpot(spot._id)}>
              <FiTrash2 size={20} color="a8a8b3" />
            </button>
            <strong>{spot.hostel}</strong>
            <span>{spot.price ? `$${spot.price}/day` : "Free"}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Register new spot</button>
      </Link>
    </>
  );
}
