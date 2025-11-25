# 🕺 THE GROOVE GALLERY 🕺

## OPERATION: DISCO DISASTER - Mission Briefing

**CLASSIFIED: AGENT EYES ONLY**

The year is 2025. A catastrophic software bug, known as the **"Great Disco Glitch,"** has infected smart mirrors worldwide. Instead of reflecting your image, they display a horrifying, endlessly looping GIF of a malfunctioning disco robot.

**Your Mission:** Upload dance videos to flood the network with pure human dance energy and restore order, one reflection at a time.

---

## 🎯 Project Overview

**The Groove Gallery** is a full-stack web application featuring:
- 🔐 **JWT Authentication** - Secure agent access
- 📹 **Video Upload System** - Drag-and-drop dance move uploads
- 🎬 **Public Gallery** - "Wall of Fame" displaying all grooves
- ⭐ **Funk-O-Meter** - 5-star rating system
- 🎨 **Retro-Futuristic Disco Theme** - 70s disco meets tech-spy thriller

---

## 🏗️ Technology Stack

### Backend (Transmission Hub)
- **Java 17**
- **Spring Boot 3.2.2**
- **Spring Security** with JWT
- **Spring Data JPA**
- **PostgreSQL** Database
- **Maven**

### Frontend (Command Center)
- **React 19.2.0**
- **React Router** (navigation)
- **Axios** (HTTP client)
- **Vite** (build tool)
- **CSS3** with disco theming

---

## 📁 Project Structure

```
Tasks2/
├── backend/                          # Spring Boot Backend
│   ├── src/main/java/com/groovegallery/
│   │   ├── model/                    # Entity Models
│   │   │   ├── User.java            # Agent entity
│   │   │   ├── Video.java           # Dance move entity
│   │   │   └── Rating.java          # Funk-O-Meter entity
│   │   ├── repository/               # Data Access Layer
│   │   ├── service/                  # Business Logic
│   │   ├── controller/               # REST API Endpoints
│   │   ├── security/                 # JWT & Security Config
│   │   ├── dto/                      # Data Transfer Objects
│   │   └── GrooveGalleryApplication.java
│   ├── src/main/resources/
│   │   └── application.properties    # Configuration
│   └── pom.xml                       # Maven Dependencies
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── pages/                    # Page Components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── components/               # Reusable Components
│   │   │   ├── VideoCard.jsx
│   │   │   ├── VideoPlayer.jsx
│   │   │   ├── UploadZone.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   └── Header.jsx
│   │   ├── services/                 # API Services
│   │   │   ├── authService.js
│   │   │   ├── videoService.js
│   │   │   └── ratingService.js
│   │   ├── styles/                   # CSS Files
│   │   │   └── disco-theme.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js 16** or higher
- **PostgreSQL 12** or higher
- **Maven 3.6** or higher

### Database Setup

1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE groove_gallery;
```

3. Update credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on: **http://localhost:8080**

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 🎨 Disco Theme Design

### Color Palette

```css
--bg-primary: #0a0a0a;        /* Dark background */
--bg-secondary: #1a1a2e;      /* Secondary dark */
--neon-pink: #ff006e;         /* Neon pink */
--neon-cyan: #00f5ff;         /* Neon cyan */
--neon-yellow: #ffbe0b;       /* Neon yellow */
--neon-purple: #8338ec;       /* Neon purple */
```

### Typography

- **Headers:** Orbitron (retro-futuristic)
- **Body:** Rajdhani (clean, modern)
- **Terminal:** Share Tech Mono (code-style)

### Effects

- Neon glow on text and buttons
- Glowing borders on hover
- Smooth animations
- Terminal-style status messages

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new agent
- `POST /api/auth/login` - Login and get JWT token

### Videos
- `POST /api/videos/upload` - Upload dance video (authenticated)
- `GET /api/videos` - Get all videos
- `GET /api/videos/{id}` - Get specific video
- `GET /api/videos/{id}/stream` - Stream video file
- `DELETE /api/videos/{id}` - Delete video (owner only)

### Ratings
- `POST /api/ratings/video/{id}` - Rate a video
- `GET /api/ratings/video/{id}` - Get video ratings

### Profile
- `GET /api/profile/me` - Get current user profile
- `PUT /api/profile/me` - Update profile
- `GET /api/profile/me/videos` - Get user's videos

---

## 🎯 Features

### ✅ Implemented
- Spring Boot backend structure
- Entity models (User, Video, Rating)
- PostgreSQL database schema
- JWT configuration
- File upload configuration

### 🚧 In Progress
- JWT authentication system
- Video upload service
- Rating system
- React frontend
- Disco theme styling

### 📋 Planned
- Video streaming
- User profiles
- Advanced search
- Video thumbnails
- Mobile optimization

---

## 🔐 Security

- **JWT Tokens** - 24-hour expiration
- **Password Hashing** - BCrypt encryption
- **File Validation** - Type and size checks
- **CORS** - Configured for frontend origin
- **Session-based Rating** - Prevents duplicate votes

---

## 🎮 User Journey

### 1. Agent Registration
```
Visit site → Click "Join Mission" → Enter credentials → "ACCESS GRANTED"
```

### 2. Upload Dance Move
```
Login → Navigate to Upload → Drag video → "INITIATING SEQUENCE" → "MISSION COMPLETE"
```

### 3. View Gallery
```
Visit "Wall of Fame" → Browse videos → Click to play → Rate with Funk-O-Meter
```

### 4. Rate Videos
```
Watch video → Click stars → Submit rating → See updated average
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 📦 Deployment

### Backend (Production)
```bash
mvn clean package
java -jar target/groove-gallery-backend-1.0.0.jar
```

### Frontend (Production)
```bash
npm run build
# Deploy dist/ folder to hosting service
```

---

## 🎨 Mission-Themed Text

Throughout the app, you'll see:
- **"ACCESS GRANTED"** - Successful login
- **"INITIATE SEQUENCE"** - Upload button
- **"BEAM GROOVE"** - Submit upload
- **"MISSION COMPLETE"** - Upload success
- **"TRANSMISSION FAILED"** - Upload error
- **"WALL OF FAME"** - Gallery page
- **"FUNK-O-METER"** - Rating system

---

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database exists
- Check port 8080 is available

### Frontend won't connect
- Ensure backend is running
- Check CORS configuration
- Verify API URL in frontend

### File upload fails
- Check file size (max 100MB)
- Verify file type (video only)
- Check uploads directory exists

---

## 📚 Documentation

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev)
- [JWT Guide](https://jwt.io)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

## 🎉 Credits

**Mission Commander:** Your Name
**Operation:** DISCO DISASTER
**Year:** 2025
**Status:** ACTIVE

---

## 📄 License

This project is part of the global effort to combat the Great Disco Glitch.
All agents are authorized to use and modify this code.

---

## 🕺 Let's Save the Mirrors! 🕺

**Remember:** Every dance move uploaded brings us one step closer to defeating the disco glitch!

**TRANSMISSION HUB STATUS:** ONLINE ✅
**MISSION STATUS:** ACTIVE 🚀
**GROOVE LEVEL:** MAXIMUM 🔥

---

*"In disco we trust, in groove we must!"* 🎵
