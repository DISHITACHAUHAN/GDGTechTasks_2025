package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomNumber;
    
    @Column(name = "\"day\"")
    private String day;
    
    private String timeSlot;
    private boolean isBooked;

    public Schedule() {}

    public Schedule(String roomNumber, String day, String timeSlot) {
        this.roomNumber = roomNumber;
        this.day = day;
        this.timeSlot = timeSlot;
        this.isBooked = false;
    }

    public Schedule(String roomNumber, String day, String timeSlot, boolean isBooked) {
        this.roomNumber = roomNumber;
        this.day = day;
        this.timeSlot = timeSlot;
        this.isBooked = isBooked;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }
}
