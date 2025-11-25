package com.example.backend.controller;

import com.example.backend.model.Room;
import com.example.backend.model.Schedule;
import com.example.backend.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/rooms")
    public List<Room> getRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        Optional<Room> room = roomService.getRoomById(id);
        return room.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/rooms/search")
    public List<Room> searchRooms(@RequestParam String query) {
        return roomService.searchRooms(query);
    }

    @GetMapping("/schedules")
    public List<Schedule> getSchedule() {
        return roomService.getSchedule();
    }

    @GetMapping("/schedules/room/{roomNumber}")
    public List<Schedule> getScheduleByRoom(@PathVariable String roomNumber) {
        return roomService.getScheduleByRoom(roomNumber);
    }
}
