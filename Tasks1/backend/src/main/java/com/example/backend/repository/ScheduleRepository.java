package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.model.Schedule;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByRoomNumber(String roomNumber);
    Optional<Schedule> findByRoomNumberAndDayAndTimeSlot(String roomNumber, String day, String timeSlot);
}
