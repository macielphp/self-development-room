# 📡 Backend API - Language Learning App

### 💡 API Summary
This Express.js API serves a local PostgreSQL database and provides structured endpoints for a language-learning roadmap system. It handles the delivery of **seasons**, **lessons**, **questions**, and **alternatives** in a relational format.

---

## ⚙️ Technologies Used
- **Node.js** + **Express.js**
- **PostgreSQL** (`pg` library)
- **CORS** for cross-origin requests
- **dotenv** for environment config

---

## 📁 Folder: `/api/index.js`

### 🔧 Configuration
- The backend runs on port **3001**
- PostgreSQL is configured via `.env`:
  ```env
  DB_USER=postgres
  DB_HOST=localhost
  DB_NAME=postgres
  DB_PASSWORD=segredo
  DB_PORT=5433
  ```

---

## 🔌 Active API Routes

### `GET /api/ping`
- ✅ Health check for the API
- Returns:  
  ```json
  { "message": "API is working!" }
  ```

---

### `GET /api/seasons`
- 📦 Returns **all seasons** from the `seasons` table
- Output:
  ```json
  [
    { "id": 1, "title": "Season 1 - Listen tips from experts" },
    ...
  ]
  ```

---

### `GET /api/seasons/:seasonId/lessons`
- 📦 Returns all **lessons for a given season**, along with their:
  - `title`
  - `lesson_content` (YouTube URL)
  - `lesson_order`
  - `questions` with:
    - question `text`
    - `alternatives` (with `text`, `isCorrect`)

- Example request:  
  `GET /api/seasons/1/lessons`

- Example response:
  ```json
  [
    {
      "id": 1,
      "season_id": 1,
      "title": "Lesson 1: 4 Reasons to Learn a New Language | John McWhorter",
      "lesson_content": "https://www.youtube.com/watch?v=MMmOLN5zBLY",
      "lesson_order": 1,
      "questions": [
        {
          "id": 1,
          "text": "What is one of the reasons John mentions for learning a new language?",
          "alternatives": [
            { "id": 1, "text": "To order food in a restaurant.", "isCorrect": false },
            ...
          ]
        },
        ...
      ]
    },
    ...
  ]
  ```

---

## 🧠 Database Relations

Tables involved:
- `seasons`
- `lessons` (related to `seasons`)
- `questions` (related to `lessons`)
- `alternatives` (related to `questions`)

---

## 🚧 Error Handling
- All endpoints use `try/catch` for async operations.
- In case of failure:  
  ```json
  { "error": "Internal Server Error" }
  ```

---

## 🔍 Known Behaviors
- `GET /` (root) returns `404` — no route is defined for it.
  - Optional fix: Add this to show a simple homepage:
    ```js
    app.get('/', (req, res) => res.send('API is running!'));
    ```

---

## 🛠️ Next Backend Missions
1. Add `POST` routes to submit user answers.
2. Store progress (completed lessons/seasons).
3. Build user-specific logic (authenticated or stored by session).
4. Optional: Create admin interface to insert/update content.
