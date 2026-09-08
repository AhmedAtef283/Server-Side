# Courses API

A simple RESTful API built with Express.js for managing a list of courses. Supports full CRUD operations (Create, Read, Update, Delete) using an in-memory data store.

## Tech Stack

- **Node.js**
- **Express.js** (v5)
- **Nodemon** (for development)

## Project Structure

```
server_side/
├── index.js                        # App entry point
├── routes/
│   └── coures.routes.js            # Course route definitions
├── controllers/
│   └── courses.controllers.js      # Route handler logic
├── data/
│   └── db.js                       # In-memory courses data
├── package.json
└── package-lock.json
```

## Getting Started

### Prerequisites

- Node.js installed on your machine

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

The server will start on `http://localhost:3000`.

## API Endpoints

Base path: `/api/courses`

| Method | Endpoint            | Description              |
|--------|----------------------|---------------------------|
| GET    | `/api/courses`       | Get all courses           |
| GET    | `/api/courses/:id`   | Get a single course by ID |
| POST   | `/api/courses`       | Create a new course       |
| PUT    | `/api/courses/:id`   | Update an existing course |
| DELETE | `/api/courses/:id`   | Delete a course           |

### Request Body (POST / PUT)

```json
{
  "name": "Course Name",
  "price": 100
}
```

**Validation rules:**
- `name` is required and must be at least 3 characters long.
- `price` is required and must be greater than 0.

### Example Responses

**GET `/api/courses`**
```json
[
  {
    "id": 1,
    "name": "Intro to JavaScript",
    "price": 50
  }
]
```

**POST `/api/courses`** — `201 Created`
```json
{
  "id": 2,
  "name": "Advanced Node.js",
  "price": 120
}
```

**Error example** — `400 Bad Request`
```
Name is required and should be minimum 3 characters.
```

**Not found** — `404 Not Found`
```
Course not found
```

## Notes

- Data is stored **in memory**, so it resets whenever the server restarts.
- The root route `/` returns a simple message: `Server is running, try /api/courses`.

## License

ISC
