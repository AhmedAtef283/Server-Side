# Courses API

A RESTful API built with Express.js for managing courses stored in MongoDB, plus a simple catalog UI. Supports full CRUD operations (Create, Read, Update, Delete) against the `Courses` collection.

## Tech Stack

- **Node.js**
- **Express.js** (v5)
- **Mongoose** (MongoDB)
- **Vanilla HTML/CSS/JS** catalog UI
- **Nodemon** (for development)

## Project Structure

```
server_side/
├── index.js                        # App entry point
├── routes/
│   └── courses.routes.js           # Course route definitions
├── controllers/
│   └── courses.controllers.js      # Route handler logic
├── data/
│   └── fetch.js                    # MongoDB connection and course schema
├── public/
│   ├── index.html                  # Catalog UI
│   ├── styles.css
│   └── app.js
├── package.json
└── package-lock.json
```

## Getting Started

### Prerequisites

- Node.js installed on your machine
- Access to the MongoDB Atlas cluster used by this project

### Installation

```bash
npm install
```

### Running the Server

**Development mode** (auto-restarts on file changes):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000` and then connect to MongoDB. On success you should see `Connected successfully!` in the console.

Open `http://localhost:3000` in a browser to use the catalog: search, filter by topic, add, edit, and delete courses. The REST API remains at `/api/courses`.

## API Endpoints

Base path: `/api/courses`

| Method | Endpoint            | Description              |
|--------|----------------------|---------------------------|
| GET    | `/api/courses`       | Get all courses           |
| GET    | `/api/courses/:id`   | Get a single course by ID |
| POST   | `/api/courses`       | Create a new course       |
| PUT    | `/api/courses/:id`   | Update an existing course |
| DELETE | `/api/courses/:id`   | Delete a course           |

### Course fields

| Field          | Type   | Notes                                      |
|----------------|--------|--------------------------------------------|
| `topic`        | String | Required; leading/trailing spaces trimmed  |
| `difficulty`   | Number | Required                                   |
| `price`        | String | Required; trimmed (for example `"free"`)   |
| `release_year` | Number | Required                                   |
| `format`       | String | Required; trimmed                          |
| `url`          | String | Required; trimmed                          |
| `label`        | String | Required; trimmed                          |
| `author`       | String | Required; trimmed                          |

### Request Body (POST / PUT)

```json
{
  "topic": "Natural Language Processing",
  "difficulty": 2,
  "price": "free",
  "release_year": 2021,
  "format": "YouTube playlist",
  "url": "https://www.youtube.com/playlist?list=example",
  "label": "CS224N: Natural Language Processing with Deep Learning",
  "author": "Stanford University"
}
```

**Validation rules:**
- All fields listed above are required.
- String fields are trimmed before they are saved.
- PUT with an empty body returns `400`.
- PUT runs schema validators on the update.

### Example Responses

**GET `/api/courses?page=1&limit=6`**
```json
{
  "status": "success",
  "data": {
    "courses": [
      {
        "_id": "6aa1492879ea9de200868948",
        "topic": "Natural Language Processing",
        "difficulty": 2,
        "price": "free",
        "release_year": 2021,
        "format": "YouTube playlist",
        "url": "https://www.youtube.com/playlist?list=example",
        "label": "CS224N: Natural Language Processing with Deep Learning",
        "author": "Stanford University"
      }
    ],
    "total": 31,
    "page": 1,
    "limit": 6
  }
}
```

**POST `/api/courses`** — `201 Created`
```json
{
  "_id": "6aa1492879ea9de200868950",
  "topic": "Deep Learning",
  "difficulty": 2,
  "price": "free",
  "release_year": 2023,
  "format": "website",
  "url": "https://example.com/course",
  "label": "Deep Learning Fundamentals",
  "author": "Sebastian Raschka"
}
```

**DELETE `/api/courses/:id`** — `200 OK`
```
Course deleted successfully
```

**Error example** — `400 Bad Request`
```
Error creating course
```

```
Request body cannot be empty
```

```
Invalid course ID, missing required fields, or invalid data format
```

**Not found** — `404 Not Found`
```
Course not found
```

## Notes

- Course data lives in MongoDB (`Courses` collection), so it persists across server restarts.
- Course IDs are MongoDB `_id` values, not numeric `id` fields.
- The root route `/` serves the catalog UI from the `public/` folder.

## License

ISC
