package com.example.backend.config;

import com.example.backend.model.Room;
import com.example.backend.model.Schedule;
import com.example.backend.repository.RoomRepository;
import com.example.backend.repository.ScheduleRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer {

    private final RoomRepository roomRepository;
    private final ScheduleRepository scheduleRepository;

    public DataInitializer(RoomRepository roomRepository, ScheduleRepository scheduleRepository) {
        this.roomRepository = roomRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initializeData() {
        // Check if data already exists
        if (roomRepository.count() > 0) {
            System.out.println("Data already initialized, skipping...");
            return;
        }

        // Create sample rooms
        Room room1 = new Room("A101", 30, "Conference room with projector");
        Room room2 = new Room("A102", 20, "Small meeting room");
        Room room3 = new Room("B201", 50, "Large lecture hall");
        Room room4 = new Room("B202", 15, "Study room");
        Room room5 = new Room("C301", 100, "Auditorium");
        Room room6 = new Room("C302", 25, "Training room");
        Room room7 = new Room("D101", 10, "Private office");

        roomRepository.save(room1);
        roomRepository.save(room2);
        roomRepository.save(room3);
        roomRepository.save(room4);
        roomRepository.save(room5);
        roomRepository.save(room6);
        roomRepository.save(room7);

        // Create sample schedules
        String[] days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};
        String[] timeSlots = {"09:00-10:00", "10:00-11:00", "11:00-12:00", "14:00-15:00", "15:00-16:00"};
        String[] roomNumbers = {"A101", "A102", "B201", "B202", "C301", "C302", "D101"};

        for (String roomNumber : roomNumbers) {
            for (String day : days) {
                for (String timeSlot : timeSlots) {
                    Schedule schedule = new Schedule(roomNumber, day, timeSlot, false);
                    scheduleRepository.save(schedule);
                }
            }
        }

        System.out.println("Sample data initialized successfully!");
        System.out.println("Created " + roomRepository.count() + " rooms");
        System.out.println("Created " + scheduleRepository.count() + " schedule entries");
    }
}
