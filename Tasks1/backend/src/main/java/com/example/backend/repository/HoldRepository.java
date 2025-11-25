package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.model.Hold;

public interface HoldRepository extends JpaRepository<Hold, Long> {}
