import React, { useState } from "react";

function BookingList({ bookings, onBookingCancel, onError }) {
  const [cancelling, setCancelling] = useState(null);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      setCancelling(bookingId);
      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to cancel booking");
      }

      onBookingCancel();
    } catch (err) {
      onError(err.message);
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div className="booking-list">
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings yet</p>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-info">
                <p><strong>Room:</strong> {booking.roomNumber}</p>
                <p><strong>User:</strong> {booking.userName}</p>
                <p><strong>Day:</strong> {booking.day}</p>
                <p><strong>Time:</strong> {booking.timeSlot}</p>
                {booking.bookingTime && (
                  <p className="booking-time">
                    <strong>Booked at:</strong> {new Date(booking.bookingTime).toLocaleString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleCancel(booking.id)}
                disabled={cancelling === booking.id}
                className="cancel-btn"
              >
                {cancelling === booking.id ? "Cancelling..." : "Cancel Booking"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;
