package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Hold {

    @Id
    @GeneratedValue
    private Long id;

    private String roomNumber;
    private String heldByStudent;

    public Hold() {}

    public Hold(String roomNumber, String heldByStudent) {
        this.roomNumber = roomNumber;
        this.heldByStudent = heldByStudent;
    }

    // Getters & Setters
}
