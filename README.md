# GDGTechTasks_2025

This repository contains solutions for Task 1 (Room Booking System) and Task 2 (The Groove Gallery) of the GDG Tech Tasks 2025.

## 📋 Table of Contents
- [Task 1: Room Booking System](#task-1-room-booking-system)
- [Task 2: The Groove Gallery](#task-2-the-groove-gallery)

---

## 🏢 Task 1: Room Booking System

A full-stack web application for managing room bookings with real-time availability tracking.

### 📁 Project Structure
```
Tasks1/
├── backend/          # Java Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/example/backend/
│   │       │   ├── model/         # Entity models (Room, Schedule, Booking)
│   │       │   ├── repository/    # JPA repositories
│   │       │   ├── service/       # Business logic
│   │       │   └── controller/    # REST API endpoints
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
└── frontend/         # React frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── App.jsx
    │   └── App.css
    └── package.json
```

### 🚀 Features
- **Room Management**: Browse available rooms with capacity information
- **Search Functionality**: Search rooms by number or capacity
- **Schedule Viewing**: View room availability by day and time slot
- **Booking System**: Create and manage room bookings
- **Real-time Updates**: Automatic schedule updates on booking
- **Responsive Design**: Mobile-friendly interface

### 🛠️ Technology Stack

**Backend:**
- Java 17
- Spring Boot 3.2.2
- Spring Data JPA
- H2 Database (in-memory)
- Maven

**Frontend:**
- React 18.2.0
- Vite
- CSS3

### 📦 Setup & Installation

#### Backend Setup
```bash
cd Tasks1/backend
mvn clean install
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

#### Frontend Setup
```bash
cd Tasks1/frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

### 🔌 API Endpoints

#### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/{id}` - Get room by ID
- `GET /api/rooms/search?query={query}` - Search rooms

#### Schedules
- `GET /api/schedules` - Get all schedules
- `GET /api/schedules/room/{roomNumber}` - Get schedules for a room

#### Bookings
- `POST /api/bookings` - Create a booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/user/{userName}` - Get user's bookings
- `DELETE /api/bookings/{id}` - Cancel a booking

### 📊 Database Schema

**Rooms Table:**
- id, roomNumber, capacity, description

**Schedules Table:**
- id, roomNumber, day, timeSlot, isBooked

**Bookings Table:**
- id, roomNumber, userName, day, timeSlot, bookingTime

---

## 🕺 Task 2: The Groove Gallery

A disco-themed video upload application to combat the "Great Disco Glitch of 2025" with JWT authentication and a retro-futuristic aesthetic.

### 📁 Project Structure
```
Tasks2/
├── backend/          # Java Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/groovegallery/
│   │       │   ├── model/         # Entity models (User, Video, Rating)
│   │       │   ├── repository/    # JPA repositories
│   │       │   ├── service/       # Business logic
│   │       │   ├── controller/    # REST API endpoints
│   │       │   ├── security/      # JWT authentication
│   │       │   └── dto/           # Data transfer objects
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
└── frontend/         # React frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   ├── styles/        # Disco theme CSS
    │   └── App.jsx
    └── package.json
```

### 🚀 Features
- **JWT Authentication**: Secure agent registration and login
- **Video Upload**: Drag-and-drop video upload with progress tracking
- **Video Streaming**: HTML5 video player with streaming support
- **Rating System**: 5-star "Funk-O-Meter" with duplicate prevention
- **User Profiles**: Agent profile management with video history
- **Disco Theme**: Retro-futuristic design with neon effects
- **Mission-Themed UX**: Spy-thriller terminology throughout
- **Responsive Design**: Works on all devices

### 🛠️ Technology Stack

**Backend:**
- Java 17
- Spring Boot 3.2.2
- Spring Security with JWT
- Spring Data JPA
- PostgreSQL Database
- Multipart File Upload
- Maven

**Frontend:**
- React 19.2.0
- React Router 6.20.0
- Axios 1.6.2
- Vite 7.2.4
- CSS3 with custom disco theme

### 📦 Setup & Installation

#### Prerequisites
- PostgreSQL database running on `localhost:5432`
- Database name: `groove_gallery`

#### Backend Setup
```bash
cd Tasks2/backend
mvn clean install
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

#### Frontend Setup
```bash
cd Tasks2/frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

### 🔌 API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new agent
- `POST /api/auth/login` - Agent login
- `GET /api/auth/validate` - Validate JWT token

#### Videos
- `POST /api/videos/upload` - Upload video (authenticated)
- `GET /api/videos` - Get all videos
- `GET /api/videos/{id}` - Get video metadata
- `GET /api/videos/{id}/stream` - Stream video file
- `DELETE /api/videos/{id}` - Delete video (authenticated)

#### Ratings
- `POST /api/ratings/video/{id}` - Rate a video
- `GET /api/ratings/video/{id}` - Get video ratings

#### Profile
- `GET /api/profile/me` - Get user profile (authenticated)
- `PUT /api/profile/me` - Update profile (authenticated)
- `GET /api/profile/me/videos` - Get user's videos (authenticated)

### 📊 Database Schema

**Agents Table:**
- id, username, email, password (BCrypt), registeredAt

**Dance_Moves Table:**
- id, filename, originalFilename, filePath, fileSize, mimeType, uploadedAt, uploaderId, averageRating, totalRatings

**Funk_O_Meter Table:**
- id, videoId, sessionId, stars (1-5), ratedAt
- Unique constraint: (videoId, sessionId)

### 🎨 Design Features

**Color Palette:**
- Dark backgrounds (#0a0a0a, #1a1a2e)
- Neon accents (pink, cyan, yellow, purple, green)
- Glowing text effects

**Typography:**
- Orbitron (headings)
- Rajdhani (body text)
- Share Tech Mono (terminal text)

**Animations:**
- Neon glow effects
- Pulsing disco ball
- Smooth transitions
- Hover effects

### 🎯 Mission-Themed Text
- "ACCESS GRANTED" - Successful login
- "BEAM GROOVE" - Upload button
- "MISSION COMPLETE" - Successful upload
- "FUNK-O-METER" - Rating system
- "WALL OF FAME" - Gallery page
- "AGENT PROFILE" - User profile

### 🔒 Security Features
- JWT token authentication (24-hour expiration)
- BCrypt password hashing
- Session-based rating duplicate prevention
- File type validation (mp4, mov, avi, webm)
- File size limit (100MB)
- CORS configuration

---

## 👨‍💻 Development

### Common Commands

**Backend:**
```bash
# Clean and build
mvn clean install

# Run application
mvn spring-boot:run

# Run tests
mvn test
```

**Frontend:**
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Configuration

**Task 1 Backend** (`Tasks1/backend/src/main/resources/application.properties`):
```properties
spring.datasource.url=jdbc:h2:mem:roombooking
spring.jpa.hibernate.ddl-auto=create-drop
server.port=8080
```

**Task 2 Backend** (`Tasks2/backend/src/main/resources/application.properties`):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/groove_gallery
spring.datasource.username=postgres
spring.datasource.password=postgres
jwt.secret=GrooveGallerySecretKeyForJWTTokenGeneration2025DiscoGlitchMissionOperationDiscoDisaster
jwt.expiration=86400000
file.upload-dir=uploads/videos
server.port=8080
```

---

## 📝 Notes

- **Task 1** uses H2 in-memory database (data resets on restart)
- **Task 2** requires PostgreSQL database setup
- Both projects use CORS configuration for `http://localhost:5173`
- Video files in Task 2 are stored in `uploads/videos` directory

---

## 🤝 Contributing

This is a university project repository. For questions or issues, please contact the repository maintainer.

---

## 📄 License

This project is part of GDG Tech Tasks 2025.
