Here's a clean and basic `README.md` for your **Insyd Notification Backend** project:

---

````md
# Insyd Notification System - Backend

This is the backend for the Insyd notification system — a proof-of-concept real-time notification service for a social platform built with Node.js, Express, MongoDB, and Socket.IO.

## Features

- User creation and follow/unfollow logic
- Real-time notifications via WebSocket (Socket.IO)
- RESTful APIs for users, posts, and notifications
- MongoDB for data storage
- In-memory tracking of online users
- Ready for integration with frontend (Next.js)

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Socket.IO (for real-time notifications)
- TypeScript
- Redis + BullMQ (optional, for background jobs)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shubhankar-12/insyd-backend.git
cd insyd-backend
```
````

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Create `.env` File

Copy `.env.example` to `.env` and update values as needed:

```bash
cp .env.example .env
```

Example contents:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/insyd
REDIS_URL=redis://localhost:6379
```

### 4. Run the Server

```bash
pnpm dev
```

Server will run at `http://localhost:5000`

---

## API Routes

### User

- `POST /api/user/create` - Create a user
- `GET /api/user/list` - List all users
- `POST /api/user/update-follow` - Follow/unfollow a user

### Post

- `GET /api/post/create` - Create a post (demo)
- `GET /api/post/list` - List posts
- `POST /api/post/like` - Like a post
- `POST /api/post/comment` - Comment on a post

### Notification

- `GET /api/notification/list` - Get notifications for a user
- `POST /api/notification/mark` - Mark notifications as read

---

## WebSocket Events

- `register`: Register userId with the server
- `new_notification`: Sent from backend to client when a user is followed

---

## License

MIT
