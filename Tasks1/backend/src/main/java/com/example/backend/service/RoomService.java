package com.example.backend.service;

import com.example.backend.model.Room;
import com.example.backend.model.Schedule;
import com.example.backend.repository.RoomRepository;
import com.example.backend.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final ScheduleRepository scheduleRepository;

    public RoomService(RoomRepository roomRepository, ScheduleRepository scheduleRepository) {
        this.roomRepository = roomRepository;
        this.scheduleRepository = scheduleRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public List<Room> searchRooms(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllRooms();
        }

        List<Room> results = new ArrayList<>();
        
        // Search by room number
        List<Room> byRoomNumber = roomRepository.findByRoomNumberContaining(query);
        results.addAll(byRoomNumber);
        
        // Try to parse query as capacity and search
        try {
            int capacity = Integer.parseInt(query);
            List<Room> byCapacity = roomRepository.findByCapacityGreaterThanEqual(capacity);
            for (Room room : byCapacity) {
                if (!results.contains(room)) {
                    results.add(room);
                }
            }
        } catch (NumberFormatException e) {
            // Query is not a number, skip capacity search
        }
        
        return results;
    }

    public List<Schedule> getSchedule() {
        return scheduleRepository.findAll();
    }

    public List<Schedule> getScheduleByRoom(String roomNumber) {
        return scheduleRepository.findByRoomNumber(roomNumber);
    }
}
