# Redis DB with Node.js and Express

This project is a backend application built with Node.js and Express, demonstrating the integration of MongoDB for persistent storage and Redis for caching to improve performance.

## 🚀 Features

- **MongoDB Integration**: Uses Mongoose to interact with a MongoDB database.
- **Redis Caching**: Implements Redis caching for `GET` requests to reduce database load and improve response times.
- **RESTful API**: Provides endpoints for User management.
- **Middleware**: Includes custom middlewares for logging, error handling, and response time tracking.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Cache**: Redis
- **Utilities**: dotenv, cors

## 📂 Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── mongo.js        # MongoDB Connection
│   │   └── redis.js        # Redis Connection
│   ├── middleware/
│   │   ├── error.middleware.js
│   │   ├── logger.middleware.js
│   │   └── responseTime.middleware.js
│   ├── models/
│   │   └── User.js         # Mongoose User Model
│   ├── routes/
│   │   └── user.routes.js  # User API Routes
│   ├── app.js              # Express App Setup
│   └── server.js           # Server Entry Point
├── .env                    # Environment Variables
└── package.json
```

## ⚙️ Installation

1. **Clone the repository** (if applicable) or navigate to the project directory.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_connection_string
   ```

## 🏃 Running the Server

- **Development Mode** (with nodemon):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

The server will start on `http://localhost:5000` (or your defined PORT).

## 📡 API Endpoints

### Users (`/api/users`)

#### 1. Create User
- **Method**: `POST`
- **URL**: `/api/users`
- **Body** (JSON):
  ```json
  {
      "name": "John Doe",
      "email": "john@example.com"
  }
  ```
- **Description**: Creates a new user in MongoDB and invalidates the Redis `users` cache.

#### 2. Get All Users
- **Method**: `GET`
- **URL**: `/api/users`
- **Description**: Retrieves all users.
  - Checks Redis cache first.
  - If cache exists, returns cached data (`source: "redis"`).
  - If cache misses, fetches from MongoDB, updates Redis (TTL: 60s), and returns data (`source: "mongodb"`).

## 🧪 Testing

You can test the API using Postman, Insomnia, or curl.

**Example Response (Cached):**
```json
{
    "source": "redis",
    "data": [ ... ]
}
```

## 📄 License
ISC
