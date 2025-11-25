import React from "react";

function RoomDetail({ room, schedules }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  const getSchedulesByDay = (day) => {
    return schedules.filter(s => s.day === day);
  };

  return (
    <div className="room-detail">
      <h2>Room {room.roomNumber}</h2>
      <div className="room-info">
        <p><strong>Room Number:</strong> {room.roomNumber}</p>
        <p><strong>Capacity:</strong> {room.capacity} people</p>
      </div>

      <h3>Weekly Schedule</h3>
      <div className="schedule-grid">
        {days.map(day => (
          <div key={day} className="day-schedule">
            <h4>{day}</h4>
            <div className="time-slots">
              {getSchedulesByDay(day).map(schedule => (
                <div 
                  key={schedule.id} 
                  className={`time-slot ${schedule.booked ? "booked" : "available"}`}
                >
                  <span className="time">{schedule.timeSlot}</span>
                  <span className="status">
                    {schedule.booked ? "Booked" : "Available"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomDetail;
