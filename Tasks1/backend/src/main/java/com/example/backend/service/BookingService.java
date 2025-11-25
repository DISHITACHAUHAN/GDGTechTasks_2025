package com.example.backend.service;

import com.example.backend.model.Booking;
import com.example.backend.model.Schedule;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ScheduleRepository scheduleRepository;

    public BookingService(BookingRepository bookingRepository, ScheduleRepository scheduleRepository) {
        this.bookingRepository = bookingRepository;
        this.scheduleRepository = scheduleRepository;
    }

    public Booking createBooking(String roomNumber, String userName, String day, String timeSlot) {
        // Check availability
        if (!checkAvailability(roomNumber, day, timeSlot)) {
            throw new com.example.backend.exception.BookingConflictException("Time slot is already booked");
        }

        // Create booking
        Booking booking = new Booking(roomNumber, userName, day, timeSlot);
        booking.setBookingTime(LocalDateTime.now());
        Booking savedBooking = bookingRepository.save(booking);

        // Update schedule to mark as booked
        Optional<Schedule> scheduleOpt = scheduleRepository.findByRoomNumberAndDayAndTimeSlot(roomNumber, day, timeSlot);
        if (scheduleOpt.isPresent()) {
            Schedule schedule = scheduleOpt.get();
            schedule.setBooked(true);
            scheduleRepository.save(schedule);
        }

        return savedBooking;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUser(String userName) {
        return bookingRepository.findByUserName(userName);
    }

    public void cancelBooking(Long id) {
        Optional<Booking> bookingOpt = bookingRepository.findById(id);
        if (bookingOpt.isEmpty()) {
            throw new com.example.backend.exception.ResourceNotFoundException("Booking not found");
        }

        Booking booking = bookingOpt.get();
        
        // Update schedule to mark as available
        Optional<Schedule> scheduleOpt = scheduleRepository.findByRoomNumberAndDayAndTimeSlot(
            booking.getRoomNumber(), 
            booking.getDay(), 
            booking.getTimeSlot()
        );
        if (scheduleOpt.isPresent()) {
            Schedule schedule = scheduleOpt.get();
            schedule.setBooked(false);
            scheduleRepository.save(schedule);
        }

        // Delete booking
        bookingRepository.deleteById(id);
    }

    public boolean checkAvailability(String roomNumber, String day, String timeSlot) {
        Optional<Schedule> scheduleOpt = scheduleRepository.findByRoomNumberAndDayAndTimeSlot(roomNumber, day, timeSlot);
        return scheduleOpt.isPresent() && !scheduleOpt.get().isBooked();
    }
}
