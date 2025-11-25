package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.model.Room;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByRoomNumberContaining(String roomNumber);
    List<Room> findByCapacityGreaterThanEqual(int capacity);
}
