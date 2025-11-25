import React from "react";

function RoomList({ rooms, onRoomSelect, selectedRoom }) {
  return (
    <div className="room-list">
      <h2>Available Rooms</h2>
      {rooms.length === 0 ? (
        <p className="no-rooms">No rooms found</p>
      ) : (
        <div className="room-cards">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`room-card ${selectedRoom?.id === room.id ? "selected" : ""}`}
              onClick={() => onRoomSelect(room)}
            >
              <div className="room-number">{room.roomNumber}</div>
              <div className="room-capacity">{room.capacity} people</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RoomList;
