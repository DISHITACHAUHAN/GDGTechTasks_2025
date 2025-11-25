# Room Booking System

A full-stack application for managing room bookings with search, availability checking, and booking management features.

## Technology Stack

**Backend:**
- Java 17
- Spring Boot 3.2.2
- Spring Data JPA
- H2 Database (in-memory)
- Maven

**Frontend:**
- React 19.2.0
- Vite
- CSS3

## Features

✅ Search rooms by room number or capacity
✅ View room details and descriptions
✅ Check room availability by day and time slot
✅ Create bookings for available time slots
✅ View all bookings
✅ Cancel bookings
✅ Responsive design for mobile and desktop
✅ Real-time availability updates
✅ Error handling and validation

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Maven

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application:
   ```bash
   mvnw spring-boot:run
   ```
   
   Or on Windows:
   ```cmd
   mvnw.cmd spring-boot:run
   ```

3. The backend will start on `http://localhost:8080`

4. Access H2 Console (optional):
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:roombooking`
   - Username: `sa`
   - Password: (leave empty)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The frontend will start on `http://localhost:5173`

5. Open your browser and visit `http://localhost:5173`

## API Endpoints

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/{id}` - Get room by ID
- `GET /api/rooms/search?query={query}` - Search rooms

### Schedules
- `GET /api/schedules` - Get all schedules
- `GET /api/schedules/room/{roomNumber}` - Get schedules for a specific room

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/{userName}` - Get bookings by user
- `DELETE /api/bookings/{id}` - Cancel a booking

## Sample Data

The application comes with pre-loaded sample data:

**Rooms:**
- A101 (30 capacity) - Conference room with projector
- A102 (20 capacity) - Small meeting room
- B201 (50 capacity) - Large lecture hall
- B202 (15 capacity) - Study room
- C301 (100 capacity) - Auditorium
- C302 (25 capacity) - Training room
- D101 (10 capacity) - Private office

**Schedules:**
- Monday to Friday
- Time slots: 09:00-10:00, 10:00-11:00, 11:00-12:00, 14:00-15:00, 15:00-16:00

## Usage Guide

1. **Search for Rooms**: Use the search bar to find rooms by room number or minimum capacity
2. **Select a Room**: Click on any room card to view its details and schedule
3. **View Schedule**: See the weekly schedule with available and booked time slots
4. **Make a Booking**: Fill in your name, select a day and available time slot, then click "Book Room"
5. **View Bookings**: Scroll down to see all bookings in the system
6. **Cancel Booking**: Click the "Cancel Booking" button on any booking card

## Project Structure

```
Tasks1/
├── backend/
│   ├── src/main/java/com/example/backend/
│   │   ├── config/          # Configuration classes
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Data transfer objects
│   │   ├── exception/       # Custom exceptions
│   │   ├── model/           # Entity models
│   │   ├── repository/      # JPA repositories
│   │   └── service/         # Business logic
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.jsx          # Main app component
│   │   ├── App.css          # Styles
│   │   └── main.jsx         # Entry point
│   └── package.json
└── README.md
```

## Troubleshooting

**Backend won't start:**
- Ensure Java 17 is installed: `java -version`
- Check if port 8080 is available
- Run `mvnw clean install` to rebuild

**Frontend won't start:**
- Ensure Node.js is installed: `node -version`
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

**CORS errors:**
- Ensure backend is running on port 8080
- Check that `@CrossOrigin("*")` is present in controllers

**Data not loading:**
- Check browser console for errors
- Verify backend is running and accessible
- Check network tab in browser dev tools

## Future Enhancements

- User authentication and authorization
- Email notifications for bookings
- Recurring bookings
- Room equipment management
- Calendar view
- Export bookings to CSV
- Admin dashboard
- Persistent database (MySQL/PostgreSQL)

## License

This project is for educational purposes.
