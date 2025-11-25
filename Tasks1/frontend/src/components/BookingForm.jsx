import React, { useState } from "react";

function BookingForm({ room, schedules, onBookingSuccess, onError }) {
  const [userName, setUserName] = useState("");
  const [day, setDay] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const availableSlots = schedules.filter(s => s.day === day && !s.booked);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !day || !timeSlot) {
      onError("Please fill in all fields");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomNumber: room.roomNumber,
          userName,
          day,
          timeSlot,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Booking failed");
      }

      // Clear form
      setUserName("");
      setDay("");
      setTimeSlot("");
      onBookingSuccess();
    } catch (err) {
      onError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-form">
      <h3>Make a Booking</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">Your Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="day">Day:</label>
          <select
            id="day"
            value={day}
            onChange={(e) => {
              setDay(e.target.value);
              setTimeSlot("");
            }}
            required
          >
            <option value="">Select a day</option>
            {days.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="timeSlot">Time Slot:</label>
          <select
            id="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            disabled={!day}
            required
          >
            <option value="">Select a time slot</option>
            {availableSlots.map(slot => (
              <option key={slot.id} value={slot.timeSlot}>
                {slot.timeSlot}
              </option>
            ))}
          </select>
          {day && availableSlots.length === 0 && (
            <p className="no-slots">No available slots for this day</p>
          )}
        </div>

        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? "Booking..." : "Book Room"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
