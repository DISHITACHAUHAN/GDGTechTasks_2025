import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import RoomList from "./components/RoomList";
import RoomDetail from "./components/RoomDetail";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import "./App.css";

function App() {
  const [rooms, setRooms] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentView, setCurrentView] = useState("rooms"); // "rooms" or "bookings"

  useEffect(() => {
    fetchRooms();
    fetchSchedules();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:8080/api/rooms");
      if (!response.ok) throw new Error("Failed to fetch rooms");
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/schedules");
      if (!response.ok) throw new Error("Failed to fetch schedules");
      const data = await response.json();
      setSchedules(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/bookings");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleSearch = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      const url = query
        ? `http://localhost:8080/api/rooms/search?query=${encodeURIComponent(query)}`
        : "http://localhost:8080/api/rooms";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleBookingSuccess = () => {
    setSuccessMessage("Booking created successfully!");
    setTimeout(() => setSuccessMessage(null), 3000);
    fetchSchedules();
    fetchBookings();
  };

  const handleBookingCancel = () => {
    setSuccessMessage("Booking cancelled successfully!");
    setTimeout(() => setSuccessMessage(null), 3000);
    fetchSchedules();
    fetchBookings();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Room Booking System</h1>
          <nav className="nav-buttons">
            <button 
              className={`nav-btn ${currentView === "rooms" ? "active" : ""}`}
              onClick={() => setCurrentView("rooms")}
            >
              📅 Available Rooms
            </button>
            <button 
              className={`nav-btn ${currentView === "bookings" ? "active" : ""}`}
              onClick={() => setCurrentView("bookings")}
            >
              📋 My Bookings
            </button>
          </nav>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {loading && <div className="loading">Loading...</div>}

      {currentView === "rooms" ? (
        <div className="main-content">
          <div className="left-panel">
            <SearchBar onSearch={handleSearch} />
            <RoomList 
              rooms={rooms} 
              onRoomSelect={handleRoomSelect}
              selectedRoom={selectedRoom}
            />
          </div>

          <div className="right-panel">
            {selectedRoom ? (
              <>
                <RoomDetail 
                  room={selectedRoom} 
                  schedules={schedules.filter(s => s.roomNumber === selectedRoom.roomNumber)}
                />
                <BookingForm 
                  room={selectedRoom}
                  schedules={schedules.filter(s => s.roomNumber === selectedRoom.roomNumber)}
                  onBookingSuccess={handleBookingSuccess}
                  onError={setError}
                />
              </>
            ) : (
              <div className="no-selection">
                <p>Select a room to view details and make a booking</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bookings-page">
          <BookingList 
            bookings={bookings}
            onBookingCancel={handleBookingCancel}
            onError={setError}
          />
        </div>
      )}
    </div>
  );
}

export default App;
